const { admin, db } = require('./Firebase');
const { INTERNAL_ERROR, PROCESS_FAILED, CREDENTIAL_ERROR } = require('../helper/variables');
const status = require('../helper/status');

//Servicio que permite validar la autenticación de un usuario
const auth = async (req, res, next) => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {
        //Consultamos el token ennviado en la cabecera como beaer Token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            const idToken = req.headers.authorization.split('Bearer ')[1];

            //Obtenemos la información del token
            const infoToken = await admin.auth().verifyIdToken(idToken);

            //Se busca el usuario en la base de datos asociado al uid del token, que es el uid del usuario de la autenticación
            //Al encontrar el usuario se procede a almacenarlo en la req y pasar al siguiente middleware
            req.user = {...await (await db.doc(`/users/${infoToken.uid}`).get()).data(), _id: infoToken.uid};
            return next();
        } else {//No tiene token
            generalModel.Error = true;
            generalModel.CodigoError = CREDENTIAL_ERROR;
            generalModel.Data = null;
            generalModel.TipoError = CREDENTIAL_ERROR;
            generalModel.Mensaje = `${CREDENTIAL_ERROR}. No se pudo encontrar el token.`;
            generalModel.Status = CREDENTIAL_ERROR;
            res.status(status(PROCESS_FAILED)).send(generalModel);
        }
    } catch (error) {
        generalModel.Error = true;
        generalModel.CodigoError = error.code;
        generalModel.Data = null;
        generalModel.TipoError = error.code;
        generalModel.Mensaje = `${PROCESS_FAILED}. ${error.message}`;
        generalModel.Status = INTERNAL_ERROR;
        res.status(status(INTERNAL_ERROR)).send(generalModel);
    }

}

module.exports = auth;