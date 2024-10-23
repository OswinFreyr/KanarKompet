const { db } = require("../db");
const { DataTypes } = require("sequelize")

const Race = db.define("race", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
});

module.exports = { Race };