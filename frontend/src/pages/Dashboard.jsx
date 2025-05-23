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
  const [selectedOfferId, setSelectedOfferId] = useState(() => {
    const stored = localStorage.getItem("offerId");
    return stored ? Number(stored) : null;
  });
  const [students, setStudents] = useState([]);
  const [allOffers, setAllOffers] = useState([]);

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
          if (data.length > 0) {
            const stored = localStorage.getItem("offerId");
            if (stored && data.some(o => o.id_offer === Number(stored))) {
              setSelectedOfferId(Number(stored));
            } else {
              setSelectedOfferId(data[0].id_offer);
              localStorage.setItem("offerId", data[0].id_offer);
            }
          }
        });
    }
  }, [userRole]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/students`)
      .then(res => res.json())
      .then(setStudents);
    fetch(`${apiUrl}/api/offers`)
      .then(res => res.json())
      .then(setAllOffers);
  }, []);

  // Pour une startup : liked = likes sur des étudiants, likedBy = likes sur l'offre par des étudiants
  const likedStudents = liked
    .map(like => students.find(s => s.id_student === like.idStudent))
    .filter(Boolean);

  const likedByStudents = likedBy
    .map(like => students.find(s => s.id_student === like.idStudent))
    .filter(Boolean);

  // Pour un étudiant : liked = likes sur des offres, likedBy = likes sur le profil par des startups
  const likedOffers = liked
    .map(like => allOffers.find(o => o.id_offer === like.idOffer))
    .filter(Boolean);

  const likedByStartups = likedBy
    .map(like => allOffers.find(o => o.id_offer === like.idOffer))
    .filter(Boolean);

  return (
    <div className="dashboard-container">
      <Logo />
      {/* Sélecteur d'offre pour les startups */}
      {userRole === "startup" && offers.length > 0 && (
        <div className="flex flex-col gap-1 px-4 pt-4 pb-2 w-full">
          <label
            htmlFor="offer-select"
            className="font-semibold text-gray-700 text-base mb-1"
          >
            Sélectionnez une offre
          </label>
          <select
            id="offer-select"
            className="border border-gray-200 rounded-xl p-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:border-[var(--color-accent)] transition w-full text-base"
            value={selectedOfferId || ""}
            onChange={e => {
              const newId = Number(e.target.value);
              setSelectedOfferId(newId);
              localStorage.setItem("offerId", newId);
            }}
          >
            {offers.map(offer => (
              <option key={offer.id_offer} value={offer.id_offer}>
                {offer.title}
              </option>
            ))}
          </select>
        </div>
      )}
      <Menu userRole={localStorage.getItem("userRole")} />
      <main className="dashboard-main pb-24">
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
        <div className="dashboard-likes-container flex gap-8">
          <section className="dashboard-liked-by flex-1 max-h-[250px] overflow-y-auto pr-2">
            <h2>Ils vous ont aimé</h2>
            <Like
              items={userRole === "student" ? likedByStartups : likedByStudents}
              userRole={userRole}
              emptyMessage={
                userRole === "student"
                  ? "Personne n'a encore aimé votre profil. Un peu de patience..."
                  : "Aucun étudiant n'a encore montré d'intérêt pour votre offre. Un peu de patience..."
              }
            />
          </section>
          <section className="dashboard-like flex-1 max-h-[250px] overflow-y-auto pr-2">
            <h2>Vous avez aimé</h2>
            <Like
              items={userRole === "student" ? likedOffers : likedStudents}
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
      <footer className="dashboard-footer fixed bottom-0 left-0 w-full bg-[var(--color-accent)] flex justify-around items-center py-4 z-50 shadow-lg">
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