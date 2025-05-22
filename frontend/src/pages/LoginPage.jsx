import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("étudiant");

  const handleSignin = () => {

    navigate("/signin-page");
  }

  const handleSignup = () => {
    if (userType === "étudiant") {
      navigate("/signup-etudiant");
    } else {
      navigate("/signup-startup");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Logo en haut à gauche */}
      <div className="absolute top-4 left-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-[var(--color-accent)]">Logo</span>
        </div>
      </div>

      {/* Bouton "Je me connecte" en haut à droite */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSignin}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-[var(--color-accent)] hover:text-white transition-all"
        >
          Je me connecte
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Pitch */}
        <div className="mb-6 w-4/5 bg-gray-100 text-gray-800 text-center py-4 rounded-lg shadow-md">
          <p>StartMatch : faites matcher votre ambition avec les besoins des start-ups.</p>
        </div>

        {/* Switch type utilisateur */}
        <div className="mb-6 w-4/5 flex items-center justify-center">
          <div className="flex items-center bg-gray-200 rounded-full p-1 w-full max-w-sm transition-all duration-300">
            <button
              onClick={() => setUserType("étudiant")}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-300 ${
                userType === "étudiant"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-gray-800"
              }`}
            >
              Je suis étudiant
            </button>
            <button
              onClick={() => setUserType("start-up")}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-300 ${
                userType === "start-up"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-gray-800"
              }`}
            >
              Je suis une start-up
            </button>
          </div>
        </div>

        {/* Avantage utilisateur */}
        <div className="mb-6 w-4/5 bg-gray-100 text-center py-4 rounded-lg shadow-md">
          {userType === "étudiant" ? (
            <p>
              Boostez votre CV avec de vraies missions terrain dans des start-ups ambitieuses.
            </p>
          ) : (
            <p>
              Faites matcher vos besoins avec des étudiants en école de commerce motivés.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="w-4/5 flex flex-col gap-4">
          <button
            onClick={handleSignup}
            className="bg-[var(--color-accent)] text-white py-3 rounded-lg text-center hover:bg-[var(--color-accent-dark)] transition-all"
          >
            Je rejoins l’aventure 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
