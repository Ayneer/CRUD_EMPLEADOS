const repository = require('../../repositories/employes');
const status = require('../../helper/status');
const { PROCESS_FAILED, CREDENTIAL_ERROR } = require('../../helper/variables');

const create = async (newEmployed, authUser) => await repository.Create(newEmployed, authUser);

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {

        //Se instancia el modelo de respuesta
        const { generalModel } = require('../../helper/responseModel');

        const { Nombres, Apellidos, Identificacion, RolAsociado, Estado, Telefono, CorreoElectronico } = req.body;

        //Se verifica que efectivamente exista el usuario autenticado y que todos los datos esten correctos
        if (req.user && Nombres && Apellidos && Identificacion && RolAsociado && Estado && Telefono && CorreoElectronico) {

            const response = await create({ Nombres, Apellidos, Identificacion, RolAsociado, Estado, Telefono, CorreoElectronico }, req.user);
            //Se responde
            res.status(status(response.Status)).send(response);

        } else if (!req.user) {
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${CREDENTIAL_ERROR}. No se pudo recuperar al usuario autenticado.`;
            generalModel.Status = PROCESS_FAILED;
            //Se responde
            res.status(status(generalModel.Status)).send(generalModel);
        } else {
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. Faltan datos para completar la tarea.`;
            generalModel.Status = PROCESS_FAILED;
            res.status(status(PROCESS_FAILED)).send(generalModel);
            //Se responde
            res.status(status(generalModel.Status)).send(generalModel);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    create
}