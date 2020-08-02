const status = require('../../helper/status');
const { PROCESS_FAILED, RESOURCE_FOUND } = require('../../helper/variables');

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {

        //Se instancia el modelo de respuesta
        const { generalModel } = require('../../helper/responseModel');

        //Se verifica que efectivamente exista el usuario
        if (req.user) {
            generalModel.Error = false;
            generalModel.CodigoError = null;
            generalModel.Data = req.user;
            generalModel.TipoError = null;
            generalModel.Mensaje = RESOURCE_FOUND;
            generalModel.Status = RESOURCE_FOUND;
        }else{
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. No se pudo recuperar al usuario.`;
            generalModel.Status = PROCESS_FAILED;
        }

        //Se responde
        res.status(status(generalModel.Status)).send(generalModel);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler
}