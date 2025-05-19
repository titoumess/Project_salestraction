import React, { useState, useEffect } from "react";
import Match from "./components/Match";
import Like from "./components/Like";

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
    <div className="min-h-screen bg-white text-gray-800">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">SALESTRACTION</h1>
        <nav className="flex gap-4">
          <a href="/home" className="text-gray-600 hover:text-black">Accueil</a>
          {userRole === "student" ? (
            <a href="/offers" className="text-gray-600 hover:text-black">Découvrir les annonces</a>
          ) : (
            <a href="/students" className="text-gray-600 hover:text-black">Découvrir les étudiants</a>
          )}
          <a href="/profile" className="text-gray-600 hover:text-black">
            <span className="material-icons">account_circle</span>
          </a>
        </nav>
      </header>

      <main className="p-4">
        {/* Matches */}
        <Match matches={matches} userRole={userRole} />

        {/* Ils vous ont aimé */}
        <Like
          title="Ils vous ont aimé"
          items={likedBy}
          userRole={userRole}
          emptyMessage="Personne n'a encore aimé votre profil."
        />

        {/* Vous avez aimé */}
        <Like
          title="Vous avez aimé"
          items={liked}
          userRole={userRole}
          emptyMessage="Vous n'avez encore aimé aucun profil."
        />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-around">
        <a href="/profile" className="text-gray-600 hover:text-black">Mon profil</a>
        <a href="/home" className="text-gray-600 hover:text-black">Accueil</a>
        <a href={userRole === "student" ? "/offers" : "/students"} className="text-gray-600 hover:text-black">
          {userRole === "student" ? "Voir annonces" : "Voir profils"}
        </a>
      </footer>
    </div>
  );
}

export default Dashboard;