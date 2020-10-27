import React, { useState, useEffect } from "react";
import { decode } from "jsonwebtoken";
import { ClipLoader } from "react-spinners";
import useLocalStorage from './hooks/useLocalStorage';
import Routes from "./Routes";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import AppNav from './AppNav';

export const TOKEN_STORAGE_ID = "jobly-token";

export default function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <ClipLoader size={150} color="#123abc" />;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <AppNav logout={handleLogOut} />
        <Routes setToken={setToken} />
    </UserContext.Provider>
  );
};
