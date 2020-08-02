//Constantes generales
import { LIMPIAR_STATE_SALIR } from 'Redux/variables';

//Constantes locales
const TOGGLE_MENU = "TOGGLE_MENU";

//Estos en su forma inicial
const initState = {
    open: false,
}

//Manejo de los estados del menú con redux
export const Menu = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR: {
            return {
                ...state,
                ...initState
            }
        }

        case TOGGLE_MENU: {
            return {
                ...state,
                open: action.state
            }
        }

        default:
            return state;
    }
}

export const _toggleMenu = state => ({ type: TOGGLE_MENU, state });