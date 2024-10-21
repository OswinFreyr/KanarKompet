const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Commentaire = db.define("commentaire", {
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
});

module.exports = { Commentaire };