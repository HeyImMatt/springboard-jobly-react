import React from 'react';
import AppNav from './AppNav';
import Routes from './Routes';

export const TOKEN_STORAGE_ID = "jobly-token";

export default function App() {

  return (
    <>
      <AppNav />
      <Routes />
    </>
  );
};
