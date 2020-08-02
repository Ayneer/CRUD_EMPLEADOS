import { _workingDataPersistence, _loadData, _deleteData, _addData, _updateData, _updateForm } from "Redux/Reducers/Employes";
import { prepareToView, prepareToDataBase } from "Redux/Reducers/Employes/Form/Cast";

const data = [
    {
        "_id": "WxNlURoJxoBcGekCIIKL",
        "Nombres": "Luis",
        "Apellidos": "Geles",
        "Identificacion": "1143402098",
        "RolAsociado": "1",
        "Estado": "A",
        "Contraseña": "123456",
        "Telefono": "3216701191",
        "CorreoElectronico": "ayneer12@gmail.com",
        "IdUsuarioCreador": "6DEPM8C4sLSZHEniHeBLBu6GYAB2",
        "createdAt": "2020-07-31T12:15:56.687Z"
    },
    {
        "_id": "WxNlURoJxoBcGekCIIKX",
        "Nombres": "Pepe",
        "Apellidos": "Robles",
        "Identificacion": "1143402099",
        "RolAsociado": "2",
        "Estado": "A",
        "Contraseña": "123456",
        "Telefono": "3216701192",
        "CorreoElectronico": "pepe@gmail.com",
        "IdUsuarioCreador": "6DEPM8C4sLSZHEniHeBLBu6GYAB2",
        "createdAt": "2020-07-31T12:15:56.687Z"
    }
];

//Metodo encargado de actualizar el formulario de empleado
export const updateForm = (form) => {
    return (dispatch, getState, Api) => {
        dispatch(_updateForm(form));
    }
}

//Metodo encargado de comunicarse con la base de datos y obtener el listado de empleados
export const getEmployes = (rolesAsociados, estados) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        let dataPreparated = [];
        for (let index = 0; index < data.length; index++) {
            const doc = data[index];
            dataPreparated.push({
                ...prepareToView(doc, rolesAsociados, estados)
            });
        }
        dispatch(_workingDataPersistence(false));
        dispatch(_loadData(dataPreparated));
    }
}

//Metodo encargado de eliminar a un empleado de la base de datos
export const deleteEmploye = (_id, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        dispatch(_deleteData(_id));
        dispatch(_workingDataPersistence(false));
        cb(false, null);
    }
}

//Metodo encargado de añadir a un empleado en la base de datos
export const addEmploye = (employe, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        console.log("obj para la base de datos...",prepareToDataBase(employe))
        const newEployed = {
            data:{
                ...employe.data,
                _id: employe.data.Identificacion,
                createdAt: "2020-07-31T12:15:56.687Z"
            }
        }
        dispatch(_addData(newEployed));
        dispatch(_workingDataPersistence(false));
        cb(false, null);
    }
}

//Metodo encargado de editar a un empleadoe en la base de datos
export const editEmploye = (employeUpdated, uid, cb) => {
    return (dispatch, getState, Api) => { 
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        dispatch(_updateData(employeUpdated, uid));
        dispatch(_workingDataPersistence(false));
        cb(false, null);
    }
}