import React from "react";

function Like({ title, items, userRole, emptyMessage }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="p-2 border rounded-lg shadow">
              <p className="font-bold">
                {userRole === "student" ? item.companyName : item.studentName}
              </p>
              <p className="text-sm text-gray-600">
                {userRole === "student" ? item.description : item.school}
              </p>
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