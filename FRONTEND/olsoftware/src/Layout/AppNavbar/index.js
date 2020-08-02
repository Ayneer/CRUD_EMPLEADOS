import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { useStayles } from 'Layout/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from 'Redux/Actions/Menu';
import RightNav from './NavRight';

//Componente encargado de ilustrar el menú horizontal del aplicativo
const AppNavbar = ({ userName, title }) => {

    //Estilos del layout
    const classes = useStayles();

    //State redux
    const menuState = useSelector(({ Menu }) => Menu.open);

    //Para disparar las acciones de redux
    const dispatch = useDispatch();
    const _toggleMenu = () => dispatch(toggleMenu(!menuState));

    return (
        <AppBar position="fixed" className={clsx(classes.appNavbar, { [classes.appNavbarActive]: menuState })}>
            <Toolbar>
                {/* Opciones mostradas al lado izquierdo del navbar */}
                <IconButton color="inherit" edge="start" onClick={_toggleMenu} >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
                {/* Opciones mostradas al lado derecho del navbar */}
                <RightNav userName={userName} />
            </Toolbar>
        </AppBar>
    )
}

export default AppNavbar;