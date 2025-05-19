import React from "react";
import { useNavigate } from "react-router-dom";

function SignupEtudiant() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire étudiant soumis");
    navigate("/dashboard"); // Redirige vers la page d'accueil
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
      <div className="flex flex-1 items-center justify-center mt-32">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-4/5 max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
            Inscription Étudiant
          </h1>

          {/* Nom */}
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre nom"
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre prénom"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          {/* Âge */}
          <div className="mb-4">
            <label className="block text-gray-700">Âge</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre âge"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre email"
              required
            />
          </div>

          {/* Téléphone */}
          <div className="mb-4">
            <label className="block text-gray-700">Téléphone</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre numéro de téléphone"
              required
            />
          </div>

          {/* École */}
          <div className="mb-4">
            <label className="block text-gray-700">École</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre école"
              required
            />
          </div>

          {/* URL LinkedIn (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">URL LinkedIn (optionnel)</label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Lien vers votre profil LinkedIn"
            />
          </div>

          {/* Code postal 1 */}
          <div className="mb-4">
            <label className="block text-gray-700">Code postal 1</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Code postal principal"
              required
            />
          </div>

          {/* Code postal 2 (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">Code postal 2 (optionnel)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Code postal secondaire"
            />
          </div>

          {/* Commentaire (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">Commentaire (optionnel)</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Ajoutez un commentaire"
              rows="3"
            ></textarea>
          </div>

          {/* Bouton S'inscrire */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition-all"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupEtudiant;