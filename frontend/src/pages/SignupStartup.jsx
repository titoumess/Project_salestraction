import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function SignupStartup() {
  const navigate = useNavigate();
  const location = useLocation();
  const company = location.state?.company;

  const isEdit = !!company;

  const [form, setForm] = useState({
    name: company?.name || "",
    email: company?.email || "",
    password: "",
    phone_number: company?.phone_number || "",
    postal_code: company?.postal_code || "",
    siret: company?.siret || "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${apiUrl}/api/companies/${company.id_company}`
      : `${apiUrl}/api/companies`;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const companyResp = await response.json();
      localStorage.clear();
      localStorage.setItem("companyId", companyResp.id_company);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", "startup");
      // Redirection selon création ou modification
      if (isEdit) {
        navigate("/company-profile");
      } else {
        navigate("/create-offer");
      }
    } else {
      alert("Erreur lors de la création ou modification du compte startup");
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
          className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-[var(--color-accent)]">
            {isEdit ? "Modifier mon profil start-up" : "Inscription Start-up"}
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Nom de l'entreprise</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Nom de votre entreprise"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Votre email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Votre mot de passe"
              required={!isEdit}
              value={form.password}
              onChange={handleChange}
            />
            {isEdit && (
              <span className="text-xs text-gray-500">
                Laissez vide pour ne pas modifier le mot de passe
              </span>
            )}
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone_number"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Votre numéro de téléphone"
              required
              value={form.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Code postal</label>
            <input
              type="number"
              name="postal_code"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Code postal"
              required
              value={form.postal_code}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">SIRET</label>
            <input
              type="text"
              name="siret"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[var(--color-accent)] transition"
              placeholder="Numéro SIRET"
              required
              value={form.siret}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition-all font-semibold shadow"
          >
            {isEdit ? "Enregistrer les modifications" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupStartup;