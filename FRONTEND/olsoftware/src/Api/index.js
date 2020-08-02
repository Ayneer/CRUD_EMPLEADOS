import Sesion from './Sesion';
import Employes from './Employes';

//Objecto que contendrá todos los metodos para la comunicación con el Backend
const Api = {};

//Se inyecta los metodos de la sesión
Api.Sesion = Sesion;

//Se inyecta los metodos de los empleados
Api.Employes = Employes;

export default Api;