import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Menu from "../components/Menu";

function OffersOrProfilesPage({ userRole }) {
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState({});
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState(() => {
    const stored = localStorage.getItem("offerId");
    return stored ? Number(stored) : "";
  });
  const [likedList, setLikedList] = useState([]); // Liste complète des likes
  const [likedIds, setLikedIds] = useState([]);   // Juste les ids pour filtrer l'affichage
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

  // Récupérer les offres pour la startup
  useEffect(() => {
    if (userRole === "startup") {
      const companyId = localStorage.getItem("companyId");
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

  useEffect(() => {
    const fetchLiked = async () => {
      if (userRole === "student") {
        const studentId = localStorage.getItem("studentId");
        if (studentId) {
          const res = await fetch(`${apiUrl}/api/likings/student/${studentId}`);
          const data = await res.json();
          setLikedList(data.filter(like => like.isStudent === true));
          setLikedIds(data.filter(like => like.isStudent === true).map(like => like.idOffer));
        }
      } else if (userRole === "startup") {
        if (selectedOfferId) {
          const res = await fetch(`${apiUrl}/api/likings/offer/${selectedOfferId}`);
          const data = await res.json();
          setLikedList(data.filter(like => like.isStudent === false));
          setLikedIds(data.filter(like => like.isStudent === false).map(like => like.idStudent));
        }
      }
    };
    fetchLiked();
  }, [userRole, apiUrl, selectedOfferId]);

  const handleLike = async (item) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const userRole = localStorage.getItem("userRole");
    let liking = {};

    if (userRole === "student") {
      if (!item.id_offer) {
        alert("Impossible de liker cette offre : identifiant manquant.");
        return;
      }
      liking = {
        idStudent: Number(localStorage.getItem("studentId")),
        idOffer: item.id_offer,
        isStudent: true
      };
    } else {
      if (!item.id_student || !selectedOfferId) {
        alert("Impossible de liker ce profil : identifiant manquant.");
        return;
      }
      liking = {
        idStudent: item.id_student,
        idOffer: selectedOfferId,
        isStudent: false
      };
    }

    const response = await fetch(`${apiUrl}/api/likings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(liking)
    });

    if (response.ok) {
      setLikedIds(prev => [...prev, item.id_offer || item.id_student]);
    }
  };

  return (
    <div className="offers-profiles-container">
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
            {!likedIds.includes(userRole === "student" ? item.id_offer : item.id_student) && (
              <button
                className="mt-auto w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition"
                onClick={e => {
                  e.stopPropagation();
                  handleLike(item);
                }}
              >
                J’aime
              </button>
            )}
            {likedIds.includes(item.id_offer || item.id_student) && (
              <div className="mt-2 text-green-600 font-semibold flex items-center gap-1">
                Liké !
              </div>
            )}
          </div>
        ))}
      </div>
      <Menu userRole={localStorage.getItem("userRole")} />
    </div>
  );
}

export default OffersOrProfilesPage;