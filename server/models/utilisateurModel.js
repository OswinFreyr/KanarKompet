const { db } = require("../db");
const { DataTypes } = require("sequelize")

const Utilisateur = db.define("utilisateur", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prénom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    e_mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
});

module.exports = { Utilisateur };