const repository = require('../../repositories/employes');
const status = require('../../helper/status');
const { PROCESS_FAILED, CREDENTIAL_ERROR } = require('../../helper/variables');

const find = async authUser => await repository.Find(authUser);

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {

        //Se instancia el modelo de respuesta
        const { generalModel } = require('../../helper/responseModel');

        //Se verifica que efectivamente exista el usuario autenticado
        if (req.user) {

            const response = await find(req.user);
            //Se responde
            res.status(status(response.Status)).send(response);

        } else {
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${CREDENTIAL_ERROR}. No se pudo recuperar al usuario autenticado.`;
            generalModel.Status = PROCESS_FAILED;
            //Se responde
            res.status(status(generalModel.Status)).send(generalModel);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    find
}