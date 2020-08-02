const { db } = require('../../services/Firebase');
const { RESOURCE_FOUND, INTERNAL_ERROR } = require('../../helper/variables');

//Metodo encargado de buscar todos los usuarios del sistema
const Find = async () => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Solicitamos los datos de los usuarios, organizandolos de forma descendiente por la fecha de creación
        const users = await db.collection('users').orderBy('createdAt', 'desc').get();
        let userList = [];

        //Se recorren los usuarios devueltos, y se construye la lista de usuarios con los datos deseados
        users.forEach( user => {
            userList.push({
                _id: user.id,
                Nombres: user.data().Nombres,
                Apellidos: user.data().Apellidos,
                Identificacion: user.data().Identificacion,
                Telefono: user.data().Telefono,
                CorreoElectronico: user.data().CorreoElectronico
            })
        } )

        generalModel.Error = false;
        generalModel.CodigoError = null;
        generalModel.Data = userList;
        generalModel.TipoError = null;
        generalModel.Mensaje = `${RESOURCE_FOUND}`;
        generalModel.Status = RESOURCE_FOUND;

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

module.exports = Find;