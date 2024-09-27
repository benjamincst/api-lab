'use strict';
const admins_seeder = require('./admin-seeder');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await admins_seeder.up(queryInterface, Sequelize);
    },
    down: async (queryInterface, Sequelize) => {
        await admins_seeder.down(queryInterface, Sequelize);
    }
};