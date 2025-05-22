import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Page d'authentification
import Dashboard from "./pages/Dashboard"; // Page après connexion
import SignupEtudiant from "./pages/SignupEtudiant";
import SignupStartup from "./pages/SignupStartup";
import SigninPage from "./pages/SigninPage"; // Page de connexion
import OffersOrProfilesPage from "./pages/OffersOrProfilesPage"; // Page des offres ou des profils
import StudentProfile from "./pages/StudentProfile";
import CreateOffer from "./pages/CreateOffer"; // Page de création d'offre
import PendingValidation from "./pages/PendingValidation";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole"); // Récupération du rôle de l'utilisateur
  const isAdminValidated = localStorage.getItem("adminValidation") === "1"; // ou "true" selon ton backend
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdminValidated:", isAdminValidated);

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
              isAdminValidated ? (
                <Dashboard />
              ) : (
                <Navigate to="/pending-validation" replace />
              )
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
        <Route path="/offers" element={<OffersOrProfilesPage userRole="student" />} />
        <Route path="/students" element={<OffersOrProfilesPage userRole="startup" />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/profile" element={<StudentProfile />} /> {/* Pour le profil connecté */}
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/pending-validation" element={<PendingValidation />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Pour le dashboard connecté */}

      </Routes>
    </Router>
  );
}

export default App;
