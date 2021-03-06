const { db } = require('../../services/Firebase');
const { INTERNAL_ERROR, PROCESS_FAILED, RESOURCE_DELETED, CREDENTIAL_ERROR } = require('../../helper/variables');

//Metodo encargado de eliminar un empleado en el sistema
const Delete = async (idEmployed, authUser) => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Se verifica que exista un empleado con el id proporcionado
        const doc = await db.doc(`/employes/${idEmployed}`).get();

        //Solo se podrá borrar al empleado, siempre y cuando la acción la este realizando su creador debidamente autenticado
        if (doc.exists && doc.data().IdUsuarioCreador === authUser._id) {

            await db.doc(`/employes/${idEmployed}`).delete();

            generalModel.Error = false;
            generalModel.CodigoError = null;
            generalModel.Data = null;
            generalModel.TipoError = null;
            generalModel.Mensaje = `${RESOURCE_DELETED}`;
            generalModel.Status = RESOURCE_DELETED;


        } else if (doc.exists) {//NO existe un empleado con el id enviado
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. NO existe un empleado con el id proporcionado.`;
            generalModel.Status = PROCESS_FAILED;
        } else {//No es el usuario correcto para eliminar al empleado
            generalModel.Error = true;
            generalModel.CodigoError = CREDENTIAL_ERROR;
            generalModel.Data = null;
            generalModel.TipoError = CREDENTIAL_ERROR;
            generalModel.Mensaje = `${CREDENTIAL_ERROR}. NO esta autorizado para realizar esta operación.`;
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