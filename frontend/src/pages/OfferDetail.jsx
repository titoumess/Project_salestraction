import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Menu from "../components/Menu";

function OfferDetail() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [company, setCompany] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/offers/${id}`)
      .then(res => res.json())
      .then(data => {
        setOffer(data);
        if (data.id_company) {
          fetch(`${apiUrl}/api/companies/${data.id_company}`)
            .then(res => res.json())
            .then(setCompany);
        }
      });
  }, [id, apiUrl]);

  if (!offer) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <div className="flex flex-col items-start gap-2 px-6 pt-6">
        <Logo />
        <Menu />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center pt-8 pb-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg flex flex-col items-center border border-blue-100">
          <img
            src="/default-profile.png"
            alt="Profil entreprise"
            className="w-24 h-24 rounded-full object-cover border mb-4"
          />
          <h1 className="text-3xl font-extrabold mb-2 text-[var(--color-accent)] text-center">
            {offer.title}
          </h1>
          <p className="text-gray-500 mb-2 text-center">{offer.product_service}</p>
          <div className="text-gray-700 w-full flex flex-col gap-2 mb-4">
            <div>
              <strong>Entreprise :</strong>{" "}
              {company ? company.name : <span className="text-gray-400">Chargement...</span>}
            </div>
            <div>
              <strong>Description :</strong> {offer.description}
            </div>
            <div>
              <strong>Rémunération :</strong>{" "}
              {offer.remuneration ? `${offer.remuneration} €` : "Non rémunéré"}
            </div>
            <div>
              <strong>Statut :</strong> {offer.status}
            </div>
            <div>
              <strong>Mode :</strong>{" "}
              {offer.remote ? "Télétravail possible" : "Présentiel uniquement"}
            </div>
          </div>
          <button
            className="mt-4 bg-[var(--color-accent)] text-white py-2 px-6 rounded-lg hover:bg-[var(--color-accent-dark)] transition"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferDetail;