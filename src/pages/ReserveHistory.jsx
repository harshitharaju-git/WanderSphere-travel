import { useEffect, useState, useMemo } from "react";
import { 
  Compass, MapPin, Calendar, 
  X, Search, Download, RefreshCw, FileText, 
  Printer
} from "lucide-react";
import { supabase, isSupabaseConfigured, getLocalReservations, saveLocalReservations } from "../supabaseClient";

export default function ReserveHistory() {
  const [trips, setTrips] = useState(() => getLocalReservations());
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch reservations from Supabase or fallback to Local Storage
  const fetchTrips = async () => {
    setLoading(true);
    let loadedData = null;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("tour_reservations")
          .select("*")
          .order("id", { ascending: false });

        if (!error && data) {
          loadedData = data;
        } else {
          console.warn("Supabase fetch notice:", error?.message);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local records:", err);
      }
    }

    if (!loadedData) {
      loadedData = getLocalReservations();
    }

    setTrips(loadedData || []);
    setLoading(false);
  };

  // Cancel reservation
  const cancelReservation = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this expedition reservation?");
    if (!confirmCancel) return;

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("tour_reservations")
          .update({ status: "Cancelled" })
          .eq("id", id);

        if (error) {
          console.warn("Supabase update error:", error.message);
        }
      } catch (e) {
        console.warn("Supabase cancel failed:", e);
      }
    }

    // Update in state & local storage
    setTrips((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status: "Cancelled" } : t));
      saveLocalReservations(updated);
      return updated;
    });
  };

  // Asynchronous remote sync on mount
  useEffect(() => {
    let isMounted = true;
    if (isSupabaseConfigured) {
      supabase
        .from("tour_reservations")
        .select("*")
        .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (isMounted && !error && data) {
            setTrips(data);
          }
        })
        .catch((err) => console.warn("Supabase sync notice:", err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter trips by search query and status
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        trip.guest_name?.toLowerCase().includes(query) ||
        trip.email?.toLowerCase().includes(query) ||
        trip.package_name?.toLowerCase().includes(query) ||
        trip.destination?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || trip.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [trips, search, statusFilter]);

  // Aggregate KPI Metrics
  const stats = useMemo(() => {
    const totalCount = trips.length;
    const confirmedCount = trips.filter((t) => t.status !== "Cancelled").length;
    const totalPassengers = trips
      .filter((t) => t.status !== "Cancelled")
      .reduce((sum, t) => sum + (Number(t.travelers) || 1), 0);
    const totalRevenue = trips
      .filter((t) => t.status !== "Cancelled")
      .reduce((sum, t) => sum + (Number(t.total_price) || 0), 0);

    return { totalCount, confirmedCount, totalPassengers, totalRevenue };
  }, [trips]);

  // Client-side CSV export
  const exportManifestCSV = () => {
    if (trips.length === 0) return;
    const headers = ["ID", "Guest Name", "Email", "Phone", "Expedition", "Destination", "Departure Date", "Travelers", "Tier", "Total Price", "Status", "Notes"];
    const rows = trips.map((t) => [
      t.id,
      `"${t.guest_name || ""}"`,
      `"${t.email || ""}"`,
      `"${t.phone || ""}"`,
      `"${t.package_name || ""}"`,
      `"${t.destination || ""}"`,
      t.departure_date,
      t.travelers,
      t.tier,
      t.total_price,
      t.status || "Confirmed",
      `"${t.notes || ""}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wandersphere_manifest_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="page-container">
      {/* Page Header */}
      <div className="manifest-header-flex">
        <div>
          <span className="section-kicker">Flight & Ground Logistics</span>
          <h1 className="page-title">Expedition Passenger Manifest</h1>
          <p className="page-subtitle">
            Live operations log for scheduled passenger departures and bookings.
          </p>
        </div>

        <div className="manifest-header-actions">
          <button onClick={exportManifestCSV} className="btn-secondary" title="Download CSV">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={fetchTrips} className="cta-button-sm" disabled={loading} title="Refresh Records">
            <RefreshCw size={15} className={loading ? "spin-icon" : ""} /> Reload
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Active Bookings</span>
          <div className="kpi-value">{stats.confirmedCount}</div>
          <span className="kpi-sub">Out of {stats.totalCount} total logged</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Manifest Passengers</span>
          <div className="kpi-value">{stats.totalPassengers}</div>
          <span className="kpi-sub">Across all confirmed routes</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Gross Trip Value</span>
          <div className="kpi-value">${stats.totalRevenue.toLocaleString()}</div>
          <span className="kpi-sub">Confirmed expedition revenue</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Manifest Status</span>
          <div className="kpi-value" style={{ color: "#10b981", fontSize: "1.5rem" }}>
            100% Operational
          </div>
          <span className="kpi-sub">Real-Time Cloud Sync</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="manifest-filter-bar">
        <div className="manifest-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search passenger, email, tour name, or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="manifest-search-input"
          />
          {search && (
            <button onClick={() => setSearch("")} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>

        <div className="status-filter-pills">
          {["All", "Confirmed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`status-filter-btn ${statusFilter === st ? "active" : ""}`}
            >
              {st} {st !== "All" && `(${trips.filter((t) => (st === "Confirmed" ? t.status !== "Cancelled" : t.status === "Cancelled")).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Manifest Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <p>Syncing travel manifest from database...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="table-empty-state">
            <Compass size={40} className="empty-icon" />
            <h3>No Bookings Match Your Filter</h3>
            <p>Try resetting the search terms or change the status filter.</p>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Passenger</th>
                <th>Tour & Destination</th>
                <th>Departure Date</th>
                <th>Party & Tier</th>
                <th>Total Fare</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => {
                const isCancelled = trip.status === "Cancelled";
                return (
                  <tr key={trip.id} className={isCancelled ? "row-cancelled" : ""}>
                    <td>
                      <div className="guest-primary-name">{trip.guest_name}</div>
                      <div className="guest-sub-contact">{trip.email}</div>
                      {trip.phone && <div className="guest-phone">{trip.phone}</div>}
                    </td>

                    <td>
                      <div className="trip-pkg-name">{trip.package_name}</div>
                      <div className="trip-pkg-dest">
                        <MapPin size={13} className="inline-icon" /> {trip.destination}
                      </div>
                    </td>

                    <td>
                      <div className="departure-date-val">
                        <Calendar size={13} className="inline-icon" /> {trip.departure_date}
                      </div>
                    </td>

                    <td>
                      <div>{trip.travelers} {trip.travelers > 1 ? "Explorers" : "Explorer"}</div>
                      <span className={`badge ${
                        trip.tier === "Luxury Elite" ? "badge-luxury" : trip.tier === "Backpacker" ? "badge-backpacker" : "badge-standard"
                      }`}>
                        {trip.tier || "Standard"}
                      </span>
                    </td>

                    <td className="fare-cell">
                      ${trip.total_price ? Number(trip.total_price).toLocaleString() : "N/A"}
                    </td>

                    <td>
                      <span className={`status-pill ${isCancelled ? "status-cancelled" : "status-confirmed"}`}>
                        {isCancelled ? "Cancelled" : "Confirmed"}
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div className="table-actions-cluster">
                        <button
                          onClick={() => setSelectedTicket(trip)}
                          className="btn-icon-action"
                          title="View Itinerary Ticket"
                        >
                          <FileText size={15} /> Receipt
                        </button>

                        {!isCancelled && (
                          <button
                            onClick={() => cancelReservation(trip.id)}
                            className="cancel-btn"
                            title="Cancel booking"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Ticket / Itinerary Receipt Modal */}
      {selectedTicket && (
        <div className="modal-backdrop" onClick={() => setSelectedTicket(null)}>
          <div className="modal-container ticket-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedTicket(null)}>
              <X size={20} />
            </button>

            <div className="ticket-header">
              <div className="ticket-brand">
                <Compass size={22} />
                <span>WANDER✦SPHERE EXPEDITIONS</span>
              </div>
              <span className={`status-pill ${selectedTicket.status === "Cancelled" ? "status-cancelled" : "status-confirmed"}`}>
                {selectedTicket.status || "Confirmed"}
              </span>
            </div>

            <div className="ticket-body">
              <h2 className="ticket-title">{selectedTicket.package_name}</h2>
              <p className="ticket-destination">{selectedTicket.destination}</p>

              <div className="ticket-grid">
                <div className="ticket-field">
                  <span className="field-label">Booking Reference</span>
                  <strong>WS-{selectedTicket.id}</strong>
                </div>

                <div className="ticket-field">
                  <span className="field-label">Departure Date</span>
                  <strong>{selectedTicket.departure_date}</strong>
                </div>

                <div className="ticket-field">
                  <span className="field-label">Lead Traveler</span>
                  <strong>{selectedTicket.guest_name}</strong>
                </div>

                <div className="ticket-field">
                  <span className="field-label">Contact Email</span>
                  <span>{selectedTicket.email}</span>
                </div>

                <div className="ticket-field">
                  <span className="field-label">Party Allocation</span>
                  <strong>{selectedTicket.travelers} Person(s)</strong>
                </div>

                <div className="ticket-field">
                  <span className="field-label">Class Tier</span>
                  <strong>{selectedTicket.tier}</strong>
                </div>

                <div className="ticket-field ticket-full-width">
                  <span className="field-label">Notes & Requests</span>
                  <p>{selectedTicket.notes || "No special requests logged."}</p>
                </div>

                <div className="ticket-field ticket-full-width ticket-fare-row">
                  <span className="field-label">Total Fare Paid / Due</span>
                  <strong className="ticket-total-price">
                    ${Number(selectedTicket.total_price || 0).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <div className="ticket-footer">
              <button onClick={() => window.print()} className="btn-secondary">
                <Printer size={15} /> Print Ticket
              </button>
              <button onClick={() => setSelectedTicket(null)} className="cta-button-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}