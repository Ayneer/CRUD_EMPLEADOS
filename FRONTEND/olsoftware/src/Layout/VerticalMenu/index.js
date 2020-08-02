import React from 'react';
import { Drawer, Divider } from '@material-ui/core';
import clsx from 'clsx';
import { useStayles } from 'Layout/Styles';
import { useSelector } from 'react-redux';
import MenuOptions from 'Layout/MenuOptions';
import Brand from 'Layout/Brand';

//Componente encargado de ilustrar el menú vertical del aplicativo
const VerticalMenu = () => {

    //Estilos del layout
    const classes = useStayles();

    //State redux
    const menuState = useSelector(({ Menu }) => Menu.open);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.verticalMenu, classes.transparentBack, {
                [classes.verticalMenuActive]: menuState,
                [classes.verticalMenuClose]: !menuState
            })}
            classes={{
                paper: clsx(classes.verticalMenu, {
                    [classes.verticalMenuActive]: menuState,
                    [classes.verticalMenuClose]: !menuState
                })
            }}
        >
            {/* Logotipo del aplicativo */}
            <Brand /> 
            <Divider className={classes.divider} />
            <MenuOptions />
        </Drawer>
    )
}

export default VerticalMenu;