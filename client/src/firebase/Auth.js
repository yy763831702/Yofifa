import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

import '../App.css';
import { GiSoccerBall } from "react-icons/gi";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(
    () => {
      firebaseApp.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoadingUser(false);
      });
    },
    []
  );

  if (loadingUser) {
    return (
      <div className='loading'>
        <GiSoccerBall className="soccer-logo" /><h1>Loading...</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
