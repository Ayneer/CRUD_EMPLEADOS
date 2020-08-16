//Constantes generales
import { LIMPIAR_STATE_SALIR } from 'Redux/variables';

//Constantes locales
const CHANGE_USER = "CHANGE_USER";
const CHANGE_AUTH = "CHANGE_AUTH";
const CHANGE_LOADING_SESION = "CHANGE_LOADING_SESION";
const CHECKING_SESION = "CHECKING_SESION";

//Estos en su forma inicial
const initState = {
    user: null,
    isAuth: false,
    loadingSesion: false,
    chekingSesion: true
}

//Manejo de los estados del menú con redux
export const Sesion = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR: {
            return {
                ...state,
                ...initState
            }
        }

        case CHANGE_USER: {
            return {
                ...state,
                user: action.user,
                isAuth: action.isAuth,
                chekingSesion: false
            }
        }

        case CHANGE_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }

        case CHANGE_LOADING_SESION: {
            return {
                ...state,
                loadingSesion: action.loadingSesion
            }
        }

        case CHECKING_SESION: {
            return {
                ...state,
                chekingSesion: action.chekingSesion
            }
        }

        default:
            return state;
    }
}

export const _changeUser = (user, isAuth) => ({ type: CHANGE_USER, user, isAuth });
export const _changeIsAuth = isAuth => ({ type: CHANGE_AUTH, isAuth });
export const _changeLoadingSesion = loadingSesion => ({ type: CHANGE_LOADING_SESION, loadingSesion });
export const _changeChekingSesion = chekingSesion => ({ type: CHECKING_SESION, chekingSesion });
export const _getUser = state => state && state.user ? state.user : null;
export const _isAuth = state => ((state && state.isAuth) || null);
export const getLoadingSesion = state => ((state && (state.loadingSesion !== undefined)) || null);
export const getChekingSesion = state => state ? state.chekingSesion : true;
export const _getInfoUser = state => {
    const user = _getUser(state);
    if (user) {
        return { ...user }
    }
}