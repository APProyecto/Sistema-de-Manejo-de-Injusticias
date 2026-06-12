import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import "./index.css";

async function enableMocking() {
  const useMocking = import.meta.env.DEV && import.meta.env.VITE_USE_MSW === "true";

  if (useMocking) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

await enableMocking();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: globalThis.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
);
