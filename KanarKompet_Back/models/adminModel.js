const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Admin = db.define("admin", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    e_mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    defaultScope: {
        attributes: { exclude: ['mot_de_passe'] },
    },
    scopes: {
        withPassword: {
            attributes: { },
        }
    },
});

module.exports = { Admin };