const { Sequelize } = require('sequelize');

const sequelize = require('../database/config');

const Software = sequelize.define('software', {
    software_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.TEXT
    }
});

module.exports = Software;