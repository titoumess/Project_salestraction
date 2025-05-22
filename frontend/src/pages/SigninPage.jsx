import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.API_BACKEND;
  const [checkboxes, setCheckboxes] = useState({
    student: false,
    startup: false, 
    admin: false
  });

  const handleCheckboxChange = (type) => {
    setCheckboxes({
      student: type === 'student' ? !checkboxes.student : false,
      startup: type === 'startup' ? !checkboxes.startup : false,
      admin: type === 'admin' ? !checkboxes.admin : false
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    let apiUrl = import.meta.env.VITE_API_URL;

    // Vérifier si une checkbox est cochée
    if (!checkboxes.student && !checkboxes.startup && !checkboxes.admin) {
      setError("Veuillez sélectionner un type de compte");
      return;
    }

    try {
      let response;
      if (checkboxes.student) {
        response = await fetch(`http://localhost:8080/api/studentsauth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {

          const student = await response.json();

          
        
          console.log("On et dans la fonction student")
          
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userRole", "student");
          localStorage.setItem("studentId", student.id_student);
          localStorage.setItem("adminValidation", student.adminValidation.toString());
          localStorage.setItem("studentAge", student.age);
          localStorage.setItem("studentLinkedIn", student.linkedin_url);
          localStorage.setItem("studentPhoneNumber", student.phone_number);
          localStorage.setItem("studentPostalCode1", student.postal_code1);
          localStorage.setItem("studentPostalCode2", student.postal_code2);
          localStorage.setItem("studentComment", student.comment);
          localStorage.setItem("studentSchool", student.school);
          localStorage.setItem("studentSkills", student.skills);
          localStorage.setItem("studentFirstname", student.firstname);
          localStorage.setItem("studentLastname", student.lastname);
          localStorage.setItem("studentEmail", student.email);


          if (student.adminValidation === 1) {
            console.log("On et dans la fonction student if")
            localStorage.setItem("isAdminValidated", "true")
            navigate("/dashboard");
          } else {
            console.log("On et dans la fonction student else")
            localStorage.setItem("isAdminValidated", "false")
            navigate("/pending-validation");
          }
          window.location.reload();
          return;
        }
      } else if (checkboxes.startup) {
        response = await fetch(`http://localhost:8080/api/companiesauth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const company = await response.json();
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userRole", "startup");
          localStorage.setItem("companyId", company.company_id);
          localStorage.setItem("adminValidation", company.adminValidation);
          localStorage.setItem("companyName", company.name);
          localStorage.setItem("companyEmail", company.email);
          localStorage.setItem("companySiret", company.siret);
          localStorage.setItem("postalCode", company.postal_code);
          localStorage.setItem("companyPhoneNumber", company.phone_number);
          if (company.adminValidation === 1) {
            console.log("On et dans la fonction startup if")
            localStorage.setItem("isAdminValidated", "true")
            navigate("/dashboard");
          } else {
            console.log("On et dans la fonction startup else")
            localStorage.setItem("isAdminValidated", "false")
            navigate("/pending-validation");
          }
          window.location.reload();
          return;
        }
      } else if (checkboxes.admin) {
        response = await fetch(`http://localhost:8080/api/adminsauth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const admin = await response.json();
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("adminId", admin.id_admin);
          localStorage.setItem("adminEmail", admin.email);

          navigate("/admin-dashboard");
          window.location.reload();
          return;
        }
      }

      setError("Identifiants incorrects. Veuillez réessayer.");
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("userRole");
      e.target.reset();
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur de connexion:", error);
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
          <div className="mb-4 flex items-center space-x-8 justify-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="student"
                checked={checkboxes.student}
                onChange={() => handleCheckboxChange('student')}
                className="form-checkbox"
              />
              <span>Étudiant</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="startup"
                checked={checkboxes.startup}
                onChange={() => handleCheckboxChange('startup')}
                className="form-checkbox"
              />
              <span>Startup</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="admin"
                checked={checkboxes.admin}
                onChange={() => handleCheckboxChange('admin')}
                className="form-checkbox"
              />
              <span>Admin</span>
            </label>
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