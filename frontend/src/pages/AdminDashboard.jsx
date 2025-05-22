import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import "./../styles/Dashboard.css";

function AdminDashboard() {
  const [studentsToValidate, setStudentsToValidate] = useState([]);
  const [companiesToValidate, setEntreprisesToValidate] = useState([]);
  const [offersToValidate, setOffersToValidate] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/students?admin_validation=0`)
      .then((res) => res.json())
      .then(setStudentsToValidate);

    fetch(`${apiUrl}/api/companies?admin_validation=0`)
      .then((res) => res.json())
      .then(setEntreprisesToValidate);

    fetch(`${apiUrl}/api/offers?admin_validation=0`)
      .then((res) => res.json())
      .then(setOffersToValidate);
  }, []);

  const handleValidation = (type, id, isAccepted) => {
    if (isAccepted) {
      fetch(`${apiUrl}/api/${type}/${id}/validate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_validation: 1 }),
      }).then(() => {
        removeFromList(type, id);
      });
    } else {
      removeFromList(type, id);
    }
  };

  const removeFromList = (type, id) => {
    if (type === "students") setStudentsToValidate(list => list.filter(s => s.id_student !== id));
    if (type === "companies") setEntreprisesToValidate(list => list.filter(e => e.id_company !== id));
    if (type === "offers") setOffersToValidate(list => list.filter(o => o.id_offer !== id));
  };

  return (
    <div className="dashboard-container">
      <Logo />
      <Menu userRole="admin" />
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2 className="section-title">Étudiants à valider</h2>
          <ul>
            {studentsToValidate.length === 0 && (
              <li key="no-student" className="empty-message">Aucun étudiant à valider.</li>
            )}
            {studentsToValidate.map(student => (
              <li key={student.id_student} className="validation-item">
                <span>
                  <strong>{student.firstname} {student.lastname}</strong> ({student.email})
                </span>
                <span className="button-group">
                  <button
                    className="btn btn-validate"
                    onClick={() => handleValidation("students", student.id_student, true)}
                  >
                    ✅ Valider
                  </button>
                  <button
                    className="btn btn-refuse"
                    onClick={() => handleValidation("students", student.id_student, false)}
                  >
                    ❌ Refuser
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="dashboard-section">
          <h2 className="section-title">Entreprises à valider</h2>
          <ul>
            {companiesToValidate.length === 0 && (
              <li key="no-company" className="empty-message">Aucune entreprise à valider.</li>
            )}
            {companiesToValidate.map(company => (
              <li key={company.id_company} className="validation-item">
                <span>
                  <strong>{company.name}</strong> ({company.email})
                </span>
                <span className="button-group">
                  <button
                    className="btn btn-validate"
                    onClick={() => handleValidation("companies", company.id_company, true)}
                  >
                    ✅ Valider
                  </button>
                  <button
                    className="btn btn-refuse"
                    onClick={() => handleValidation("companies", company.id_company, false)}
                  >
                    ❌ Refuser
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="dashboard-section">
          <h2 className="section-title">Offres à valider</h2>
          <ul>
            {offersToValidate.length === 0 && (
              <li key="no-offer" className="empty-message">Aucune offre à valider.</li>
            )}
            {offersToValidate.map(offer => (
              <li key={offer.id_offer} className="validation-item">
                <span>
                  <strong>{offer.title}</strong> ({offer.entreprise?.nom})
                </span>
                <span className="button-group">
                  <button
                    className="btn btn-validate"
                    onClick={() => handleValidation("offers", offer.id_offer, true)}
                  >
                    ✅ Valider
                  </button>
                  <button
                    className="btn btn-refuse"
                    onClick={() => handleValidation("offers", offer.id_offer, false)}
                  >
                    ❌ Refuser
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;