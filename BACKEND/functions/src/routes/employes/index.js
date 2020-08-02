module.exports = express => {
    
    //Se instancia el manejo de rutas de express y el controlador
    const routes = express.Router();
    const cEmployes = require('../../controllers/employes');
    const auth = require('../../services/Auth');

    //Se definen cada una de las rutas
    routes.post('/', auth, cEmployes.createHandler);//Crear un empleado
    routes.delete('/:id', auth, cEmployes.deleteHandler);//Eliminar un empleado
    routes.put('/:id', auth, cEmployes.editHandler);//Editar un empleado
    routes.get('/', auth, cEmployes.findHandler);//Listar empleados

    return routes;
}