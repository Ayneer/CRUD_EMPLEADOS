import React from 'react';
import { useStayles } from 'Layout/Styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Brightness1 } from '@material-ui/icons';

//Componente que ilustra el logotipo y nombre del aplicativo
const Brand = () => {

    //Estilos del layout
    const classes = useStayles();

    return (
        /* Necesario para ajustarse a la altura del menú vertical */
        <div className={classes.toolbar} >
            <List>
                <ListItem button>
                    <ListItemIcon className={classes.menuIcon}>
                        <Brightness1 />
                    </ListItemIcon>
                    <ListItemText primary="OLSoftware" />
                </ListItem>
            </List>
        </div >
    )
}

export default Brand;