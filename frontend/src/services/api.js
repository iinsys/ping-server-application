import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
export const api = axios.create({
  baseURL: `${backendUrl}/api`,
});

// Token is added by interceptor in App.js
export const getServers = async () => {
  try {
    const res = await api.get("/servers");
    console.log("getServers response:", res.data);
    return res.data;
  } catch (error) {
    console.error("getServers error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    throw error;
  }
};

export const addServer = async (server) => {
  try {
    const res = await api.post("/servers", server);
    return res.data;
  } catch (error) {
    console.error("addServer error:", error.response?.status, error.response?.data);
    throw error;
  }
};

export const updateServer = async (id, server) => {
  try {
    const res = await api.put(`/servers/${id}`, server);
    return res.data;
  } catch (error) {
    console.error("updateServer error:", error.response?.status, error.response?.data);
    throw error;
  }
};

export const deleteServer = async (id) => {
  try {
    await api.delete(`/servers/${id}`);
  } catch (error) {
    console.error("deleteServer error:", error.response?.status, error.response?.data);
    throw error;
  }
};

export const pingServer = async (id) => {
  try {
    const res = await api.get(`/servers/${id}/ping`);
    return res.data;
  } catch (error) {
    console.error("pingServer error:", error.response?.status, error.response?.data);
    throw error;
  }
};