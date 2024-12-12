const connectMetaMask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const userAccount = accounts[1]; // Premier compte
      if (userAccount.toLowerCase() === '0xa0C524Cd7d68EdF2180FD7Bdf3E6094431bB6868'.toLowerCase()) {
        setAccount(userAccount); // Adresse valide
        setErrorMessage(null); // Pas d'erreur
      } else {
        setErrorMessage('This is not your specified account.');
      }
    } catch (error) {
      setErrorMessage(`MetaMask connection failed: ${error.message}`);
    }
  } else {
    setErrorMessage(
      'MetaMask is not installed. Please install it from https://metamask.io/'
    );
  }
};


