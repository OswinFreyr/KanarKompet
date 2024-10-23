const { db } = require("./db");
const { DataTypes } = require("sequelize")

const CommentaireCanard = db.define("commentaireCanard", {
    note: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
});

module.exports = { CommentaireCanard };