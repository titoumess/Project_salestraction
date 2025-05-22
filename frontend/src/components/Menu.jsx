import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Menu.css";

function Menu({ userRole = "student", profilePic }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/login");
    window.location.reload(); // Ajoute cette ligne
  };

  return (
    <nav className="menu-container">
      <Link to={userRole === "student" ? "/offers" : "/students"}>
        {userRole === "student" ? "Offres" : "Profils"}
      </Link>
      <Link to="/dashboard">Accueil</Link>
      <div className="profile-menu" ref={menuRef}>
        <div
          className="profile-pic"
          onClick={() => setOpen((o) => !o)}
          tabIndex={0}
        >
          <img
            src={profilePic || "/default-profile.png"}
            alt="Profil"
          />
        </div>
        {open && (
          <div className="dropdown-menu">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              Mon profil
            </button>
            <button
              type="button"
              onClick={handleLogout}
            >
              Me déconnecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Menu;