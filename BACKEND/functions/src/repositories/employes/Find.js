const { db } = require('../../services/Firebase');
const { RESOURCE_FOUND, INTERNAL_ERROR } = require('../../helper/variables');

//Metodo encargado de buscar todos los empleados del sistema, pero que le pertenezcan al usuario autenticado
const Find = async authUser => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Solicitamos los datos de los empleados, organizandolos de forma descendiente por la fecha de creación
        const employes = await db.collection('employes').where('IdUsuarioCreador', '==', authUser._id).orderBy('createdAt', 'desc').get();
        let employesList = [];

        //Se recorren los empleados devueltos, y se construye la lista de empleadis con los datos deseados
        employes.forEach(employed => {
            employesList.push({
                _id: employed.id,
                Nombres: employed.data().Nombres,
                Apellidos: employed.data().Apellidos,
                Identificacion: employed.data().Identificacion,
                RolAsociado: employed.data().RolAsociado,
                Estado: employed.data().Estado,
                Telefono: employed.data().Telefono,
                CorreoElectronico: employed.data().CorreoElectronico,
                IdUsuarioCreador: employed.data().IdUsuarioCreador,
                createdAt: employed.data().createdAt
            })
        })

        generalModel.Error = false;
        generalModel.CodigoError = null;
        generalModel.Data = employesList;
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