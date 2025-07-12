import React from 'react';
import './../../../styles/Dashboard.css'; // 👈 Importa el CSS externo

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Bienvenido al Dashboard</h2>
        <p>Desde aquí puedes gestionar el campeonato.</p>
      </div>
    </div>
  );
}

export default Dashboard;
