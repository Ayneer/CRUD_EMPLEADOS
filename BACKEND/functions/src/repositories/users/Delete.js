const { db, admin } = require('../../services/Firebase');
const { INTERNAL_ERROR, PROCESS_FAILED, RESOURCE_DELETED } = require('../../helper/variables');

//Metodo encargado de eliminar un usuario en el sistema
const Delete = async userId => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Se verifica que exista un usuario con la identificacion proporcionado
        const doc = await db.doc(`/users/${userId}`).get();

        if (doc.exists) {
            //Podemos proceder a la eliminación del usuario en la Autenticación
            await admin.auth().deleteUser(userId);

            //ahora procedemos a eliminar al usuario en la base de datos
            await db.doc(`/users/${userId}`).delete();

            generalModel.Error = false;
            generalModel.CodigoError = null;
            generalModel.Data = null;
            generalModel.TipoError = null;
            generalModel.Mensaje = `${RESOURCE_DELETED}`;
            generalModel.Status = RESOURCE_DELETED;

        } else {//no existe un usuario con el correo enviado
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. No existe el usuario proporcionado.`;
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

module.exports = Delete;