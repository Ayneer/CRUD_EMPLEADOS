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
                //Se guarda el token
                Auth.saveToken(response.Data.Token);

                //Se busca los datos del usuario
                dispatch(getUserData((err, message, user) => {
                    if (err) {
                        cb(true, message);
                    } else {
                        dispatch(_changeUser(user, true));//Se indica que esta la sesión iniciada
                        cb(false, null);
                    }
                }));
    }
}).catch (err => {
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
export const getUserData = cb => {
    return (dispatch, getState, Api) => {
        return Api.Sesion.getUserDetails().then(response => {
         
            if (response.Error || !response.Data) {//Error en la autenticación, cerramos sesión por seguridad
                dispatch(logout((err, message) => {
                    if (!err) {
                        cb(true, response.Mensaje, null);
                    } else {
                        cb(true, message, null);
                    }
                }))
            } else {
                dispatch(_changeUser(response.Data, true));//Se carga el usuario en Redux
                cb(false, null, response.Data);
            }
        }).catch(err => {
            cb(true, err.message, null);
        })
    }
}