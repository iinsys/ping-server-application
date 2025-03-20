import React, { useState, useEffect } from "react";
import ServerTable from "../components/ServerTable";
import ServerForm from "../components/ServerForm";
import { getServers } from "../services/api";

function Dashboard({ keycloak }) {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);

  const fetchServers = async () => {
    try {
      const data = await getServers();
      setServers(data);
    } catch (error) {
      console.error("fetchServers error:", error);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with username and logout */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {keycloak.tokenParsed?.preferred_username || 'User'}
          </h1>
          <button
            onClick={() => keycloak.logout()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto p-4 flex-grow">
        <ServerForm
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          fetchServers={fetchServers}
        />
        <ServerTable
          servers={servers}
          onEdit={setSelectedServer}
          fetchServers={fetchServers}
        />
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-3 text-center text-gray-600">
          <p>&copy; 2025 Bansikah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;