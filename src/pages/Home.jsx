import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, MapPin, ShieldCheck, Star, Users, ArrowRight, Sparkles, Award } from "lucide-react";
import { TOURS_DATA } from "../data/toursData";
import TourCard from "../components/TourCard";
import TourModal from "../components/Tourmodal";

export default function Home() {
  const navigate = useNavigate();
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);
  const [heroSearch, setHeroSearch] = useState("");
  const [heroRegion, setHeroRegion] = useState("All");

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (heroSearch.trim()) query.set("search", heroSearch.trim());
    if (heroRegion !== "All") query.set("region", heroRegion);
    navigate(`/tours?${query.toString()}`);
  };

  // Top 3 featured expeditions for homepage showcase
  const featuredTours = TOURS_DATA.slice(0, 3);

  const testimonials = [
    {
      name: "Dr. Alistair Finch",
      role: "Geologist & Trekker",
      quote: "The Patagonian expedition with WanderSphere felt like an authentic exploration rather than a commercial tour. Ice trekking on Grey Glacier with their polar guide was life-changing.",
      rating: 5,
      trip: "Patagonian Fjords & Peaks",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Kavita Chen",
      role: "Architect & Photographer",
      quote: "Staying in a centuries-old ryokan in Kyoto with sunrise temple access before the crowds woke up. The logistics were flawless from arrival to farewell Kaiseki.",
      rating: 5,
      trip: "Kyoto Autumn Circuit",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Julian & Claire Moreau",
      role: "Honeymoon Adventurers",
      quote: "The Luxury Elite tier on the Amalfi coast was beyond expectation. Private Capri yachting and sunset dinner over Positano cliffs made our wedding trip unforgettable.",
      rating: 5,
      trip: "Amalfi Coastline Trek",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <main className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-master">
        <div className="hero-backdrop-gradient" />
        <div className="hero-content-box">
          <div className="hero-badge">
            <Sparkles size={15} className="sparkle-icon" />
            <span>2026/2027 Expedition Schedules Now Live</span>
          </div>

          <h1 className="hero-title">
            Conquer the Unexplored <br />
            <span className="hero-gradient-text">with Deep Purpose</span>
          </h1>

          <p className="hero-subtitle">
            Curated small-group journeys to remote destinations worldwide. Master local guides, authentic heritage stays, and seamless cloud-synchronized reservations.
          </p>

          {/* Quick Expedition Search Bar */}
          <form onSubmit={handleHeroSearchSubmit} className="hero-search-bar">
            <div className="search-field">
              <MapPin size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Where to? (e.g. Japan, Chile, Iceland)"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="hero-input"
              />
            </div>

            <div className="search-field region-field">
              <Compass size={18} className="field-icon" />
              <select
                value={heroRegion}
                onChange={(e) => setHeroRegion(e.target.value)}
                className="hero-select"
              >
                <option value="All">All Continents</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Americas">Americas</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            <button type="submit" className="hero-search-btn">
              Explore Now <ArrowRight size={16} />
            </button>
          </form>

          {/* Trust Highlights */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <span><strong>4.95 / 5</strong> Traveler Score</span>
            </div>
            <div className="trust-item">
              <Users size={16} />
              <span><strong>Max 6–10</strong> Small Groups</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} />
              <span><strong>100%</strong> Carbon Balanced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Expeditions Section */}
      <section className="page-container section-spacing">
        <div className="section-header-flex">
          <div>
            <div className="section-kicker">Curated Highlights</div>
            <h2 className="section-heading">Featured Global Expeditions</h2>
            <p className="section-description">
              Handcrafted itineraries with guaranteed departure dates and limited seat allocations.
            </p>
          </div>
          <Link to="/tours" className="btn-secondary">
            View All {TOURS_DATA.length} Expeditions <ArrowRight size={15} />
          </Link>
        </div>

        <div className="cards-grid">
          {featuredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onQuickView={(t) => setSelectedTourForModal(t)}
            />
          ))}
        </div>
      </section>

      {/* Interactive Value Pillars */}
      <section className="pillars-section" id="about-section">
        <div className="page-container">
          <div className="text-center-block">
            <span className="section-kicker">The WanderSphere Standard</span>
            <h2 className="section-heading">Engineered for Truly Transformative Travel</h2>
            <p className="section-description max-w-600">
              We eliminate commercial mass-tourism compromises through uncompromising curation and transparent operations.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Compass size={24} />
              </div>
              <h3>Curated Remote Routes</h3>
              <p>
                Every trail, mountain pass, and harbor is personally vetted by our wilderness scouts to bypass crowded tourist choke points.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Users size={24} />
              </div>
              <h3>Intimate Small Groups</h3>
              <p>
                Strictly capped at 6 to 12 explorers per departure. Allows spontaneous village dinners and swift travel without bus queues.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Award size={24} />
              </div>
              <h3>Tiered Class Customization</h3>
              <p>
                Choose between Backpacker, Standard, or Luxury Elite. Tailor your accommodations, transport, and wine pairings to your travel style.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3>Instant Confirmation & Security</h3>
              <p>
                Real-time expedition manifest with instant seat lock-in, automated total calculations, and zero hidden checkout fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-container section-spacing" id="testimonials-section">
        <div className="text-center-block">
          <span className="section-kicker">Field Reports</span>
          <h2 className="section-heading">Stories From Fellow Explorers</h2>
          <p className="section-description max-w-600">
            Real feedback from recent travelers who ventured across our mountain, coastline, and savannah routes.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="author-avatar" />
                <div>
                  <h4 className="author-name">{t.name}</h4>
                  <p className="author-role">{t.role}</p>
                  <span className="author-trip">Trek: {t.trip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Call-to-Action Banner */}
      <section className="page-container cta-banner-spacing">
        <div className="cta-banner-card">
          <div className="cta-banner-content">
            <span className="badge badge-accent-glow">Instant Departure Reservation</span>
            <h2>Ready to Map Your Next Journey?</h2>
            <p>
              Join a departure or secure your private party booking with instant cloud reservation confirmation.
            </p>
            <div className="cta-banner-buttons">
              <Link to="/reserve" className="cta-button">
                Book an Expedition <ArrowRight size={16} />
              </Link>
              <Link to="/tours" className="btn-secondary-light">
                Browse All Routes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal Component */}
      {selectedTourForModal && (
        <TourModal
          tour={selectedTourForModal}
          onClose={() => setSelectedTourForModal(null)}
        />
      )}
    </main>
  );
}