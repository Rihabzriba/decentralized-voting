// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Importation du fichier CSS pour le style

const Navbar = () => {
    return (
        <nav>
    
        <img src="/logo2.png" alt="Logo" className="logo" />
      
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/candidats">Candidats</Link></li>
                <li><Link to="/results">Résultats</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
