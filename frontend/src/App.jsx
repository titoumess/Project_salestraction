import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Page d'authentification
import Dashboard from "./pages/Dashboard"; // Page après connexion
import SignupEtudiant from "./pages/SignupEtudiant";
import SignupStartup from "./pages/SignupStartup";
import SigninPage from "./pages/SigninPage"; // Page de connexion
import OffersOrProfilesPage from "./pages/OffersOrProfilesPage"; // Page des offres ou des profils

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole"); // Récupération du rôle de l'utilisateur
  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* Route pour la page principale */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Routes accessibles sans authentification */}
        <Route path="/signup-etudiant" element={<SignupEtudiant />} />
        <Route path="/signup-startup" element={<SignupStartup />} />

        {/* Route pour la page de connexion */}
        <Route
          path="/signin-page"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SigninPage />}
        />

        {/* Route pour les offres ou les profils */}
        <Route
          path={userRole === "student" ? "/offers" : "/students"}
          element={<OffersOrProfilesPage userRole={userRole} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
