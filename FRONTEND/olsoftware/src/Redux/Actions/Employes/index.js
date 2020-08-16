import { _workingDataPersistence, _loadData, _deleteData, _addData, _updateData, _updateForm } from "Redux/Reducers/Employes";
import { prepareToView, prepareToDataBase } from "Redux/Reducers/Employes/Form/Cast";

//Metodo encargado de actualizar el formulario de empleado
export const updateForm = (form) => {
    return (dispatch, getState, Api) => {
        dispatch(_updateForm(form));
    }
}

//Metodo encargado de comunicarse con la base de datos y obtener el listado de empleados
export const getEmployes = (rolesAsociados, estados, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        return Api.Employes.Find().then(response => {
            dispatch(_workingDataPersistence(false));
            if (!response.Error && response.Data) {
                let dataPreparated = [];
                for (let index = 0; index < response.Data.length; index++) {
                    const doc = response.Data[index];
                    dataPreparated.push({
                        ...prepareToView(doc, rolesAsociados, estados)
                    });
                }
                dispatch(_loadData(dataPreparated));
                cb(false, null, response.Data);
            } else {
                cb(false, response.Mensaje, null);
            }
        }).catch(err => {
            console.log(err);
            dispatch(_workingDataPersistence(false));
            cb(true, err.message);
        })

    }
}

//Metodo encargado de eliminar a un empleado de la base de datos
export const deleteEmploye = (_id, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        return Api.Employes.Delete(_id).then(response => {
            dispatch(_workingDataPersistence(false));
            if (!response.Error) {
                dispatch(_deleteData(_id));
                cb(false, null);
            }
        }).catch(err => {
            console.log(err);
            dispatch(_workingDataPersistence(false));
            cb(true, err.message);
        })
    }
}

//Metodo encargado de añadir a un empleado en la base de datos
export const addEmploye = (employe, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        return Api.Employes.Create(prepareToDataBase(employe)).then(response => {
            dispatch(_workingDataPersistence(false));
            if (!response.Error && response.Data) {

                const newEployed = {
                    data: {
                        ...employe.data,
                        _id: response.Data._id,
                        createdAt: "2020-07-31T12:15:56.687Z"
                    }
                }
                dispatch(_addData(newEployed));
                cb(false, null, response.Data);

            } else {
                cb(true, response.Mensaje);
            }
        }).catch(err => {
            console.log(err);
            dispatch(_workingDataPersistence(false));
            cb(true, err.message);
        })
    }
}

//Metodo encargado de editar a un empleadoe en la base de datos
export const editEmploye = (employeUpdated, uid, cb) => {
    return (dispatch, getState, Api) => {
        dispatch(_workingDataPersistence(true));
        //Llamado a la API
        return Api.Employes.Edit(prepareToDataBase(employeUpdated), uid).then(response => {
            dispatch(_workingDataPersistence(false));
            if (!response.Error) {
                dispatch(_updateData(employeUpdated, uid));
                cb(false, null);
            } else {
                cb(true, response.Mensaje);
            }
        }).catch(err => {
            console.log(err);
            dispatch(_workingDataPersistence(false));
            cb(true, err.message);
        })
    }
}