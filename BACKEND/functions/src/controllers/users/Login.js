const repository = require('../../repositories/users');
const status = require('../../helper/status');
const { PROCESS_FAILED } = require('../../helper/variables');

const login = async (email, password) => await repository.Login(email, password);

//metodo encargado de recibir la petición y resolverla con el repositorio
const handler = async (req, res, next) => {
    try {
        const { CorreoElectronico, Contraseña } = req.body;

        //Se verifica que esten todos los datos
        if (CorreoElectronico && Contraseña) {
            const response = await login(CorreoElectronico, Contraseña);
            res.status(status(response.Status)).send(response);
        } else {
            //Se instancia el modelo de respuesta
            const { generalModel } = require('../../helper/responseModel');
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. Debe enviar un correo y contraseña validos.`;
            generalModel.Status = PROCESS_FAILED;
            res.status(status(PROCESS_FAILED)).send(generalModel);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    login
}