import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function CreateOffer() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        product_service: "", 
        remuneration: "",
        remote: false,
        commission: "",
        status: "",
    });
    const id_company = localStorage.getItem("companyId");

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const id_company = localStorage.getItem("companyId");

    // On prépare l'objet à envoyer
    const offerToSend = {
      ...form,
      status: "ouverte",
      id_company: parseInt(id_company, 10),
      admin_validation: false,
    };

    fetch(`${apiUrl}/api/offers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offerToSend),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/dashboard");
        } else {
          alert("Erreur lors de la création de l'offre");
        }
      });
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
      {/* Formulaire centré */}
      <div className="flex flex-1 items-center justify-center mt-40">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md w-4/5 max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-[var(--color-accent)]">
            Créer une offre
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">Titre</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Titre de l'offre"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Description de l'offre"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Produit / Service</label>
            <input
              type="text"
              name="product_service"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Produit ou service"
              value={form.product_service}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rémunération (€)</label>
            <input
              type="number"
              name="remuneration"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Montant"
              value={form.remuneration}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              name="remote"
              checked={form.remote}
              onChange={handleChange}
              id="remote"
            />
            <label htmlFor="remote" className="text-gray-700">Télétravail possible</label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Commission (%)</label>
            <input
              type="number"
              name="commission"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Commission"
              value={form.commission}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-[var(--color-accent-dark)] transition-all"
          >
            Créer l'offre
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOffer;