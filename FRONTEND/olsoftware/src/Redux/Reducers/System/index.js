//Constantes generales
import { LIMPIAR_STATE_SALIR } from 'Redux/variables';

//Estos en su forma inicial
const initState = {
    rolesAsociados: [
        { label: "Administrador", value: "1" },
        { label: "Conductor", value: "2" },
        { label: "Recolector", value: "3" },
    ],
    estados: [
        { label: "Activo", value: "A" },
        { label: "Inactivo", value: "I" },
    ]
}

//Manejo de los pequeños maestros del sistema
export const System = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR: {
            return {
                ...state,
                ...initState
            }
        }

        default:
            return state;
    }
}

export const _getInfoSystem = state => {
    return {
        rolesAsociados: state.rolesAsociados,
        estados: state.estados,
    }
}

export const RolesAsociados = {
    getValue: rolAsociado => ((rolAsociado && rolAsociado.value) || null),
    getLabel: rolAsociado => ((rolAsociado && rolAsociado.label) || null),
    getSelects: state => ((state && state.rolesAsociados) || null),
    getSelectByValue: (value, rolesAsociados) => {
        if (value && rolesAsociados && Array.isArray(rolesAsociados)) {
            const rolFilter = rolesAsociados.filter(rol => rol.value === value)[0];
            return (rolFilter || null);
        }else{
            return null;
        }
    },
}
export const Estados = {
    getValue: estado => ((estado && estado.value) || null),
    getLabel: estado => ((estado && estado.label) || null),
    getSelects: state => ((state && state.estados) || null),
    getSelectByValue: (value, estados) => {
        if (value && estados && Array.isArray(estados)) {
            const estadoFilter = estados.filter(estado => estado.value === value)[0];
            return (estadoFilter || null);
        }else{
            return null;
        }
    },
}