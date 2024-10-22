const { db } = require("./db");
const { DataTypes } = require("sequelize")

const CommentaireCompetition = db.define("commentaireCompetition", {
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
});

module.exports = { CommentaireCompetition };