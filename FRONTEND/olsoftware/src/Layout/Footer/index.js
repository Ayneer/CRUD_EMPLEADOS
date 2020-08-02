import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@material-ui/core';
import { useStayles } from 'Layout/Styles';

//Componente encargado de ilustrar el menú horizontal del aplicativo, pero como footer, al final de la pagina
const Footer = () => {

    //Estilos del layout
    const classes = useStayles();

    return (
        <AppBar className={classes.footer}>
            <Toolbar className={clsx(classes.text2, classes.appNavbarRight)}>
                <div>OLSoftware - 2020</div>
            </Toolbar>
        </AppBar>
    )
}

export default Footer;