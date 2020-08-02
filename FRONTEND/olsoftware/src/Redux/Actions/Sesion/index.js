import Auth from "Services/Auth"
import { _changeUser } from "Redux/Reducers/Sesion";
import { LIMPIAR_STATE_SALIR } from "Redux/variables";

//Metodo que permite iniciar sesiòn en el sistema
export const login = (CorreoElectronico, Contraseña, cb) => {
    return (dispatch, getState, Api) => {
        return Api.Sesion.LogIn(CorreoElectronico, Contraseña).then(response => {
            if (response.Error || !response.Data) {//Error
                cb(true, response.Mensaje);
            } else {
                dispatch(_changeUser(null, true));//Se indica que esta la sesión iniciada
                Auth.saveToken(response.Data.Token);
                cb(false, null);
            }
        }).catch(err => {
            cb(true, err.message);
        })
    }
}

//Metodo que destruye el token de sesiòn
export const logout = cb => {
    return (dispatch) => {
        Auth.deleteToken();
        if (!Auth.getToken()) {
            dispatch({ type: LIMPIAR_STATE_SALIR });
            dispatch(_changeUser(null, false));
            cb(false, null);
        } else {
            console.log("Error al intentar borrar la sesion");
            cb(true, "Error al intentar borrar la sesion");
        }
    }
}

//Metodo que obtiene los datos del usuario autenticado
export const gerUserData = cb => {
    return (dispatch, getState, Api) => {
        return Api.Sesion.getUserDetails().then(response => {
            if (response.Error || !response.Data) {//Error
                cb(true, response.Mensaje, null);
            } else {
                dispatch(_changeUser(response.Data, true));//Se carga el usuario en Redux
                cb(false, null, response.Data);
            }
        }).catch(err => {
            cb(true, err.message, null);
        })
    }
}