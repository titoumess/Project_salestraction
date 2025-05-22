import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function PendingValidation() {
  const navigate = useNavigate();


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