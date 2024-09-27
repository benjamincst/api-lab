const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();

// Base de datos
const sequelize = require('./database/config');

const app = express();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Levantamiento de server
const server = http.createServer(app);

// Rutas
app.use('/api/user', require('./routes/usuariosRoute'));
app.use('/api/item', require('./routes/itemRoute'));
app.use('/api/software', require('./routes/softwareRoute'));

// Inicialización
server.listen(process.env.PORT, async () => {

    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);

    try {

        await sequelize.authenticate();
        console.log('Base de datos ONLINE');
        await sequelize.sync({ force: false });

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});
