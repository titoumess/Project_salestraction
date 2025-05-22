import React from "react";
import { useNavigate } from "react-router-dom";

function Match({ matches, userRole, emptyMessage }) {
  const navigate = useNavigate();

  if (!matches || matches.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }
  console.log(matches);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex flex-col items-center bg-white border rounded-xl shadow p-4"
          >
            <img
              src="/default-profile.png"
              alt="Profil"
              className="w-20 h-20 rounded-full object-cover border mb-3"
            />
            <h3 className="font-bold text-lg text-[var(--color-accent)] text-center">
              {userRole === "student"
                ? match.companyName
                : `${match.firstname} ${match.lastname}`}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              {userRole === "student"
                ? match.productName
                  ? `Offre : ${match.title}`
                  : match.description
                : match.school
                ? `étudiant·e à ${match.school}`
                : ""}
            </p>
            <button
              className="mt-auto bg-[var(--color-accent)] text-white py-1 px-4 rounded hover:bg-[var(--color-accent-dark)] transition"
              onClick={() => navigate(`/messages/${match.id}`)}
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Match;