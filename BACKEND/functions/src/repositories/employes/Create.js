const { db } = require('../../services/Firebase');
const { INTERNAL_ERROR, RESOURCE_CREATED, PROCESS_FAILED } = require('../../helper/variables');

//Metodo encargado de crear un empleado en el sistema
const Create = async (newEmployed, authUser) => {

    //Se instancia el modelo de respuesta
    const { generalModel } = require('../../helper/responseModel');

    //Debido a que devolveremos una promesa de una llamada asincrona, trabajamos con async/await
    //Se utiliza try-catch para capturar algún error inesperado
    try {

        //Se verifica que no exista un empleado con el correo electronico proporcionado
        const doc = await db.collection('employes').where('CorreoElectronico', '==', newEmployed.CorreoElectronico).get();

        if (doc.empty) {

            //Ahora se verifica que no exista un empleado con la identificación proporcionada
            const doc2 = await db.collection('employes').where('Identificacion', '==', newEmployed.Identificacion).get();

            if (doc2.empty) {

                //ahora procedemos a crear al empleado en la base de datos
                const employedDB = {
                    Nombres: newEmployed.Nombres,
                    Apellidos: newEmployed.Apellidos,
                    Identificacion: newEmployed.Identificacion,
                    RolAsociado: newEmployed.RolAsociado,
                    Estado: newEmployed.Estado,
                    Telefono: newEmployed.Telefono,
                    CorreoElectronico: newEmployed.CorreoElectronico,
                    IdUsuarioCreador: authUser._id,
                    createdAt: new Date().toISOString()
                }

                const employedCreated = await db.collection('employes').add(employedDB);//Se registra al empleado

                generalModel.Error = false;
                generalModel.CodigoError = null;
                generalModel.Data = { employed: { ...employedDB, _id: employedCreated.id } };
                generalModel.TipoError = null;
                generalModel.Mensaje = `${RESOURCE_CREATED}`;
                generalModel.Status = RESOURCE_CREATED;
            } else {//Ya existe un empleado con la identificación enviada
                generalModel.Error = true;
                generalModel.CodigoError = PROCESS_FAILED;
                generalModel.Data = null;
                generalModel.TipoError = PROCESS_FAILED;
                generalModel.Mensaje = `${PROCESS_FAILED}. Ya existe un empleado con la identificación proporcionada.`;
                generalModel.Status = PROCESS_FAILED;
            }

        } else {//Ya existe un empleado con el correo enviado
            generalModel.Error = true;
            generalModel.CodigoError = PROCESS_FAILED;
            generalModel.Data = null;
            generalModel.TipoError = PROCESS_FAILED;
            generalModel.Mensaje = `${PROCESS_FAILED}. Ya existe un empleado con el correo proporcionado.`;
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