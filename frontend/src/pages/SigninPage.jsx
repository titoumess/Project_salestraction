import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    let userRole = "student";
    let apiUrl = import.meta.env.VITE_API_URL;

    // On tente d'abord étudiant
    let response = await fetch(`${apiUrl}/api/students/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const student = await response.json();
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("studentId", student.id_student);
      localStorage.setItem("admin_validation", String(student.admin_validation)); // Optionnel si tu veux suivre la validation
      navigate("/dashboard");
      window.location.reload();
      return;
    }

    // Si étudiant échoue, on tente startup
    userRole = "startup";
    response = await fetch(`${apiUrl}/api/companies/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const company = await response.json();
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("companyId", company.id_company);
      localStorage.setItem("admin_validation", String(company.admin_validation)); // Optionnel
      navigate("/dashboard");
      window.location.reload();
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("userRole");
      // Optionnel : Réinitialiser le formulaire
      e.target.reset(); 
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
          onClick={() => navigate(-1)}
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
            {error && <p className="text-red-500">{error}</p>}
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