// server/db.js

const Sequelize = require('sequelize');

// Crée une instance Sequelize pour SQLite
const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database/kanarkompet.sqlite', // Chemin vers ta base de données SQLite
  logging: false
});

/*const db = new Sequelize("sqlite:database.sqlite3", {
  logging: false
});*/

// Test de connexion à la base de données
async function testConnection() {
  try {
    await db.authenticate();
    console.log('Connexion à SQLite réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

testConnection();

module.exports = { db };