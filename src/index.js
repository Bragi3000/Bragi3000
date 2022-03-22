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

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={{ userProfile: "users" }}
        dispatch={store.dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<App />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/spotify-callback" element={<SpotifyCallbackPage />} />
          </Routes>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
