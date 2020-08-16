import { getInfo } from "..";
import { RolesAsociados, Estados } from "Redux/Reducers/System";

export const prepareToDataBase = form => {
    return {
        Nombres: getInfo.getNombres(form).trim(),
        Apellidos: getInfo.getApellidos(form).trim(),
        Identificacion: getInfo.getIdentificacion(form),
        RolAsociado: RolesAsociados.getValue(getInfo.getRolAsociado(form)),
        Estado: Estados.getValue(getInfo.getEstado(form)),
        Contraseña: getInfo.getContraseña(form),
        Telefono: getInfo.getTelefono(form),
        CorreoElectronico: getInfo.getCorreoElectronico(form).trim(),
    }
}

export const prepareToView = (doc, rolesAsociados, estados) => {
   
    const { Nombres, Apellidos, Identificacion, RolAsociado, Estado, Contraseña, Telefono, CorreoElectronico, _id } = doc;

    return {
        data: {
            _id,
            Nombres,
            Apellidos,
            Identificacion,
            RolAsociado: RolesAsociados.getSelectByValue(RolAsociado, rolesAsociados),
            Estado: Estados.getSelectByValue(Estado, estados),
            Contraseña,
            Telefono,
            CorreoElectronico,
        }
    }
}