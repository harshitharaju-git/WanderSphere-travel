import { Link } from "react-router-dom";
import { Compass, ShieldCheck, Globe, Award, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="app-footer">
      <div className="footer-top-strip">
        <div className="footer-container footer-features-row">
          <div className="footer-feature-item">
            <ShieldCheck className="footer-feature-icon" />
            <div>
              <h4>100% Certified Guides</h4>
              <p>Wilderness first responders & cultural historians.</p>
            </div>
          </div>
          <div className="footer-feature-item">
            <Globe className="footer-feature-icon" />
            <div>
              <h4>Carbon-Offset Journeys</h4>
              <p>Every mile traveled is balanced by native habitat restoration.</p>
            </div>
          </div>
          <div className="footer-feature-item">
            <Award className="footer-feature-icon" />
            <div>
              <h4>Small-Group Guaranteed</h4>
              <p>Maximum 6–12 explorers per departure for zero crowds.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-container footer-main-grid">
        <div className="footer-col brand-col">
          <Link to="/" className="brand-logo footer-logo">
            <span className="brand-icon-wrapper">
              <Compass size={20} className="brand-icon" />
            </span>
            <span className="brand-text">
              WANDER<span className="brand-accent">✦</span>SPHERE
            </span>
          </Link>
          <p className="footer-tagline">
            Curating purposeful expeditions to the world’s most breathtaking and untamed frontiers. Designed for curious souls seeking transformative journeys.
          </p>
          <div className="backend-callout">
            <span className="badge badge-accent">Verified Global Expeditions</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Expeditions</h4>
          <ul className="footer-links">
            <li><Link to="/tours">All Active Itineraries</Link></li>
            <li><Link to="/tours">Kyoto Autumn Circuit</Link></li>
            <li><Link to="/tours">Patagonian Peaks & Fjords</Link></li>
            <li><Link to="/tours">Amalfi Coastline Trek</Link></li>
            <li><Link to="/tours">Serengeti Migration</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Discover WanderSphere</Link></li>
            <li><Link to="/reserve">Book an Expedition</Link></li>
            <li><Link to="/reservations">Live Manifest & Trips</Link></li>
            <li><a href="#about-section">Safety & Standards</a></li>
            <li><a href="#testimonials-section">Traveler Reviews</a></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Expedition Dispatch</h4>
          <p className="footer-text-sm">
            Receive secret departure openings, gear recommendations, and cultural dispatches directly in your inbox.
          </p>

          {subscribed ? (
            <div className="subscription-success">
              ✓ Welcome to the collective. First dispatch arrives Friday!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer-form">
              <input
                type="email"
                placeholder="explorer@wandersphere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-input"
              />
              <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-flex">
          <p>© {new Date().getFullYear()} WanderSphere Expeditions Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Verified Global Operations</span>
            <span>Carbon Neutral Pledges</span>
            <span>Privacy & Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
