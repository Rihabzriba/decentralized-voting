// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string imagePath; 
    }
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;
    uint public totalVotes;
    address public owner;
    event Voted(address indexed voter, uint candidateId);
    event CandidateAdded(uint candidateId, string name, string imagePath);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can add candidates");
        _;
    }
    constructor() {
        owner = msg.sender; 
        addCandidate("Candidat 1", "images/candidate1.jpg");
        addCandidate("Candidat 2", "images/candidate2.jpg");
        addCandidate("Candidat 3", "images/candidate3.jpg");
        addCandidate("Candidat 4", "images/candidate4.jpg");
        addCandidate("Candidat 5", "images/candidate5.jpg");
    }
    function addCandidate(string memory _name, string memory _imagePath) private {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        require(bytes(_imagePath).length > 0, "Candidate imagePath cannot be empty");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _imagePath);
        emit CandidateAdded(candidatesCount, _name, _imagePath);
    }

    // Fonction publique pour ajouter un candidat, accessible uniquement par le propriétaire
    function addNewCandidate(string memory _name, string memory _imagePath) public onlyOwner {
        addCandidate(_name, _imagePath);
    }

    // Fonction pour voter pour un candidat
    function vote(uint _candidateId) public {
        // Vérifie si l'adresse a déjà voté
        require(!voters[msg.sender], "You have already voted!");

        // Vérifie si le candidat existe
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate!");

        // Marque l'adresse comme ayant voté
        voters[msg.sender] = true;

        // Augmente le compteur de votes du candidat
        candidates[_candidateId].voteCount++;
        totalVotes++;

        // Émet un événement pour signaler qu'un vote a été effectué
        emit Voted(msg.sender, _candidateId);
    }

    // Fonction pour obtenir les résultats des candidats
    function getCandidatesDetails() public view returns (
        uint[] memory, 
        string[] memory, 
        uint[] memory, 
        string[] memory
    ) {
        uint[] memory ids = new uint[](candidatesCount);
        string[] memory names = new string[](candidatesCount);
        uint[] memory voteCounts = new uint[](candidatesCount);
        string[] memory imagePaths = new string[](candidatesCount);

        for (uint i = 0; i < candidatesCount; i++) {
            Candidate memory candidate = candidates[i + 1];
            ids[i] = candidate.id;
            names[i] = candidate.name;
            voteCounts[i] = candidate.voteCount;
            imagePaths[i] = candidate.imagePath;
        }

        return (ids, names, voteCounts, imagePaths);
    }
}








