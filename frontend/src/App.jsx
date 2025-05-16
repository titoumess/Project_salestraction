import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage"; // Page de connexion
import Dashboard from "./Dashboard"; // Page après connexion
import SignupEtudiant from "./SignupEtudiant";
import SignupStartup from "./SignupStartup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("isAuthenticated:", isAuthenticated); // Vérifiez si la valeur change après le clic

  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
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

        {/* Autres routes */}
        <Route path="/signup-etudiant" element={<SignupEtudiant />} />
        <Route path="/signup-startup" element={<SignupStartup />} />
      </Routes>
    </Router>
  );
}

export default App;
