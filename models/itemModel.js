const { Sequelize } = require('sequelize');

const sequelize = require('../database/config');

const Items = sequelize.define('items', {
    item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.TEXT
    }
});

module.exports = Items;