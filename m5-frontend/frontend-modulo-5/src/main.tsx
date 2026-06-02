import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { darkTheme, lightTheme } from './theme'
import { ThemeProvider } from '@emotion/react'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="ap-injusticias.us.auth0.com"
      clientId="FglxuuleIS0sBpRuv4duF2obrDdiPvc9"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://injusticias-api",
        scope: "openid profile email",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)