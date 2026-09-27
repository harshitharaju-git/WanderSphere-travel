import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Star, Heart, Eye, ArrowRight } from "lucide-react";

export default function TourCard({ tour, onQuickView }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("wandersphere_favorites") || "[]");
      return favs.includes(tour.id);
    } catch {
      return false;
    }
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem("wandersphere_favorites") || "[]");
      let nextFavs;
      if (favs.includes(tour.id)) {
        nextFavs = favs.filter((id) => id !== tour.id);
        setIsFavorite(false);
      } else {
        nextFavs = [...favs, tour.id];
        setIsFavorite(true);
      }
      localStorage.setItem("wandersphere_favorites", JSON.stringify(nextFavs));
    } catch {
      // Ignore storage errors
    }
  };

  const difficultyClass = {
    Easy: "badge-backpacker",
    Moderate: "badge-standard",
    Challenging: "badge-luxury",
    Advanced: "badge-danger"
  }[tour.difficulty] || "badge-standard";

  return (
    <article className="tour-card">
      <div className="card-media">
        <img src={tour.image} alt={tour.title} loading="lazy" />
        
        {/* Floating Badges */}
        <div className="card-badges">
          <span className="badge badge-glass">{tour.region}</span>
          {tour.badge && <span className="badge badge-accent-glow">{tour.badge}</span>}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
          title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={18} fill={isFavorite ? "#ef4444" : "none"} color={isFavorite ? "#ef4444" : "white"} />
        </button>

        {/* Quick View Floating Pill */}
        <button
          onClick={() => onQuickView && onQuickView(tour)}
          className="quick-view-overlay-btn"
          title="Quick View Itinerary"
        >
          <Eye size={15} /> Quick View
        </button>
      </div>

      <div className="card-content">
        <div>
          <div className="card-header-row">
            <span className="card-destination">
              <MapPin size={14} className="inline-icon" /> {tour.destination}
            </span>
            <span className={`badge ${difficultyClass}`}>
              {tour.difficulty}
            </span>
          </div>

          <h3 className="card-title">{tour.title}</h3>
          
          <p className="card-description">
            {tour.description}
          </p>

          <div className="card-specs">
            <span className="spec-item">
              <Clock size={14} /> {tour.days} Days
            </span>
            <span className="spec-item">
              <Users size={14} /> {tour.groupSize || "Max 10"}
            </span>
            <span className="spec-item rating-spec">
              <Star size={13} fill="#f59e0b" color="#f59e0b" /> {tour.rating || 4.9} ({tour.reviewsCount || 80})
            </span>
          </div>
        </div>

        <div className="card-meta">
          <div>
            <span className="price-lead">From</span>
            <div className="card-price">
              ${tour.basePrice?.toLocaleString()}
              <span className="price-sub"> / person</span>
            </div>
          </div>
          
          <div className="card-btn-group">
            <button
              onClick={() => onQuickView && onQuickView(tour)}
              className="btn-outline-sm"
              title="View full day-by-day itinerary"
            >
              Itinerary
            </button>
            <Link
              to={`/reserve?package=${encodeURIComponent(tour.title)}&dest=${encodeURIComponent(tour.destination)}`}
              className="cta-button-sm"
            >
              Book <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}