import React, { useEffect } from 'react';
import Layout from 'Layout';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from 'Pages/Login';
import { MenuRoutes } from 'Layout/Helper';
import { _isAuth, getChekingSesion, _changeChekingSesion, _getUser } from 'Redux/Reducers/Sesion';
import { useSelector, useDispatch } from 'react-redux';
import Auth from 'Services/Auth';
import { getUserData } from 'Redux/Actions/Sesion';
import AllPage from 'Components/Loading/AllPage';

//Componente encargado de controlar el acceso hacia la interfaz principal del aplicativo, validando la existencia de un usuario/token.
const App = () => {

    //Rutas generales
    const { LOGIN, APP } = MenuRoutes;

    const dispatch = useDispatch();
    // const _getUserDatils = (cb) => dispatch(gerUserData(cb));

    //Se escucha si hay o no sesión
    const isAuth = useSelector(({ Sesion }) => _isAuth(Sesion));
    const chekingSesion = useSelector(({ Sesion }) => getChekingSesion(Sesion));
    const userAuth = useSelector(({ Sesion }) => _getUser(Sesion));

    useEffect(() => {
        if ((Auth.getToken() && !isAuth) || (Auth.getToken() && !userAuth) ) {//Hay un token, se procede a recuperar la sesión
            dispatch(getUserData((err, mess) => {
                if (err) {
                    console.log(mess)
                    dispatch(_changeChekingSesion(false));
                }
            }));
        } else if (!Auth.getToken() && chekingSesion) {
            dispatch(_changeChekingSesion(false));
        }
        return () => { }
    }, [dispatch, isAuth, chekingSesion, userAuth]);

    //Se verifica si la sesión ya fue chekeada, esto es con el fin de establecer si hay un usuaio o no, y mientras eso sucede mostramos un cargando
    if (chekingSesion) {
        return <AllPage message={"Cargando la sesión, por favor espere."} />
    }

    return (
        <div>
            {isAuth ?
                <Switch>
                    <Route path={APP} component={Layout} />
                    <Route path="/" render={() => <Redirect to={APP} />} />
                </Switch>
                :
                <Switch>
                    <Route exact path={LOGIN} component={Login} />
                    <Route path="/" render={() => <Redirect to={LOGIN} />} />
                </Switch>
            }
            <ToastContainer />
        </div>
    )
}

export default withRouter(App);