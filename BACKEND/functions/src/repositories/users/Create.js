const { db, firebase } = require('../../services/Firebase');
const { INTERNAL_ERROR, RESOURCE_CREATED, PROCESS_FAILED } = require('../../helper/variables');

//Metodo encargado de crear un usuario en el sistema
const Create = async newUser => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Se verifica que no exista un usuario con el correo electronico proporcionado
        const doc = await db.collection('users').where('CorreoElectronico', '==', newUser.CorreoElectronico).get();

        if (doc.empty) {
            //Podemos proceder a la creación del usuario para la Autenticación
            const authUser = await firebase.auth().createUserWithEmailAndPassword(newUser.CorreoElectronico, newUser.Contraseña);
            const authUserId = authUser.user.uid;
            const idToken = await authUser.user.getIdToken();

            //ahora procedemos a crear al usuario en la base de datos, con el mismo Id del usuario de la autenticación
            const userDB = {//Se quita la contraseña
                Nombres: newUser.Nombres, 
                Apellidos: newUser.Apellidos, 
                Identificacion: newUser.Identificacion, 
                Telefono: newUser.Telefono, 
                CorreoElectronico: newUser.CorreoElectronico, 
                createdAt: new Date().toISOString()
            }

            await db.doc(`/users/${authUserId}`).set(userDB);//Se crea al usuario

            generalModel.Error = false;
            generalModel.CodigoError = null;
            generalModel.Data = { user: {...userDB, _id: authUserId}, Token: idToken };
            generalModel.TipoError = null;
            generalModel.Mensaje = `${RESOURCE_CREATED}`;
            generalModel.Status = RESOURCE_CREATED;

        } else {//Ya existe un usuario con el correo enviado
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. Ya existe un usuario con el correo proporcionado.`;
            generalModel.Status = PROCESS_FAILED;
        }

    } catch (error) {//sí ocurrió algún error en el proceso...
        generalModel.Error = true;
        generalModel.CodigoError = error.code;
        generalModel.Data = null;
        generalModel.TipoError = error.code;
        generalModel.Mensaje = `${INTERNAL_ERROR}. ${error.message}`;
        generalModel.Status = INTERNAL_ERROR;

    }

    return generalModel;

}

module.exports = Create;