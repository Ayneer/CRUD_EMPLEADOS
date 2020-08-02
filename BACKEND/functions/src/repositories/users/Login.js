const { firebase } = require('../../services/Firebase');
const { INTERNAL_ERROR, RESOURCE_FOUND } = require('../../helper/variables');

//Metodo encargado de validar las credenciales enviadas y firmar al usuario
const Login = async (email, password) => {
    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {
        //Se intenta firmar las credenciales, si ocurre algún error, será capturado en el catch
        firebase.auth().languageCode = 'es';
        const idToken = await (await firebase.auth().signInWithEmailAndPassword(email, password)).user.getIdToken();

        generalModel.Error = false;
        generalModel.CodigoError = null;
        generalModel.Data = { user: null, Token: idToken };
        generalModel.TipoError = null;
        generalModel.Mensaje = `${RESOURCE_FOUND}. Login exitoso!`;
        generalModel.Status = RESOURCE_FOUND;

    } catch (error) {
        generalModel.Error = true;
        generalModel.CodigoError = error.code;
        generalModel.Data = null;
        generalModel.TipoError = error.code;
        generalModel.Mensaje = `${INTERNAL_ERROR}. ${error.message}`;
        generalModel.Status = INTERNAL_ERROR;
    }

    return generalModel;
}

module.exports = Login;