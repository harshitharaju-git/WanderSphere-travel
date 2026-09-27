import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Clock, Users, Check, Star, MapPin, Compass } from "lucide-react";

export default function TourModal({ tour, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!tour) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        {/* Modal Header Media */}
        <div className="modal-hero">
          <img src={tour.image} alt={tour.title} className="modal-hero-img" />
          <div className="modal-hero-overlay">
            <div className="modal-tags">
              <span className="badge badge-accent">{tour.region}</span>
              <span className="badge badge-standard">{tour.difficulty} Difficulty</span>
              {tour.badge && <span className="badge badge-luxury">{tour.badge}</span>}
            </div>
            <h2 className="modal-title">{tour.title}</h2>
            <div className="modal-meta-row">
              <span><MapPin size={16} /> {tour.destination}</span>
              <span><Clock size={16} /> {tour.days} Days / {tour.days - 1} Nights</span>
              <span><Users size={16} /> {tour.groupSize || "Max 10 explorers"}</span>
              <span><Star size={16} fill="#f59e0b" color="#f59e0b" /> {tour.rating || "4.9"} ({tour.reviewsCount || 100}+ reviews)</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          {/* Overview */}
          <div className="modal-section">
            <h3 className="section-subtitle">The Expedition</h3>
            <p className="modal-description">{tour.description}</p>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="modal-section">
              <h3 className="section-subtitle">Curated Highlights</h3>
              <div className="highlights-grid">
                {tour.highlights.map((hl, i) => (
                  <div key={i} className="highlight-item">
                    <span className="highlight-icon"><Compass size={16} /></span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day by Day Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="modal-section">
              <h3 className="section-subtitle">Day-by-Day Trail Route</h3>
              <div className="itinerary-timeline">
                {tour.itinerary.map((step) => (
                  <div key={step.day} className="timeline-node">
                    <div className="timeline-badge">Day {step.day}</div>
                    <div className="timeline-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions */}
          {tour.included && tour.included.length > 0 && (
            <div className="modal-section">
              <h3 className="section-subtitle">Expedition Inclusions</h3>
              <ul className="inclusions-list">
                {tour.included.map((inc, i) => (
                  <li key={i}>
                    <Check size={16} className="text-emerald" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="modal-footer">
          <div>
            <span className="price-label">Starting Unit Fare</span>
            <div className="price-val">
              ${tour.basePrice?.toLocaleString()} <span className="price-unit">/ traveler</span>
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <Link
              to={`/reserve?package=${encodeURIComponent(tour.title)}&dest=${encodeURIComponent(tour.destination)}`}
              onClick={onClose}
              className="cta-button"
            >
              Reserve Seats on this Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
