import Auth from "Services/Auth";
import { URL_SERVER } from "Config/Server";

export const Create = async (newEmploye) => {
    let resModel;
    try {
        const res = await fetch(URL_SERVER + '/employes', {
            method: 'POST',
            body: JSON.stringify({ ...newEmploye }),
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