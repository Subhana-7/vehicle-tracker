import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/HomePage";
import TripsPage from "./pages/TripListing";
import TripDetailsPage from "./pages/TripAnalysis";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Trips listing */}
        <Route path="/trips" element={<TripsPage />} />

        {/* Trip details (static for now, dynamic later) */}
        <Route path="/trips/details" element={<TripDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;