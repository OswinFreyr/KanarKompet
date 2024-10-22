const { db } = require("../db");
const { DataTypes } = require("sequelize")

const Canard = db.define('canard', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    couleur: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    poids: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    vitesse_max: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    vitesse_moy: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    nb_participations: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nb_victoires: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
});

module.exports = { Canard }