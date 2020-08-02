import { form, getInfo } from './Form';

//Constantes generales
import { LIMPIAR_STATE_SALIR } from 'Redux/variables';

//Constantes locales
const ERROR_LOADING_DATA_EMPLOYES = "ERROR_LOADING_DATA_EMPLOYES";
const LOAD_DATA_EMPLOYES = "LOAD_DATA_EMPLOYES";
const WORKING_EMPLOYES_DATA_PERSISTENCE = "WORKING_EMPLOYES_DATA_PERSISTENCE";
const DELETE_EMPLOYE_DATA = "DELETE_EMPLOYE_DATA";
const ADD_EMPLOYE_DATA = "ADD_EMPLOYE_DATA";
const UPDATE_EMPLOYE_DATA = "UPDATE_EMPLOYE_DATA";
const UPDATE_SOME_STATE_EMPLOYE = "UPDATE_SOME_STATE_EMPLOYE";

//Estos en su forma inicial
const initState = {
    form,
    data: [],
    loadingData: true,
    errorLoadingData: false,
    dataMessage: null,
    loadedData: false,
    workingPersistence: false,
}

//Manejo de los estados de los empleados con redux
export const Employes = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR: {
            return {
                ...state,
                ...initState
            }
        }

        case ERROR_LOADING_DATA_EMPLOYES: {
            return {
                ...state,
                errorLoadingData: true,
                loadingData: false,
                dataMessage: action.message,
            }
        }

        case LOAD_DATA_EMPLOYES: {
            return {
                ...state,
                data: action.data,
                loadingData: false,
                loadedData: true,
                errorLoadingData: false,
            }
        }

        case WORKING_EMPLOYES_DATA_PERSISTENCE: {
            return {
                ...state,
                workingPersistence: action.state
            }
        }

        case DELETE_EMPLOYE_DATA: {
            let data = state.data.filter((obj) => obj.data._id !== action._id);
            return {
                ...state,
                data
            }
        }

        case ADD_EMPLOYE_DATA: {
            let data = state.data;
            data.push(action.obj);
            return {
                ...state,
                data
            }
        }

        case UPDATE_EMPLOYE_DATA: {
            let obj = action.obj;
            let data = state.data;
            let oldId = action.oldId;
            for (let index = 0; index < data.length; index++) {
                let { data: {_id} } = data[index];
                if (_id + "" === oldId + "") {
                    data[index] = obj;
                    break;
                }
            }
            return {
                ...state,
                data
            }
        }

        case UPDATE_SOME_STATE_EMPLOYE: {
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state;
    }
}

export const _getForm = state => state.form;
export const _getInfoEmployes = state => {
    return {
        data: state.data,
        loadingData: state.loadingData,
        errorLoadingData: state.errorLoadingData,
        dataMessage: state.dataMessage,
        loadedData: state.loadedData,
        workingPersistence: state.workingPersistence,
    }
}
export const _errorLoadingData = message => { return { type: ERROR_LOADING_DATA_EMPLOYES, message } };
export const _loadData = data => { return { type: LOAD_DATA_EMPLOYES, data } };
export const _workingDataPersistence = state => { return { type: WORKING_EMPLOYES_DATA_PERSISTENCE, state } };
export const _deleteData = _id => { return { type: DELETE_EMPLOYE_DATA, _id } };
export const _addData = obj => { return { type: ADD_EMPLOYE_DATA, obj } };
export const _updateData = (obj, oldId) => { return { type: UPDATE_EMPLOYE_DATA, obj, oldId } };

export const _updateForm = form => ({ type: UPDATE_SOME_STATE_EMPLOYE, payload: { form } });

export const getEmployeById = (id, employes) => {
    if(id && employes && employes.length > 0){
       const employeFilter = employes.filter( employe => getInfo.getIdentificacion(employe) === id )[0];
       return (employeFilter || null);
    }
    return null;
}