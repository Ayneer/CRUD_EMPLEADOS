//Se exportan todas las rutas
module.exports = express => {

    const users = require('./users')(express);
    const employes = require('./employes')(express);

    return  {
        users,
        employes
    }
}