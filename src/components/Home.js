// components/Home.js
import React from 'react';
import './Home.css';  // Importer le fichier CSS

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenue à notre Système de Vote Sécurisé !</h1>
                <img src="\voter2.jpg" alt="Election" className="home-image" />
            </header>

            <section className="home-description">
                <div className="card">
                    <h2>L'importance de l'élection</h2>
                    <p>
                        Cette élection représente un moment clé pour notre communauté. Chaque voix compte et contribue
                        à choisir les candidats les plus qualifiés pour représenter nos intérêts. Il est crucial que
                        chaque citoyen exerce son droit de vote, car il fait une réelle différence dans le choix des
                        leaders et dans l'avenir de notre société.
                    </p>
                </div>
                <div className="card">
                    <h3>Comment fonctionne cette élection ?</h3>
                    <p>
                        Pour participer à l'élection, vous devez vous connecter et sélectionner le candidat que vous
                        souhaitez soutenir. Une fois votre choix effectué, il vous suffit de cliquer sur "Voter" pour
                        enregistrer votre vote. Vous pouvez également consulter les résultats en temps réel sur la
                        page dédiée.
                    </p>
                </div>
                <div className="card">
                    <h3>Pourquoi votre vote est important ?</h3>
                    <p>
                        Le droit de vote est un privilège et une responsabilité. En votant, vous exercez une
                        influence directe sur le choix des candidats qui auront un impact sur votre quotidien. Ne laissez
                        pas passer cette chance de faire entendre votre voix et de contribuer à l'avenir de notre
                        communauté.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;

