import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Compass, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add subtle shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`app-header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <span className="brand-icon-wrapper">
            <Compass size={22} className="brand-icon" />
          </span>
          <span className="brand-text">
            WANDER<span className="brand-accent">✦</span>SPHERE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Discover
          </NavLink>
          <NavLink to="/tours" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Expeditions
          </NavLink>
          <NavLink to="/reserve" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Book a Tour
          </NavLink>
          <NavLink to="/reservations" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Manifest & Bookings
          </NavLink>
        </nav>

        {/* Right Nav Utilities */}
        <div className="nav-right-cluster">
          <Link to="/reserve" className="cta-button-nav">
            Book Now <ArrowRight size={14} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
              Discover Overview
            </NavLink>
            <NavLink to="/tours" onClick={closeMenu} className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
              Expeditions Catalog
            </NavLink>
            <NavLink to="/reserve" onClick={closeMenu} className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
              Book an Expedition
            </NavLink>
            <NavLink to="/reservations" onClick={closeMenu} className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
              Passenger Manifest & Trips
            </NavLink>
          </div>

          <div className="mobile-drawer-footer">
            <Link to="/reserve" onClick={closeMenu} className="cta-button full-width" style={{ textAlign: "center" }}>
              Start Reservation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}