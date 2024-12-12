const path = require('path');

module.exports = {
  entry: './src/index.js', // Point d'entrée
  output: {
    path: path.resolve(__dirname, 'public'), // Mettre le bundle dans public
    filename: 'bundle.js', // Fichier généré
  },
  mode: 'development', // Mode de développement
  devServer: {
    static: path.join(__dirname, 'public'), // Servir depuis public
    port: 3000, // Port d'écoute
    hot: true, // Hot reload
    open: true, // Ouvre le navigateur
    historyApiFallback: true, // Navigation SPA
    client: {
      overlay: false, // Affiche les erreurs
    },
  },
  module: {
    rules: [ 
      {
        test: /\.(js|jsx)$/,  // Transpile JS et JSX avec Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,  // Gestion des fichiers CSS
        use: ['style-loader', 'css-loader'],  // Charge CSS et l'ajoute au DOM
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,  // Gérer les images
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',  // Générer un nom unique pour chaque image
              outputPath: 'public/',        // Sauvegarder dans un dossier 'images'
            },
          },
        ],
      },
    ],
  },
};






