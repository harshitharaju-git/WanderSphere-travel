import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import ReserveTour from "./pages/ReserveTours";
import ReservationsHistory from "./pages/ReserveHistory";
import "./App.css";

// Automatically scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        <div className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/reserve" element={<ReserveTour />} />
            <Route path="/reservations" element={<ReservationsHistory />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}