import React from "react";
import { pingServer, deleteServer } from "../services/api";

const ServerTable = ({ servers, onEdit, fetchServers }) => {
  const handlePing = async (id) => {
    await pingServer(id);
    fetchServers(); // Refresh server list
  };

  const handleDelete = async (id) => {
    await deleteServer(id);
    fetchServers();
  };

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">IP Address</th>
          <th className="py-2 px-4 border">Status</th>
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {servers.map((server) => (
          <tr key={server.id}>
            <td className="py-2 px-4 border">{server.name}</td>
            <td className="py-2 px-4 border">{server.ipAddress}</td>
            <td className="py-2 px-4 border">
              <span
                className={`${
                  server.status === "UP"
                    ? "text-green-600"
                    : server.status === "DOWN"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {server.status}
              </span>
            </td>
            <td className="py-2 px-4 border flex gap-2">
              <button
                onClick={() => handlePing(server.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Ping
              </button>
              <button
                onClick={() => onEdit(server)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(server.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServerTable;