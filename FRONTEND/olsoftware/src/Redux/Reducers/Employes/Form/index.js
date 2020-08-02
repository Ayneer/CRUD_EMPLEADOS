export const form = {

    data: {
        Nombres: "",
        Apellidos: "",
        Identificacion: "",
        RolAsociado: "",
        Estado: "",
        Contraseña: "",
        Telefono: "",
        CorreoElectronico: "",
        _id: "",
    },

    filterData: {
        Nombres: "",
        Apellidos: "",
        Identificacion: "",
        RolAsociado: "",
        Estado: "",
        Contraseña: "",
        Telefono: "",
        CorreoElectronico: "",
    }
}

export const getInfo = {
    getNombres: form => ((form && form.data && form.data.Nombres) || ""),
    getApellidos: form => ((form && form.data && form.data.Apellidos) || ""),
    getIdentificacion: form => ((form && form.data && form.data.Identificacion) || ""),
    getRolAsociado: form => ((form && form.data && form.data.RolAsociado) || ""),
    getEstado: form => ((form && form.data && form.data.Estado) || ""),
    getContraseña: form => ((form && form.data && form.data.Contraseña) || ""),
    getTelefono: form => ((form && form.data && form.data.Telefono) || ""),
    getCorreoElectronico: form => ((form && form.data && form.data.CorreoElectronico) || ""),
    getUid: form => ((form && form.data && form.data._id) || ""),
}

export const getInfoFilter = {
    getNombres: form => ((form && form.filterData && form.filterData.Nombres) || ""),
    getApellidos: form => ((form && form.filterData && form.filterData.Apellidos) || ""),
    getIdentificacion: form => ((form && form.filterData && form.filterData.Identificacion) || ""),
    getRolAsociado: form => ((form && form.filterData && form.filterData.RolAsociado) || ""),
    getEstado: form => ((form && form.filterData && form.filterData.Estado) || ""),
    getContraseña: form => ((form && form.filterData && form.filterData.Contraseña) || ""),
    getTelefono: form => ((form && form.filterData && form.filterData.Telefono) || ""),
    getCorreoElectronico: form => ((form && form.filterData && form.filterData.CorreoElectronico) || ""),
}