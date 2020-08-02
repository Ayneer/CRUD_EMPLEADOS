import React, { useState } from 'react';
import { useStayles } from 'Layout/Styles';
import { Avatar, Typography, IconButton, Menu, Card, CardHeader } from '@material-ui/core';
import { ExitToAppRounded, MoreVertOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/Actions/Sesion';

const RightNav = ({ userName }) => {

    //Estado para controlar el menú desplegado en los tres puntos de mas (mobil)
    const [moreMenu, setMoreMenu] = useState(null);

    //Estilos del layout
    const classes = useStayles();

    //Toggle menú tres puntos
    const _toggleMoreMenu = event => setMoreMenu(event.currentTarget);
    const _closeMoreMenu = () => setMoreMenu(null);

    //Dispatch para cerrar sesión
    const dispatch = useDispatch();
    const _logout = (cb) => dispatch(logout(cb));

    return (
        <div className={classes.appNavbarRight}>
            {/* Componente que se visualiza cuando se esta en dispositivos medianamente grandes (xl, lg y md) */}
            <div className={classes.avatarNav}>
                <Avatar className={classes.avatar} />
                <Typography className={classes.text1} noWrap>
                    {userName}
                </Typography>
                <IconButton color="inherit" edge="end" onClick={() => _logout(() => {})}>
                    <ExitToAppRounded />
                </IconButton>
            </div>
            {/* Componente que se visualiza cuando se esta en dispositivos pequeños (sm y xs) */}
            <div className={classes.avatarNavMobil}>
                <IconButton color="inherit" edge="end" className={classes.btnMore} aria-controls="menu" aria-haspopup="true" onClick={_toggleMoreMenu}>
                    <MoreVertOutlined />
                </IconButton>
                <Menu id="menu" keepMounted open={Boolean(moreMenu)} anchorEl={moreMenu} onClose={_closeMoreMenu} className={"menuMoreIcons"}>
                    <Card>
                        <CardHeader
                            avatar={<Avatar />}
                            action={
                                <IconButton color="inherit" edge="end" onClick={() => _logout(() => {})}>
                                    <ExitToAppRounded />
                                </IconButton>
                            }
                            title={userName}
                            subheader={""}
                        />
                    </Card>
                </Menu>
            </div>
        </div>
    )
}

export default RightNav;