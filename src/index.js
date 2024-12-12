import React from "react";
import ReactDOM from "react-dom/client"; // Remarque : 'react-dom/client' pour React 18
import App from "./App";

// Créez la racine de l'application avec 'createRoot'
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendre l'application à l'intérieur de la racine
root.render(<App />);

