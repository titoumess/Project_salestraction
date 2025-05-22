import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Menu from "../components/Menu";

function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [offers, setOffers] = useState([]);
  const companyId = localStorage.getItem("companyId");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (companyId) {
      fetch(`${apiUrl}/api/companies/${companyId}`)
        .then(res => res.json())
        .then(setCompany);

      fetch(`${apiUrl}/api/offers?companyId=${companyId}`)
        .then(res => res.json())
        .then(setOffers);
    }
  }, [companyId, apiUrl]);

  if (!company) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-start gap-2 px-6 pt-6">
        <Logo />
        <Menu userRole="startup" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center pt-8 pb-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg flex flex-col items-center border border-blue-100">
          <img
            src="/default-profile.png"
            alt="Profil entreprise"
            className="w-24 h-24 rounded-full object-cover border mb-4"
          />
          <h1 className="text-3xl font-extrabold mb-2 text-[var(--color-accent)] text-center">
            {company.name}
          </h1>
          <button
            className="mb-4 px-4 py-2 bg-[var(--color-accent-dark)] text-white rounded hover:bg-[var(--color-accent)] transition font-semibold"
            onClick={() => navigate("/signup-startup", { state: { company } })}
          >
            Modifier mon profil
          </button>
          <div className="text-gray-700 w-full flex flex-col gap-2 mb-4">
            <div><strong>Email :</strong> {company.email}</div>
            <div><strong>Téléphone :</strong> {company.phone_number}</div>
            <div><strong>SIRET :</strong> {company.siret}</div>
            <div><strong>Code postal :</strong> {company.postal_code}</div>
          </div>
          <h2 className="text-xl font-bold mt-6 mb-2 text-[var(--color-accent)]">Mes offres</h2>
          {offers.length === 0 ? (
            <div className="text-gray-400">Aucune offre publiée</div>
          ) : (
            <ul className="w-full">
              {offers.map((offer) => (
                <li
                  key={offer.id_offer}
                  className="mb-4 p-4 rounded-xl bg-white border border-gray-200 shadow flex flex-col gap-1"
                >
                  <div className="font-semibold text-lg text-[var(--color-accent)]">{offer.title}</div>
                  <div className="text-sm text-gray-600">{offer.product_service}</div>
                  <div className="text-sm">{offer.remuneration ? `Rémunération : ${offer.remuneration} €` : "Non rémunéré"}</div>
                  <div className="text-sm">{offer.remote ? "Télétravail possible" : "Présentiel uniquement"}</div>
                  <button
                    className="mt-3 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-dark)] transition font-semibold self-end"
                    onClick={() => navigate("/create-offer", { state: { offer } })}
                  >
                    Modifier cette offre
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;