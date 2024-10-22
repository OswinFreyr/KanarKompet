const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Localisation = db.define('localisation', {
    latitude: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
});

module.exports = { Localisation }