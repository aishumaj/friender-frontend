import React, { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

import FrienderApi from "./_api.js";
import userContext from "./userContext";

import Navigation from "./Navigation";
import RoutesList from "./RoutesList";
import Loading from "./Loading";

const GLOBAL_TOKEN = "token";

function App() {

  const [token, setToken] = useState(localStorage.getItem(GLOBAL_TOKEN) || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCurrentUser() {

    async function getUser(token) {
      console.log("what is token", token);
      if (token) {
        FrienderApi.token = token;
        try {
          // let user = jwt_decode(token);
          const userData = await FrienderApi.getUserInfo();
          setCurrentUser(userData);
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR: ", err);
        }
      }else{
        setCurrentUser(null);
        setIsLoading(false);
      }
    }
    getUser(token);
  }, [token]);

  if(isLoading) return (<Loading />);

  async function login({ username, password }) {
    try {
      let tokenData = await FrienderApi.login(username, password);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    FrienderApi.token = null;
    localStorage.removeItem(GLOBAL_TOKEN);
  }

  async function signup({ username, firstName, password, age, zipCode, bio,
    hobbies, interests, radius, image }) {
    console.log("Username",username)
    try {
      let tokenData = await FrienderApi.createNewUser(username, firstName, password, age, zipCode, bio,
        hobbies, interests, radius, image);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <BrowserRouter>
          <Navigation logout={logout} />
          <div className="container">
            <RoutesList login={login} signup={signup} />
          </div>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
