const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false,
    define: {
        timestamps: false,
        "createdAt": "createdat",
        "updatedAt": "updatedat",
        freezeTableName: true
    }
});

module.exports = sequelize;