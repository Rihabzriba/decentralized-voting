// components/Results.js
import React from 'react';
import './Results.css';  // Importation du fichier CSS pour le style

const Results = ({ candidates }) => {
  return (
    <div>
      <h2>Résultats Globaux</h2>
      <div>
        {candidates.map((candidate) => (
          <div key={candidate.id}>
            <h3>{candidate.name}</h3>
            <p>{candidate.voteCount} Votes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
