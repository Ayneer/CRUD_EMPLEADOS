//servicio que provee dos recursos para el manejo de la base de datos como a los recursos de la autenticación
const admin = require('firebase-admin');
const firebase = require('firebase');
const config = require('../config');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

module.exports = { 
    admin, 
    db,
    firebase: firebase.initializeApp(config)
};