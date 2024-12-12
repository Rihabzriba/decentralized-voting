import React from 'react';
import './Candidates.css';  // Importer le fichier CSS

const Candidates = ({ vote, candidates, voted }) => {
  return (
    <div>
      <h2>Candidats</h2>
      <div className="candidates-container">
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <div key={candidate.id} className="candidate-card">
              <h3>{candidate.name}</h3>
              <img src={`/candidate_${index + 1}.jpg`} alt={candidate.name} />
              <p className="vote-count">{candidate.voteCount} Votes</p>
              <button
                onClick={() => vote(candidate.id)}
                disabled={voted}
              >
                {voted ? 'Déjà voté' : 'Voter'}
              </button>
            </div>
          ))
        ) : (
          <p>Aucun candidat disponible</p>
        )}
      </div>
    </div>
  );
};

export default Candidates;

