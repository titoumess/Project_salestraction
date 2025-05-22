import React from "react";

function Like({ items, userRole, emptyMessage }) {
  return (
    <section className="mt-8">
      <ul className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="p-2 border rounded-lg shadow flex items-center gap-4">
              <img
                src="/default-profile.png"
                alt="Profil"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                {userRole === "student" ? (
                  <>
                    <p className="font-bold">
                      {item.firstname} {item.lastname}
                    </p>
                    <p className="text-sm text-gray-600">{item.school}</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold">{item.productName}</p>
                    <p className="text-sm text-gray-600">{item.companyName}</p>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">{emptyMessage}</p>
        )}
      </ul>
    </section>
  );
}

export default Like;