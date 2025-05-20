import React from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
  
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
  
    if (email === "test@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", true); // Stocke l'état d'authentification
      localStorage.setItem("userRole", "student"); // Stocke le rôle de l'utilisateur
      console.log("Connexion réussie, redirection vers le dashboard...");
      navigate("/dashboard"); // Redirection vers le tableau de bord
    } else {
      alert("Identifiants incorrects");
    }
  };


  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Logo en haut à gauche */}
        <div className="absolute top-4 left-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-[var(--color-accent)]">Logo</span>
        </div>
      </div>
    
      {/* Bouton Retour */}
      <div className="absolute top-28 left-4">
        <button
          onClick={() => navigate(-1)} // Retourne à la page précédente
          className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-bold"
        >
          ← Retour
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSignin}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-4/5 max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
            Connexion Profil
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">Adresse mail</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Adresse mail"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de Passe</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition-all"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>

  );
}

export default SigninPage;