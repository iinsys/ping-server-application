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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Server Ping Dashboard</h1>
      <button
        onClick={() => keycloak.logout()}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>
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
  );
}

export default Dashboard;