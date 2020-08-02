import { _toggleMenu } from "Redux/Reducers/Menu";

//Acción que cambia el estadod el menú principal del aplicativo
export const toggleMenu = state => {
    return (dispatch, getState, Api) => {
        dispatch(_toggleMenu(state));
    }
}