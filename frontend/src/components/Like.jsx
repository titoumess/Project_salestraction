import React from "react";
import { useNavigate } from "react-router-dom";

function Like({ items, userRole, emptyMessage }) {
  const navigate = useNavigate();

  return (
    <section className="mt-8">
      <ul className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item.id_student || item.id_offer}
              className="flex items-center gap-4 bg-white rounded-2xl shadow-md border border-blue-100 px-4 py-3 transition hover:shadow-lg hover:scale-[1.01] cursor-pointer"
              onClick={() => {
                if (userRole === "student") {
                  navigate(`/offers/${item.id_company}`);
                } else {
                  navigate(`/students/${item.id_student}`);
                }
              }}
            >
              <img
                src="/default-profile.png"
                alt="Profil"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm bg-gray-50"
              />
              <div className="flex flex-col">
                {userRole === "student" ? (
                  <>
                    <span className="font-semibold text-[var(--color-accent)] text-base">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.product_service}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-[var(--color-accent)] text-base">
                      {item.firstname} {item.lastname}
                    </span>
                    <span className="text-sm text-gray-500">{item.school}</span>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400 italic text-center">{emptyMessage}</p>
        )}
      </ul>
    </section>
  );
}

export default Like;