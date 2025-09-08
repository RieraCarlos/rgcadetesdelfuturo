import QrScanner from "./QrScannerComponent";
import { useState } from "react";
import QRasistencia from "./Asistencia/QRasistencia";
import { Link } from "react-router-dom";

function IndexQr() {

  return (
    <div className="admin-panel-container">
      <header className="admin-panel-header">
        <h1>Panel Administrativo</h1>
        <p>
          Bienvenido al panel administrativo del curso de <strong>Educación en Valores con Disciplina Militar</strong>. Aquí puedes gestionar la asistencia y revisar el puntaje de los aspirantes a cadetes.
        </p>
      </header>

      <div className="admin-panel-actions">
        <Link to="/qrasistencia" className="action-button">
          📋 Escanear Asistencia
        </Link>
        <Link to="/qrpuntos" className="action-button">
          🏅 Revisar Puntajes
        </Link>
      </div>
    </div>
  );
}

export default IndexQr;