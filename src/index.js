import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import firebaseConfig from "Config/firebase";
import store from "Store/store";
import SpotifyCallbackPage from "Pages/SpotifyCallbackPage/SpotifyCallbackPage";
import LandingPage from "Pages/LandingPage/LandingPage";
import LoginPage from "Pages/LoginPage/LoginPage";
import SettingsPage from "Pages/SettingsPage/SettingsPage";
import RequireAuthentication from "Components/access-control/RequireAuthentication/RequireAuthentication";
import RequireSpotifyToken from "Components/access-control/RequireSpotifyToken/RequireSpotifyToken";
import AppPage from "Pages/AppPage/AppPage";
import AppGamePage from "Pages/AppPage/AppGamePage/AppGamePage";

import "./index.css";
import { IconContext } from "phosphor-react";

firebase.initializeApp(firebaseConfig);

/**
 * The initial React render to bootstrap the application with all necessary
 * providers, as well as configuring routes and their access control.
 */
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={{}}
      dispatch={store.dispatch}
    >
      <IconContext.Provider
        value={{
          color: "currentColor",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/app"
              element={
                <RequireAuthentication>
                  <RequireSpotifyToken>
                    <AppPage />
                  </RequireSpotifyToken>
                </RequireAuthentication>
              }
            >
              <Route index element={<AppGamePage />} />
            </Route>
            <Route
              path="/settings"
              element={
                <RequireAuthentication>
                  <SettingsPage />
                </RequireAuthentication>
              }
            />
            <Route
              path="/login"
              element={
                <RequireAuthentication reverse>
                  <LoginPage />
                </RequireAuthentication>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireAuthentication reverse>
                  <LoginPage />
                </RequireAuthentication>
              }
            />
            <Route
              path="/spotify-callback"
              element={
                <RequireAuthentication>
                  <SpotifyCallbackPage />
                </RequireAuthentication>
              }
            />
          </Routes>
        </BrowserRouter>
      </IconContext.Provider>
    </ReactReduxFirebaseProvider>
  </Provider>
);
