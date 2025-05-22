import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function PendingValidation() {
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const companyId = localStorage.getItem("companyId");
    const studentId = localStorage.getItem("studentId");

    // On vérifie d'abord si on a un id de startup ou d'étudiant
    let endpoint = null;
    let id = null;
    if (companyId) {
      endpoint = `${apiUrl}/api/companies/${companyId}`;
      id = companyId;
    } else if (studentId) {
      endpoint = `${apiUrl}/api/students/${studentId}`;
      id = studentId;
    }

    if (endpoint) {
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          // Vérifie la valeur de admin_validation (attention à la casse selon ton backend)
          if (data.admin_validation === true || data.admin_validation === 1 || data.admin_validation === "true") {
            localStorage.setItem("admin_validation", "true");
            navigate("/dashboard");
          } else {
            localStorage.setItem("admin_validation", "false");
          }
        })
        .catch(() => {
          // En cas d'erreur, on reste sur la page d'attente
          localStorage.setItem("admin_validation", "false");
        });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <Logo />
      <h1 className="text-2xl font-bold mt-8 mb-4 text-[var(--color-accent)]">
        Votre compte est en attente de validation
      </h1>
      <p className="text-center max-w-md">
        Un administrateur doit valider votre compte avant que vous puissiez accéder à la plateforme.<br />
      </p>
    </div>
  );
}

export default PendingValidation;