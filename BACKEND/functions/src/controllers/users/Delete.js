const repository = require('../../repositories/users');
const status = require('../../helper/status');
const { PROCESS_FAILED } = require('../../helper/variables');

const deleteUser = async userId => await repository.Delete(userId);

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Se verifica que esten todos los datos
        if (id) {
            const response = await deleteUser(id);
            res.status(status(response.Status)).send(response);
        } else {
            //Se instancia el modelo de respuesta
            const { generalModel } = require('../../helper/responseModel');
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. Faltan datos para completar la tarea.`;
            generalModel.Status = PROCESS_FAILED;
            res.status(status(PROCESS_FAILED)).send(generalModel);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    deleteUser
}