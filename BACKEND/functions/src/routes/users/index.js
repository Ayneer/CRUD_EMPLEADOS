module.exports = express => {
    
    //Se instancia el manejo de rutas de express y el controlador
    const routes = express.Router();
    const cUsers = require('../../controllers/users');
    const auth = require('../../services/Auth');

    //Se definen cada una de las rutas
    routes.post('/signup', cUsers.createHandler);//Crear un usuario (Sign up)
    routes.post('/signin', cUsers.loginHandler);//Autenticar un usuario (Sign in)
    routes.get('/', auth, cUsers.findHandler);//Obtener todos los usuarios
    routes.get('/usersigned', auth, cUsers.userSignedHandler);//Obtener al usuario loggeado
    routes.delete('/:id', cUsers.deleteHandler);//Eliminar a un usuario en especifico

    return routes;
}