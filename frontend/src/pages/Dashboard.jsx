import React, { useState, useEffect } from "react";
import Match from "../components/Match";
import Like from "../components/Like";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import "./../styles/Dashboard.css";

function Dashboard() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "student");
  const [matches, setMatches] = useState([]);
  const [likedBy, setLikedBy] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const studentId = localStorage.getItem("studentId");
    const companyId = localStorage.getItem("companyId");

    if (userRole === "student" && studentId) {
      // Récupère les matchs pour l'étudiant
      fetch(`${apiUrl}/api/matching/student/${studentId}`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      // Les deux autres fetch restent inchangés si ce ne sont pas des matchs
      fetch(`${apiUrl}/api/students/${studentId}/liked-by`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data));

      fetch(`${apiUrl}/api/students/${studentId}/liked-offers`)
        .then((response) => response.json())
        .then((data) => setLiked(data));
    } else if (userRole === "startup" && companyId) {
      // Récupère les matchs pour la startup (par offre)
      fetch(`${apiUrl}/api/matching/offer/${companyId}`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      // Les deux autres fetch restent inchangés si ce ne sont pas des matchs
      fetch(`${apiUrl}/api/startups/${companyId}/liked-by`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data));

      fetch(`${apiUrl}/api/startups/${companyId}/liked-students`)
        .then((response) => response.json())
        .then((data) => setLiked(data));
    }
  }, [userRole]);

  return (
    <div className="dashboard-container">
      <Logo />
      <Menu userRole={userRole} />
      <main className="dashboard-main">
        {/* Matches */}
        <section className="dashboard-section">
          <h2 className="section-title">C'est un match</h2>
          <Match
            matches={matches}
            userRole={userRole}
            emptyMessage="Vous n'avez pas encore de match mais gardez espoir !"
          />
        </section>

        {/* Conteneur pour "liked" et "liked-by" */}
        <div className="dashboard-likes-container">
          <section className="dashboard-liked-by">
            <h2>Ils vous ont aimé</h2>
            <Like
              items={likedBy}
              userRole={userRole}
              emptyMessage={
                userRole === "student"
                  ? "Personne n'a encore aimé votre profil. Un peu de patience..."
                  : "Aucun étudiant n'a encore montré d'intérêt pour votre offre. Un peu de patience..."
              }
            />
          </section>
          <section className="dashboard-like">
            <h2>Vous avez aimé</h2>
            <Like
              items={liked}
              userRole={userRole}
              emptyMessage={
                userRole === "student"
                  ? "Vous n'avez aimé aucune offre pour l'instant."
                  : "Vous n'avez encore aimé aucun profil."
              }
            />
          </section>
        </div>
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