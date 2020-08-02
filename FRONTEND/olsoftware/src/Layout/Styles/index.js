import { makeStyles } from "@material-ui/core";

//Ancho del menú vertical
const drawerWidth = 240;
const primaryColor = "#333399";
const textColor = "#666666";
const zIndexDrawer = 10;

export const useStayles = makeStyles(theme => ({
    root: {
        // display: 'flex',
    },
    appNavbar: {//Menú horizontal, en estado natural
        zIndex: zIndexDrawer - 1,//Con esto indicamos que siempre el navbar horizontal estará por debajo del menú vertical
        color: primaryColor,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)",
        paddingLeft: theme.spacing(7) + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appNavbarActive: {//Menú horizontal, en estado activo, o cuando el menú vertical esta abierto
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        paddingLeft: 0,
    },
    verticalMenu: {//Menu vertical, estilo general
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background: "linear-gradient(to bottom, rgb(65, 171, 239), rgb(30, 70, 175))",
        color: "#F4F4F4",
        zIndex: zIndexDrawer
    },
    verticalMenuClose: {//Menu vertical cerrado
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1
    },
    verticalMenuActive: {//Menu vertical abierto
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: drawerWidth + "px"
    },
    toolbar: {//Permite acomodar el contenido debajo del menú vetical de forma correcta
        ...theme.mixins.toolbar
    },
    containerContent: {
        paddingLeft: theme.spacing(7) + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    containerContentActive: {
        paddingLeft: drawerWidth + "px",
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    content: {//Estilo del contenido del layout
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 20
    },
    footer: {//Footer del aplicativo
        zIndex: zIndexDrawer - 1,//Con esto indicamos que siempre el footer estará por debajo del menú vertical
        top: "auto",
        bottom: 0,
        height: 50+"px",
        alignItems: 'center',
        justifyContent: 'center',
        color: primaryColor,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)",
    },
    menuIcon: {
        color: "#fff"
    },
    divider: {
        marginLeft: 9,
        marginRight: 9,
        border: 1 + "px solid #F4F4F4",
        backgroundColor: '#F4F4F4'
    },
    hide: {
        display: 'none'
    },
    transparentBack: {
        background: 'transparent'
    },
    appNavbarRight: {
        marginLeft: 'auto',
    },
    avatarNav: {
        display: 'none',
        alignItems: 'center',
        [theme.breakpoints.up("md")]: {
            display: 'flex',
        }
    },
    avatarNavMobil: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up("md")]: {
            display: 'none',
        }
    },
    btnMore: {
        backgroundColor: primaryColor, "&:hover, &:focus": { backgroundColor: primaryColor },
        color: "#fff",
        padding: "4px 0px 4px 0px",
        borderRadius: 3
    },
    menuMoreIcons: `
        .MuiList-padding{
            padding-top:0px !import;
            padding-bottom:0px !import;
        }
    `,
    avatar: {
        marginRight: 10,
    },
    text1: {
        color: textColor,
        fontSize: 17 + "px"
    },
    text2: {
        color: textColor,
        fontSize: 15 + "px"
    }
}))