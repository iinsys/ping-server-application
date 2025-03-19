import React, { useState, useEffect } from "react";
import { addServer, updateServer } from "../services/api";

const ServerForm = ({ selectedServer, setSelectedServer, fetchServers }) => {
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    if (selectedServer) {
      setName(selectedServer.name);
      setIpAddress(selectedServer.ipAddress);
    }
  }, [selectedServer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const server = { name, ipAddress };
    if (selectedServer) {
      await updateServer(selectedServer.id, server);
    } else {
      await addServer(server);
    }
    setName("");
    setIpAddress("");
    setSelectedServer(null);
    fetchServers();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Server Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">IP Address</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {selectedServer ? "Update Server" : "Add Server"}
      </button>
    </form>
  );
};

export default ServerForm;