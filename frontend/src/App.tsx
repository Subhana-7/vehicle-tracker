import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const DashboardPage = React.lazy(() => import("./pages/HomePage"));
const TripsPage = React.lazy(() => import("./pages/TripListing"));
const TripDetailsPage = React.lazy(() => import("./pages/TripAnalysis"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const VerifyOtpPage = React.lazy(() => import("./pages/Verify-Otp.page"));
const PublicRoute = React.lazy(() => import("./components/PublicRoute"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtpPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips/details/:id"
          element={
            <ProtectedRoute>
              <TripDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
