import React from "react";
import ReactDOM from "react-dom";
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
import App from "Pages/App/App";
import LoginPage from "Pages/LoginPage/LoginPage";
import SignupPage from "Pages/SignupPage/SignupPage";
import SettingsPage from "Pages/SettingsPage/SettingsPage";
import RequireAuthentication from "Components/access-control/RequireAuthentication/RequireAuthentication";
import RequireSpotifyToken from "Components/access-control/RequireSpotifyToken/RequireSpotifyToken";

firebase.initializeApp(firebaseConfig);

/**
 * The initial React render to bootstrap the application with all necessary
 * providers, as well as configuring routes and their access control.
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={{}}
        dispatch={store.dispatch}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/app"
              element={
                <RequireAuthentication>
                  <RequireSpotifyToken>
                    <App />
                  </RequireSpotifyToken>
                </RequireAuthentication>
              }
            />
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
                  <SignupPage />
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
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
