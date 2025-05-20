import React, { useState, useEffect } from "react";
import Match from "./components/Match";
import Like from "./components/Like";
import "./Dashboard.css";

function Dashboard() {
  const [userRole, setUserRole] = useState("student"); // "student" ou "startup"
  const [matches, setMatches] = useState([]);
  const [likedBy, setLikedBy] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (userRole === "student") {
      fetch(`${apiUrl}/api/students/1/matches`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      fetch(`${apiUrl}/api/students/1/liked-by`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data));

      fetch(`${apiUrl}/api/students/1/liked-offers`)
        .then((response) => response.json())
        .then((data) => setLiked(data));
    } else if (userRole === "startup") {
      fetch(`${apiUrl}/api/startups/1/matches`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      fetch(`${apiUrl}/api/startups/1/liked-by`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data));

      fetch(`${apiUrl}/api/startups/1/liked-students`)
        .then((response) => response.json())
        .then((data) => setLiked(data));
    }
  }, [userRole]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <img src="/path/to/logo.png" alt="Logo Salestraction" />
        </div>
        <h1 className="dashboard-title">SALESTRACTION</h1>
        <nav className="dashboard-menu">
          <a href="/profile">Mon profil</a>
          <a href="/dashboard">Accueil</a>
          <a href={userRole === "student" ? "/offers" : "/students"}>
            {userRole === "student" ? "Voir annonces" : "Voir profils"}
          </a>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="dashboard-main">
        {/* Matches */}
        <section className="dashboard-section">
          <h2 className="section-title">C'est un match</h2>
          <Match matches={matches} userRole={userRole} />
        </section>

        {/* Ils vous ont aimé */}
        <section className="dashboard-section">
          <h2 className="section-title">Ils vous ont aimé</h2>
          <Like
            title="Ils vous ont aimé"
            items={likedBy}
            userRole={userRole}
            emptyMessage="Personne n'a encore aimé votre profil. Un peu de patience..."
          />
        </section>

        {/* Vous avez aimé */}
        <section className="dashboard-section">
          <h2 className="section-title">Vous avez aimé</h2>
          <Like
            title="Vous avez aimé"
            items={liked}
            userRole={userRole}
            emptyMessage="Vous n'avez aimé aucun profil pour l'instant."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <a href="/profile">Mon profil</a>
        <a href="/dashboard">Accueil</a>
        <a href={userRole === "student" ? "/offers" : "/students"}>
          {userRole === "student" ? "Voir annonces" : "Voir profils"}
        </a>
      </footer>
    </div>
  );
}

export default Dashboard;