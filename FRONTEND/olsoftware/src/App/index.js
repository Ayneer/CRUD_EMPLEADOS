import React, { useEffect } from 'react';
import Layout from 'Layout';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Login from 'Pages/Login';
import { MenuRoutes } from 'Layout/Helper';
import { _isAuth } from 'Redux/Reducers/Sesion';
import { useSelector, useDispatch } from 'react-redux';
import Auth from 'Services/Auth';
import { gerUserData } from 'Redux/Actions/Sesion';

//Componente encargado de controlar el acceso hacia la interfaz principal del aplicativo, validando la existencia de un usuario/token.
const App = () => {

    //Rutas generales
    const { LOGIN, APP } = MenuRoutes;

    const dispatch = useDispatch();
    const _getUserDatils = (cb) => dispatch(gerUserData(cb));

    //Se escucha si hay o no sesión
    const isAuth = useSelector(({ Sesion }) => _isAuth(Sesion));   

    useEffect(() => {
        if(Auth.getToken() && !isAuth){//Hay un token, se procede a recuperar la sesión
            _getUserDatils(()=>{});
        }
        return () => { }
    }, []);

    console.log(isAuth)

    return (
        <div>
            {isAuth ?
                <Switch>
                    <Route path={APP} component={Layout} />
                    <Route exact path="/" render={() => <Redirect to={APP} />} />
                </Switch>
                :
                <Switch>
                    <Route exact path={LOGIN} component={Login} />
                    <Route path="/" render={() => <Redirect to={LOGIN} />} />
                </Switch>
            }
        </div>
    )
}

export default withRouter(App);