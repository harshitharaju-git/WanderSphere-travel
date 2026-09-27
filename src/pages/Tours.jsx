import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Compass, RotateCcw } from "lucide-react";
import TourCard from "../components/TourCard";
import TourModal from "../components/Tourmodal";
import { TOURS_DATA } from "../data/toursData";

export default function Tours() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL search params if provided
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [selectedRegion, setSelectedRegion] = useState(() => searchParams.get("region") || "All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);

  // Filter and sort expeditions
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tour.title.toLowerCase().includes(query) ||
        tour.destination.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query);

      const matchesRegion = selectedRegion === "All" || tour.region === selectedRegion;
      const matchesDifficulty = selectedDifficulty === "All" || tour.difficulty === selectedDifficulty;

      return matchesSearch && matchesRegion && matchesDifficulty;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice;
      if (sortBy === "price-desc") return b.basePrice - a.basePrice;
      if (sortBy === "duration") return a.days - b.days;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // Default curated order
    });
  }, [search, selectedRegion, selectedDifficulty, sortBy]);

  const hasActiveFilters = search || selectedRegion !== "All" || selectedDifficulty !== "All" || sortBy !== "recommended";

  const handleResetFilters = () => {
    setSearch("");
    setSelectedRegion("All");
    setSelectedDifficulty("All");
    setSortBy("recommended");
    setSearchParams({});
  };

  return (
    <main className="page-container">
      {/* Header Banner */}
      <div className="page-header-banner">
        <span className="section-kicker">WanderSphere Itineraries</span>
        <h1 className="page-title">Curated Global Expeditions</h1>
        <p className="page-subtitle">
          Small-group wilderness treks, cultural immersions, and polar crossings led by master naturalists.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="filter-panel-card">
        <div className="filter-grid">
          {/* Search Input */}
          <div className="filter-field-wrapper search-flex">
            <Search size={18} className="filter-icon" />
            <input
              type="text"
              placeholder="Search by country, title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input-enhanced"
            />
            {search && (
              <button 
                onClick={() => setSearch("")} 
                className="clear-search-btn"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="filter-field-wrapper">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="All">All Continents</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Americas">Americas</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="filter-field-wrapper">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy (Leisurely)</option>
              <option value="Moderate">Moderate (Active)</option>
              <option value="Challenging">Challenging (Rugged)</option>
              <option value="Advanced">Advanced (High Altitude/Alpine)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-field-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="recommended">Featured / Curated</option>
              <option value="price-asc">Price: Lowest First</option>
              <option value="price-desc">Price: Highest First</option>
              <option value="duration">Duration: Shortest to Longest</option>
              <option value="rating">Top Rated (Review Score)</option>
            </select>
          </div>
        </div>

        {/* Filter Stats and Reset */}
        <div className="filter-summary-row">
          <div className="results-counter">
            Showing <strong>{filteredTours.length}</strong> of <strong>{TOURS_DATA.length}</strong> Expeditions
          </div>
          {hasActiveFilters && (
            <button onClick={handleResetFilters} className="reset-filters-btn">
              <RotateCcw size={14} /> Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Tours Grid */}
      {filteredTours.length > 0 ? (
        <div className="cards-grid">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onQuickView={(t) => setSelectedTourForModal(t)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <Compass size={40} />
          </div>
          <h3>No Expeditions Match Your Criteria</h3>
          <p>Try broadening your keywords or resetting continent and difficulty filters.</p>
          <button onClick={handleResetFilters} className="cta-button" style={{ marginTop: "1.25rem" }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Tour Detail Modal */}
      {selectedTourForModal && (
        <TourModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
        />
      )}
    </main>
  );
}