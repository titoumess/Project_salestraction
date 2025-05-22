import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function SignupStartup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`${apiUrl}/api/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const company = await response.json();
      localStorage.clear();
      // Stocke l'id de la startup
      localStorage.setItem("companyId", company.id_company);
      // Stocke la validation admin dans le localStorage
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", "startup");
      // Redirige vers la création d'offre
      navigate("/create-offer");
    } else {
      alert("Erreur lors de la création du compte startup");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Logo + bouton retour en haut à gauche */}
      <div className="flex flex-col items-start gap-2 px-6 pt-6">
        <Logo />
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-bold"
        >
          ← Retour
        </button>
      </div>

      {/* Formulaire centré, démarre après le header */}
      <div className="flex flex-1 items-center justify-center mt-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-4/5 max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
            Inscription Start-up
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">Nom de l'entreprise</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nom de votre entreprise"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Téléphone</label>
            <input
              type="tel"
              name="phone_number"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre numéro de téléphone"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Code postal</label>
            <input
              type="number"
              name="postal_code"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Code postal"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">SIRET</label>
            <input
              type="text"
              name="siret"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Numéro SIRET"
              required
            />
          </div>
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

export default SignupStartup;