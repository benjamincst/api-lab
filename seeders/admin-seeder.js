'use strict';
const sequelize = require("../database/config");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('usuarios', [
            {
                correo: 'benjamin.rojas@cstsolution.cl',
                clave: '$2a$10$qanNwDkRHpn.Y5WWuAtoIe7J1xlgYuKpt8vuoYvY1wlh2pjkiSJmK',
                isAdmin: true
            },
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('usuarios', null, {});
    }
}