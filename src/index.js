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
import SpotifyTokenHandler from "Pages/SpotifyTokenHandler/SpotifyTokenHandler";
import LandingPage from "Pages/LandingPage/LandingPage";
import App from "Pages/App/App";
import LoginPage from "Pages/LoginPage/LoginPage";
import SignupPage from "Pages/SignupPage/SignupPage";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth" element={<SpotifyTokenHandler />} />
          </Routes>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
