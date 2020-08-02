const repository = require('../../repositories/users');
const status = require('../../helper/status');
const { PROCESS_FAILED } = require('../../helper/variables');

const create = async newUser => await repository.Create(newUser);

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {
        const { Nombres, Apellidos, Identificacion, Telefono, CorreoElectronico, Contraseña } = req.body;

        //Se verifica que esten todos los datos
        if (Nombres && Apellidos && Identificacion && Telefono && CorreoElectronico && Contraseña) {
            const response = await create({ Nombres, Apellidos, Identificacion, Telefono, CorreoElectronico, Contraseña });
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
    create
}