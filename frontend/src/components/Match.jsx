import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Match({ matches, userRole, emptyMessage }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({}); // {match_id: {infos}}

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    async function fetchDetails() {
      const newDetails = {};
      for (const match of matches) {
        if (userRole === "student") {
          // Récupère l'offre et la startup associée
          const offer = await fetch(`${apiUrl}/api/offers/${match.idOffer}`).then(res => res.json());
          const company = await fetch(`${apiUrl}/api/companies/${offer.idCompany}`).then(res => res.json());
          newDetails[match.match_id] = {
            productName: offer.title,
            companyName: company.name,
          };
        } else {
          // Récupère l'étudiant associé
          const student = await fetch(`${apiUrl}/api/students/${match.idStudent}`).then(res => res.json());
          newDetails[match.match_id] = {
            firstname: student.firstname,
            lastname: student.lastname,
            school: student.school,
          };
        }
      }
      setDetails(newDetails);
    }
    if (matches.length > 0) fetchDetails();
  }, [matches, userRole]);

  if (!matches || matches.length === 0) {
    return <p className="text-gray-400 italic text-center">{emptyMessage}</p>;
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="flex flex-col items-center bg-white rounded-xl shadow p-4"
          >
            <img
              src="/default-profile.png"
              alt="Profil"
              className="w-30 h-30 rounded-full object-cover mb-3"
            />
            <h3 className="font-bold text-lg text-[var(--color-accent)] text-center">
              {userRole === "student"
                ? details[match.match_id]?.companyName || ""
                : `${details[match.match_id]?.firstname || ""} ${details[match.match_id]?.lastname || ""}`}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              {userRole === "student"
                ? details[match.match_id]?.productName
                  ? ` ${details[match.match_id]?.productName}`
                  : ""
                : details[match.match_id]?.school
                ? `étudiant·e à ${details[match.match_id]?.school}`
                : ""}
            </p>
            <button
              className="mt-auto bg-[var(--color-accent)] text-white py-1 px-4 rounded hover:bg-[var(--color-accent-dark)] transition"
              // onClick={() => navigate(`/messages/${match.match_id}`)}
            >
              Contacter
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Match;