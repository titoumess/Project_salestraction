// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const NotFoundPage = () => {
  return (
    <div>
        <Logo />
        <div className="h-screen flex flex-col items-center justify-cente px-4 text-center">
            <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                Page non trouvée
            </h2>
            <p className="text-gray-600 mb-6">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link
                to="/dashboard"
                className="inline-block px-6 py-3 rounded-full text-white shadow transition"
                style={{ backgroundColor: "var(--color-accent)" }}
            >
                Retour au tableau de bord
            </Link>
        </div>
    </div>
  );
};

export default NotFoundPage;
