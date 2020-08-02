const functions = require('firebase-functions');
const express = require('express');
const routes = require('./src/routes');
const app = express();

//SOLO en desarrollo
app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Se indica cada ruta a usar por la API
app.use('/users', routes(express).users);
app.use('/employes', routes(express).employes);

//Se ejecuta la function API, y se le pasa las aplicación express con las rutas
exports.api = functions.https.onRequest(app);