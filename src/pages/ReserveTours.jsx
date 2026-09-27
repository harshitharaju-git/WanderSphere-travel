import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Compass, ShieldCheck, Check, 
  Sparkles, AlertCircle 
} from "lucide-react";
import { supabase, isSupabaseConfigured, getLocalReservations, saveLocalReservations } from "../supabaseClient";
import { TOURS_DATA, TIER_CONFIG, ADDONS_CONFIG } from "../data/toursData";

export default function ReserveTour() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Find preselected tour from query params, or default to first tour
  const paramPackage = params.get("package");
  const [packageTitle, setPackageTitle] = useState(() => {
    const match = TOURS_DATA.find((t) => t.title === paramPackage);
    return match ? match.title : TOURS_DATA[0].title;
  });
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [tier, setTier] = useState("Standard");
  const [selectedAddons, setSelectedAddons] = useState(["carbon-offset"]);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  // Update selected tour when package dropdown changes
  const selectedTour = useMemo(() => {
    return TOURS_DATA.find((t) => t.title === packageTitle) || TOURS_DATA[0];
  }, [packageTitle]);

  // Live Price Calculation
  const addonTotalPerPerson = useMemo(() => {
    return selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS_CONFIG.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
  }, [selectedAddons]);

  const baseCalculatedFare = useMemo(() => {
    const rate = selectedTour.basePrice;
    const tierMultiplier = TIER_CONFIG[tier]?.multiplier || 1.0;
    return Math.round(rate * tierMultiplier);
  }, [selectedTour, tier]);

  const totalFare = useMemo(() => {
    return (baseCalculatedFare + addonTotalPerPerson) * travelers;
  }, [baseCalculatedFare, addonTotalPerPerson, travelers]);

  // Minimum selectable date: Tomorrow
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ text: "", type: "" });

    if (!guestName.trim() || !email.trim() || !departureDate) {
      setStatusMessage({ text: "Please complete all mandatory traveler fields.", type: "error" });
      return;
    }

    setLoading(true);

    const bookingPayload = {
      guest_name: guestName.trim(),
      email: email.trim(),
      phone: phone.trim() || "Not provided",
      package_name: selectedTour.title,
      destination: selectedTour.destination,
      travelers: Number(travelers),
      departure_date: departureDate,
      tier: tier,
      total_price: totalFare,
      status: "Confirmed",
      notes: notes.trim() || "None",
      created_at: new Date().toISOString()
    };

    let bookingSaved = false;

    // Try Supabase directly if configured
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("tour_reservations").insert([bookingPayload]);
        if (!error) {
          bookingSaved = true;
        } else {
          console.warn("Supabase insert notice:", error.message);
        }
      } catch (err) {
        console.warn("Supabase network error:", err);
      }
    }

    // Resilient fallback to local storage if Supabase is unconfigured or failed
    if (!bookingSaved) {
      const existing = getLocalReservations();
      const newLocalBooking = {
        ...bookingPayload,
        id: Date.now()
      };
      saveLocalReservations([newLocalBooking, ...existing]);
    }

    setLoading(false);
    setStatusMessage({
      text: "Expedition booked successfully! Your seat allocation is confirmed.",
      type: "success"
    });

    // Navigate to manifest after feedback
    setTimeout(() => {
      navigate("/reservations");
    }, 1200);
  };

  return (
    <main className="page-container">
      {/* Header */}
      <div className="page-header-banner">
        <span className="section-kicker">Reservation Portal</span>
        <h1 className="page-title">Book Your Expedition</h1>
        <p className="page-subtitle">
          Lock in departure dates, customize tier accommodations, and generate instant passenger credentials.
        </p>
      </div>

      {statusMessage.text && (
        <div className={`notification-banner ${statusMessage.type}`}>
          {statusMessage.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="form-layout">
        {/* Main Reservation Form */}
        <form onSubmit={handleBookingSubmit} className="glass-form-card">
          <div className="form-section-header">
            <h3>1. Select Route & Party</h3>
          </div>

          {/* Expedition Picker with Visual Preview */}
          <div className="form-group">
            <label htmlFor="packageSelect">Expedition Route</label>
            <select
              id="packageSelect"
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
              className="form-control-enhanced"
            >
              {TOURS_DATA.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title} ({t.destination}) • {t.days} Days • ${t.basePrice} base
                </option>
              ))}
            </select>
          </div>

          {/* Mini Tour Preview Card */}
          <div className="selected-tour-preview">
            <img src={selectedTour.image} alt={selectedTour.title} className="preview-thumb" />
            <div className="preview-info">
              <span className="card-destination">{selectedTour.destination}</span>
              <h4 className="preview-title">{selectedTour.title}</h4>
              <p className="preview-meta">
                {selectedTour.days} Days • Difficulty: {selectedTour.difficulty} • Rating: ★ {selectedTour.rating || 4.9}
              </p>
            </div>
          </div>

          {/* Party Size & Departure Date Grid */}
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="travelerCount">Number of Explorers</label>
              <div className="stepper-input-wrapper">
                <input
                  id="travelerCount"
                  type="number"
                  min="1"
                  max="12"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                  className="form-control-enhanced"
                />
                <span className="stepper-unit">Explorers</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="depDate">Target Departure Date</label>
              <input
                id="depDate"
                type="date"
                min={minDate}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
                className="form-control-enhanced"
              />
            </div>
          </div>

          {/* Class Tier Selector */}
          <div className="form-section-header" style={{ marginTop: "1.75rem" }}>
            <h3>2. Choose Expedition Comfort Tier</h3>
          </div>

          <div className="tier-selector-grid">
            {Object.keys(TIER_CONFIG).map((tierKey) => {
              const cfg = TIER_CONFIG[tierKey];
              const isSelected = tier === tierKey;
              return (
                <div
                  key={tierKey}
                  onClick={() => setTier(tierKey)}
                  className={`tier-card-option ${isSelected ? "selected" : ""}`}
                >
                  <div className="tier-header-row">
                    <span className="tier-title">{tierKey}</span>
                    <span className="tier-mult">{cfg.multiplier}x</span>
                  </div>
                  <p className="tier-tagline">{cfg.tagline}</p>
                  <ul className="tier-features">
                    {cfg.features.map((feat, idx) => (
                      <li key={idx}>
                        <Check size={13} className="text-emerald" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <div className="form-section-header" style={{ marginTop: "1.75rem" }}>
            <h3>3. Optional Adventure Add-ons</h3>
          </div>

          <div className="addons-list">
            {ADDONS_CONFIG.map((addon) => {
              const active = selectedAddons.includes(addon.id);
              return (
                <label key={addon.id} className={`addon-item ${active ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleAddon(addon.id)}
                    className="addon-checkbox"
                  />
                  <div className="addon-details">
                    <div className="addon-name-row">
                      <span className="addon-title">{addon.name}</span>
                      <span className="addon-price">+${addon.price} / person</span>
                    </div>
                    <p className="addon-desc">{addon.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Primary Traveler Credentials */}
          <div className="form-section-header" style={{ marginTop: "1.75rem" }}>
            <h3>4. Lead Traveler Contact</h3>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="guestName">Full Name *</label>
              <input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Jordan Hayes"
                required
                className="form-control-enhanced"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan@domain.com"
                required
                className="form-control-enhanced"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="form-control-enhanced"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Special Requirements / Notes</label>
              <input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dietary, gear questions, celebration..."
                className="form-control-enhanced"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="cta-button submit-btn-large"
            disabled={loading}
          >
            {loading ? "Locking in Seats..." : `Confirm Reservation • $${totalFare.toLocaleString()}`}
          </button>
        </form>

        {/* Dynamic Billing Summary Sidebar */}
        <aside className="summary-card">
          <div className="summary-header">
            <h3>Fare Summary</h3>
            <span className="badge badge-accent">Live Estimate</span>
          </div>

          <p className="summary-subtext">
            Transparent pricing with tier adjustments and add-ons calculated in real time.
          </p>

          <div className="summary-body">
            <div className="summary-row">
              <span>Expedition Route</span>
              <strong>{selectedTour.title}</strong>
            </div>

            <div className="summary-row">
              <span>Destination</span>
              <span>{selectedTour.destination}</span>
            </div>

            <div className="summary-row">
              <span>Duration</span>
              <span>{selectedTour.days} Days</span>
            </div>

            <div className="summary-row">
              <span>Base Fare (Per Person)</span>
              <span>${selectedTour.basePrice}</span>
            </div>

            <div className="summary-row">
              <span>Tier Multiplier ({tier})</span>
              <span>× {TIER_CONFIG[tier].multiplier}</span>
            </div>

            <div className="summary-row">
              <span>Adjusted Rate / Person</span>
              <strong>${baseCalculatedFare}</strong>
            </div>

            {selectedAddons.length > 0 && (
              <div className="summary-row">
                <span>Selected Add-ons</span>
                <span>+${addonTotalPerPerson} / person</span>
              </div>
            )}

            <div className="summary-row">
              <span>Travelers Count</span>
              <span>× {travelers} Pax</span>
            </div>

            <div className="summary-total-row">
              <div>
                <span className="total-label">Total Amount</span>
                <span className="total-sub">All taxes and permits included</span>
              </div>
              <strong className="total-amount">${totalFare.toLocaleString()}</strong>
            </div>
          </div>

          <div className="summary-guarantees">
            <div className="guarantee-item">
              <ShieldCheck size={16} />
              <span>Full refund up to 30 days prior to departure</span>
            </div>
            <div className="guarantee-item">
              <Compass size={16} />
              <span>Guaranteed departure upon reaching 2 travelers</span>
            </div>
            <div className="guarantee-item">
              <Sparkles size={16} />
              <span>Instant Confirmation & Seat Allocation Guarantee</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}