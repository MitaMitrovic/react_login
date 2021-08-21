import React from 'react';
import AppRouter from './gui/components/router/AppRouter';
import './App.css';
import UserContextTypeProvider from './context/UserContext';
import LoginContextTypeProvider from './context/LoginContext';

function App() {
  return (
    <div id="app">
      <LoginContextTypeProvider>
        <UserContextTypeProvider>
          <AppRouter />
        </UserContextTypeProvider>
      </LoginContextTypeProvider>
    </div>
  );
}

export default App;
