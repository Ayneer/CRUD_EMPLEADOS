import React from 'react';
import AppNavbar from './AppNavbar';
import VerticalMenu from './VerticalMenu';
import { useStayles } from './Styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';

//Paginas del aplicativo
import Home from 'Pages/Home';
import Employes from 'Pages/Employes';
import { MenuRoutes } from './Helper';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { _getInfoUser } from 'Redux/Reducers/Sesion';

//Componente que ilustra la estructura general de aplicativo
const Layout = () => {

    //Estilos del layout
    const classes = useStayles();

    const { EMPLOYES, HOME } = MenuRoutes;

    //State redux
    const menuState = useSelector(({ Menu }) => Menu.open);
    const { Nombres, Apellidos } = useSelector(({ Sesion }) => _getInfoUser(Sesion));

    return (
        <div className={classes.root}>

            {/* Menú horizontal */}
            <AppNavbar userName={`${Nombres} ${Apellidos}`} title={"Prueba front-end"} />

            {/* Menú vertical */}
            <VerticalMenu />

            {/* Contenido del aplicativo */}
            <div className={clsx(classes.containerContent, { [classes.containerContentActive]: menuState })}>

                {/* Necesario para ajustarse a la altura del menú vertical */}
                <div className={classes.toolbar} />

                <main className={classes.content}>

                    {/* Rutas para el contenido del aplicativo */}
                    <Switch>
                        <Route exact path={HOME} component={Home} />
                        <Route exact path={EMPLOYES} component={Employes} />
                        <Route path="/" render={() => <Redirect to={HOME} />} />
                    </Switch>

                </main>
            </div>

            {/* Footer del aplicativo */}
            <Footer />
        </div>
    )
}

export default Layout;