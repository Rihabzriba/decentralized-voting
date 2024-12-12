import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import des composants
import Navbar from './components/Navbar';
import Home from './components/Home';
import Candidates from './components/Candidates';
import Results from './components/Results';

import './components/App.css'; 


function App() {
  const [account, setAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const initWeb3 = new Web3(window.ethereum);
      setWeb3(initWeb3);

      const contractAddress = '0x9DE7758C3CC3C625BB9a71F523896a527477e3D5'; 
      const contractABI = [
        
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "imagePath",
          "type": "string"
        }
      ],
      "name": "CandidateAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imagePath",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "candidatesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_imagePath",
          "type": "string"
        }
      ],
      "name": "addNewCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidatesDetails",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
        
      ];

      const initContract = new initWeb3.eth.Contract(contractABI, contractAddress);
      setContract(initContract);

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setAccount(accounts[0]);
        })
        .catch((err) => {
          console.error('Erreur de connexion à MetaMask:', err);
        });
    } else {
      console.error("MetaMask n'est pas installé");
    }
  }, []);

  useEffect(() => {
    if (contract) {
      contract.methods
        .getCandidatesDetails()
        .call()
        .then((data) => {
          const ids = data[0];
          const names = data[1];
          const voteCounts = data[2];
          const imagePaths = data[3];  // Modification : récupérer l'image par "imagePaths" au lieu de "imageCIDs"
  
          const candidates = ids.map((id, index) => ({
            id: Number(id),
            name: names[index],
            voteCount: Number(voteCounts[index]),
            imagePath: `/candidats_${index+1}.jpg`, 
          }));
  
          setCandidates(candidates);
        })
        .catch((err) => {
          console.error('Erreur lors de la récupération des candidats:', err);
        });
    }
  }, [contract]);
  

  const vote = (candidateId) => {
    if (voted) {
      alert('Vous avez déjà voté !');
      return;
    }

    if (contract) {
      contract.methods
        .vote(candidateId)
        .send({ from: account })
        .then(() => {
          alert('Merci pour votre vote !');
          setVoted(true);

          contract.methods.getCandidatesDetails().call()
            .then((data) => {
              const [ids, names, voteCounts] = data;
              setCandidates(
                ids.map((id, index) => ({
                  id: Number(id),
                  name: names[index],
                  voteCount: Number(voteCounts[index]),
                }))
              );
            })
            .catch((err) => {
              console.error('Erreur lors de la récupération des candidats après le vote:', err);
            });
        })
        .catch((err) => {
          console.error('Erreur lors du vote:', err);
        });
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Barre de navigation */}

        <main>
          <Routes>
            {/* Page d'Accueil */}
            <Route path="/" element={<Home />} />

            {/* Page des Candidats */}
            <Route path="/candidats" element={<Candidates candidates={candidates} vote={vote} voted={voted} />} />

            {/* Page des Résultats */}
            <Route path="/results" element={<Results candidates={candidates} />} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 Système de Vote Décentralisé</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;















