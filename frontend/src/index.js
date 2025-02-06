import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { RecipeContextProvider } from './context/RecipeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
