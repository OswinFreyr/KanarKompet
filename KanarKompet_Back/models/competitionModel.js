const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Competition = db.define("competition", {
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lieu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    horaire: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    recompense: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_participants: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
});

module.exports = { Competition };