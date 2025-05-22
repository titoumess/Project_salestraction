import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

function SignupEtudiant() {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const [form, setForm] = useState({
    firstname: student?.firstname || "",
    lastname: student?.lastname || "",
    email: student?.email || "",
    password: "",
    age: student?.age || "",
    phone_number: student?.phone_number || "",
    school: student?.school || "",
    linkedin_url: student?.linkedin_url || "",
    postal_code1: student?.postal_code1 || "",
    postal_code2: student?.postal_code2 || "",
    skills: student?.skills || "",
    comment: student?.comment || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...envoie les données au backend...
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Conversion des champs numériques
    if (data.age) data.age = parseInt(data.age, 10);
    if (data.postal_code1) data.postal_code1 = parseInt(data.postal_code1, 10);
    if (data.postal_code2) data.postal_code2 = data.postal_code2 ? parseInt(data.postal_code2, 10) : null;

    console.log(data)

    const response = await fetch(`${apiUrl}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const student = await response.json();
      localStorage.clear();
      // Stocke l'id de l'étudiant
      localStorage.setItem("studentId", student.id_student);
      // Stocke la validation admin dans le localStorage
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userRole", "student");
      navigate("/pending-validation"); // <-- redirection vers la page d'attente
    } else {
      alert("Erreur lors de la création du compte étudiant");
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

      {/* Contenu principal */}
      <div className="flex flex-1 items-center justify-center mt-4">
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
              name="lastname"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre nom"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              name="firstname"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre prénom"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Âge */}
          <div className="mb-4">
            <label className="block text-gray-700">Âge</label>
            <input
              type="number"
              name="age"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre âge"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Téléphone */}
          <div className="mb-4">
            <label className="block text-gray-700">Téléphone</label>
            <input
              type="tel"
              name="phone_number"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre numéro de téléphone"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              required
            />
          </div>

          {/* École */}
          <div className="mb-4">
            <label className="block text-gray-700">École</label>
            <input
              type="text"
              name="school"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Votre école"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              required
            />
          </div>

          {/* URL LinkedIn (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">URL LinkedIn (optionnel)</label>
            <input
              type="url"
              name="linkedin_url"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Lien vers votre profil LinkedIn"
              value={form.linkedin_url}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
            />
          </div>

          {/* Code postal 1 */}
          <div className="mb-4">
            <label className="block text-gray-700">Code postal 1</label>
            <input
              type="text"
              name="postal_code1"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Code postal principal"
              value={form.postal_code1}
              onChange={(e) => setForm({ ...form, postal_code1: e.target.value })}
              required
            />
          </div>

          {/* Code postal 2 (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">Code postal 2 (optionnel)</label>
            <input
              type="text"
              name="postal_code2"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Code postal secondaire"
              value={form.postal_code2}
              onChange={(e) => setForm({ ...form, postal_code2: e.target.value })}
            />
          </div>

          {/* Compétences */}
          <div className="mb-4">
            <label className="block text-gray-700">Compétences</label>
            <input
              type="text"
              name="skills"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Vos compétences (ex: JavaScript, Python...)"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              required
            />
          </div>

          {/* Commentaire (optionnel) */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="comment"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Ajoutez un commentaire"
              rows="3"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
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