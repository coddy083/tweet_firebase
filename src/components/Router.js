/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import { Navigation } from "components/Navigation";
import Profile from "routes/Profile";

export default function AppRouter({ isLoggedIn, userObj, refreshUser }) {
  return (
    <>
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}
