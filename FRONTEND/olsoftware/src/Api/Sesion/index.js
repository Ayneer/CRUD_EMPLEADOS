import Auth from "Services/Auth";
import { URL_SERVER, resModel } from "Config/Server";

const LogIn = async (CorreoElectronico, Contraseña) => {
    let resModel;
    try {
        const res = await fetch(URL_SERVER + '/users/signin', {
            method: 'POST',
            body: JSON.stringify({ CorreoElectronico, Contraseña }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        resModel = await res.json();

    } catch (error) {
        console.log(error)
        resModel.Error = true;
        resModel.Mensaje = error.message;
    }

    return resModel;
}

const getUserDetails = async () => {
    let resModel;
    try {
        const res = await fetch(URL_SERVER + '/users/usersigned', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Auth.getToken().Token,
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        resModel = await res.json();

    } catch (error) {
        console.log(error)
        resModel.Error = true;
        resModel.Mensaje = error.message;
    }
    return resModel;
}

export default {
    LogIn,
    getUserDetails
};