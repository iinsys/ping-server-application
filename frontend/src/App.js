import React from "react";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Dashboard from "./pages/Dashboard";
import { api } from "./services/api";

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8180",
  realm: "ping-realm",
  clientId: "ping-frontend",
});

function App() {
  const onKeycloakEvent = (event, error) => {
    console.log("Keycloak event:", event, error); // Debug events
    if (event === "onReady" && !keycloak.authenticated) {
      keycloak.login(); // Force login if not authenticated
    }
  };

  const onKeycloakTokens = (tokens) => {
    console.log("Keycloak tokens:", tokens); // Debug tokens
    api.interceptors.request.use((config) => {
      if (tokens.token) {
        config.headers.Authorization = `Bearer ${tokens.token}`;
      }
      return config;
    });
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      initOptions={{
        onLoad: "login-required", // Force login instead of check-sso
        checkLoginIframe: false,
      }}
    >
      <div className="App">
        <Dashboard keycloak={keycloak} />
      </div>
    </ReactKeycloakProvider>
  );
}

export default App;