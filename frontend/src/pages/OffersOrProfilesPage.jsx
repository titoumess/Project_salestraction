import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Menu from "../components/Menu";

function OffersOrProfilesPage({ userRole }) {
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Si étudiant, on récupère aussi les entreprises pour afficher leur nom
  useEffect(() => {
    if (userRole === "student") {
      fetch(`${apiUrl}/api/companies`)
        .then(res => res.json())
        .then(data => {
          const map = {};
          data.forEach(c => map[c.id_company] = c.name);
          setCompanies(map);
        });
    }
  }, [userRole, apiUrl]);

  useEffect(() => {
    if (userRole === "student") {
      fetch(`${apiUrl}/api/offers`)
        .then((res) => res.json())
        .then(setItems);
    } else {
      fetch(`${apiUrl}/api/students`)
        .then((res) => res.json())
        .then(setItems);
    }
  }, [userRole, apiUrl]);

  return (
    <div className="offers-profiles-container">
      <Logo />
      <div className="filters-bar">
        <input
          type="text"
          placeholder={userRole === "student" ? "Filtrer les offres..." : "Filtrer les profils..."}
          className="filters-input"
        />
      </div>
      <div className="items-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {items.map((item) => (
          <div
            className="item-card bg-white rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center p-6 transition hover:scale-[1.02] min-h-[370px]"
            key={item.id_offer || item.id_student}
            onClick={() =>
              navigate(
                `/${userRole === "student" ? "offers" : "students"}/${item.id_offer || item.id_student}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src="/default-profile.png"
              alt="Profil"
              className="w-20 h-20 rounded-full object-cover border mb-4"
            />
            <div className="item-description text-center w-full flex-1 flex flex-col">
              {userRole === "student" ? (
                <>
                  <h2 className="font-extrabold text-lg text-[var(--color-accent)] mb-1">{item.title}</h2>
                  <div className="text-sm text-gray-500 mb-1">{item.product_service}</div>
                  <div className="text-sm text-gray-700 mb-1">
                    {companies[item.id_company] && (
                      <span className="font-semibold">{companies[item.id_company]}</span>
                    )}
                  </div>
                  <div className="text-sm mb-1">
                    {item.remuneration ? `Rémunération : ${item.remuneration} €` : "Non rémunéré"}
                  </div>
                  <div className="text-sm mb-3">
                    {item.remote ? "Télétravail possible" : "Présentiel uniquement"}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-extrabold text-lg text-[var(--color-accent)] mb-1">
                    {item.firstname} {item.lastname}
                  </h2>
                  <div className="text-sm text-gray-500 mb-1">{item.school}</div>
                  <div className="text-sm text-gray-700 mb-3">{item.skills}</div>
                </>
              )}
            </div>
            <button
              className="mt-auto w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition"
              onClick={e => {
                e.stopPropagation();
                // Ajoute ici la logique pour liker
              }}
            >
              J’aime
            </button>
          </div>
        ))}
      </div>
      <Menu userRole={userRole} />
    </div>
  );
}

export default OffersOrProfilesPage;