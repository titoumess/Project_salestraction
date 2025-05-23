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
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const studentId = localStorage.getItem("studentId");
    const companyId = localStorage.getItem("companyId");

    if (userRole === "student" && studentId) {
      // Matches
      fetch(`${apiUrl}/api/matching/student/${studentId}`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      // LikedBy : ceux qui ont aimé l'étudiant (isStudent: false)
      fetch(`${apiUrl}/api/likings/student/${studentId}`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data.filter(like => like.isStudent === false)));

      // Liked : ce que l'étudiant a aimé (isStudent: true)
      fetch(`${apiUrl}/api/likings/student/${studentId}`)
        .then((response) => response.json())
        .then((data) => setLiked(data.filter(like => like.isStudent === true)));
    } else if (userRole === "startup" && selectedOfferId) {
      // Matches pour l'offre sélectionnée
      fetch(`${apiUrl}/api/matching/offer/${selectedOfferId}`)
        .then((response) => response.json())
        .then((data) => setMatches(data));

      // LikedBy : ceux qui ont aimé cette offre (isStudent: true)
      fetch(`${apiUrl}/api/likings/offer/${selectedOfferId}`)
        .then((response) => response.json())
        .then((data) => setLikedBy(data.filter(like => like.isStudent === true)));

      // Liked : ce que la startup a aimé pour cette offre (isStudent: false)
      fetch(`${apiUrl}/api/likings/offer/${selectedOfferId}`)
        .then((response) => response.json())
        .then((data) => setLiked(data.filter(like => like.isStudent === false)));
    }
  }, [userRole, selectedOfferId]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const companyId = localStorage.getItem("companyId");

    if (userRole === "startup" && companyId) {
      fetch(`${apiUrl}/api/offers?companyId=${companyId}`)
        .then(res => res.json())
        .then(data => {
          setOffers(data);
          if (data.length > 0) setSelectedOfferId(data[0].id_offer);
        });
    }
  }, [userRole]);

  return (
    <div className="dashboard-container">
      <Logo />
      <Menu userRole={localStorage.getItem("userRole")} />
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

        {/* Sélecteur d'offre pour les startups */}
        {userRole === "startup" && offers.length > 0 && (
          <div className="mb-6 flex items-center gap-2">
            <label htmlFor="offer-select" className="font-semibold text-gray-700">Sélectionnez une offre :</label>
            <select
              id="offer-select"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)]"
              value={selectedOfferId || ""}
              onChange={e => setSelectedOfferId(Number(e.target.value))}
            >
              {offers.map(offer => (
                <option key={offer.id_offer} value={offer.id_offer}>
                  {offer.title}
                </option>
              ))}
            </select>
          </div>
        )}
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