import React from "react";

function Match({ matches, userRole, emptyMessage }) {
  if (!matches || matches.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div key={match.id} className="p-4 border rounded-lg shadow">
            <h3 className="font-bold">
              {userRole === "student" ? match.companyName : match.studentName}
            </h3>
            <p className="text-sm text-gray-600">
              {userRole === "student" ? match.description : match.school}
            </p>
            <button className="mt-2 bg-purple-500 text-white py-1 px-4 rounded hover:bg-purple-600">
              Message
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Match;