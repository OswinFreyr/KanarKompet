// server/db.js

const { Sequelize } = require('sequelize');

// Crée une instance Sequelize pour SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/kanarkompet.sqlite' // Chemin vers ta base de données SQLite
});

// Test de connexion à la base de données
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à SQLite réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

testConnection();

module.exports = sequelize;
