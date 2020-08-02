import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Group, Home } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { MenuRoutes } from 'Layout/Helper';
import { useStayles } from 'Layout/Styles';

const MenuOptions = ({history}) => {

    //Estilos del layout
    const classes = useStayles();
    
    //Metodo que permite moverse a una ruta en especifico
    const _changeRoute = link => history.push(link);

    const { EMPLOYES, HOME } = MenuRoutes;

    return (
        <List>
            <ListItem button onClick={() => _changeRoute(HOME)}>
                <ListItemIcon className={classes.menuIcon}>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => _changeRoute(EMPLOYES)}>
                <ListItemIcon className={classes.menuIcon}>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Empleados" />
            </ListItem>
        </List>
    )
}

export default withRouter(MenuOptions);