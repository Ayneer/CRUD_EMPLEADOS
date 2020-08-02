const { CREDENTIAL_ERROR, INTERNAL_ERROR, RESOURCES_FOUND, RESOURCE_CREATED, RESOURCE_DELETED, RESOURCE_EDITED, RESOURCE_FOUND, PROCESS_FAILED } = require('./variables');

//Metodo encargado de retornar el estado correcto a cada petición
module.exports = Status => {

    switch (Status) {

        case RESOURCE_CREATED: {
            return 201;
        }

        case RESOURCE_FOUND:
        case RESOURCE_DELETED:
        case RESOURCE_EDITED:
        case RESOURCES_FOUND: {
            return 200;
        }

        case INTERNAL_ERROR: {
            return 500;
        }

        case CREDENTIAL_ERROR: {
            return 401;
        }

        case PROCESS_FAILED: {
            return 400;
        }

        default: {
            return 404;
        }
    }

}