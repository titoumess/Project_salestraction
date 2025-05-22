import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import Menu from "../components/Menu";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const studentId = id || localStorage.getItem("studentId");
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/students/${studentId}`)
      .then((res) => res.json())
      .then(setStudent);
  }, [id]);

  if (!student) return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-start gap-2 px-6 pt-6">
        <Logo />
        <Menu userRole={localStorage.getItem("userRole")} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center pt-8 pb-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg flex flex-col items-center border border-blue-100">
          {/* Avatar par défaut */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center mb-4 shadow">
            <span className="text-4xl text-white font-bold">
              {student.firstname?.charAt(0).toUpperCase()}{student.lastname?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2 text-[var(--color-accent)] text-center">
            {student.firstname} {student.lastname}
          </h1>
          <p className="text-gray-500 mb-4 text-center">{student.school}</p>
          <div className="w-full flex flex-col gap-2 text-gray-700">
            <div><strong>Âge :</strong> {student.age}</div>
            <div><strong>Email :</strong> <span className="break-all">{student.email}</span></div>
            <div><strong>Téléphone :</strong> {student.phone_number}</div>
            <div><strong>Compétences :</strong> {student.skills}</div>
            <div>
              <strong>LinkedIn :</strong>{" "}
              {student.linkedin_url ? (
                <a
                  href={student.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Voir le profil
                </a>
              ) : (
                <span className="text-gray-400">Non renseigné</span>
              )}
            </div>
            <div><strong>Code postal 1 :</strong> {student.postal_code1}</div>
            <div><strong>Code postal 2 :</strong> {student.postal_code2 || <span className="text-gray-400">Non renseigné</span>}</div>
            <div><strong>Commentaire :</strong> {student.comment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;