const { Sequelize } = require('sequelize');

const sequelize = require('../database/config');

const Usuarios = sequelize.define('usuarios', {
    u_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    correo: {
        type: Sequelize.STRING
    },
    clave: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Usuarios;