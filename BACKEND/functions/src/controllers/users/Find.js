const repository = require('../../repositories/users');
const status = require('../../helper/status');

const find = async () => await repository.Find();

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {
        const response = await find();
        res.status(status(response.Status)).send(response);
    } catch (error) {
       next(error); 
    }
}

module.exports = {
    handler,
    find
}