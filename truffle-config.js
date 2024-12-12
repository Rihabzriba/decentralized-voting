module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Adresse de Ganache
      port: 7545,         // Port de Ganache (7545 est le port par défaut)
      network_id: "5777", // ID du réseau Ganache
      from: "0xa0C524Cd7d68EdF2180FD7Bdf3E6094431bB6868",  // Remplace cette ligne par l'adresse correcte
      gas: 6721975,       // Limite de gaz
      gasPrice: 20000000000,  // Prix du gaz
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",  // Version de Solidity utilisée
    },
  },
};

