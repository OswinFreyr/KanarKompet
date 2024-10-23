const { db } = require("../db");
const { DataTypes } = require("sequelize")

const Admin = db.define("admin", {
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

module.exports = { Admin };