import React from 'react';
import { makeStyles, emphasize, TextField, Paper, Chip, Typography, MenuItem } from "@material-ui/core";
import { components as comp } from "react-select";
import clsx from 'clsx';
import PropTypes from 'prop-types';

//Esilos para hacer compatible react-select con material UI
export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: '32px',
    },
    valueContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
    textArea1: {
        height: 400,
        backgroundColor: 'red'
    }
}));

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;
inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Control = ({ children, innerProps, innerRef, selectProps: { classes, TextFieldProps } }) => (
    <TextField
        fullWidth
        InputProps={{
            inputComponent,
            inputProps: {
                className: classes.input,
                ref: innerRef,
                children,
                ...innerProps,
            },
        }}
        {...TextFieldProps}
    />
);
Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectProps: PropTypes.object.isRequired,
};

const Menu = props => (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
    </Paper>
);
Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};

const MultiValue = props => (
    <Chip
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
    />
);
MultiValue.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool,
    removeProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
};

const NoOptionsMessage = (props) => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);
NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
};

const Option = props => (
    <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
    >
        {props.children}
    </MenuItem>
);
Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
};

const Placeholder = (props) => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);
Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
};

const SingleValue = props => (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
    </Typography>
);
SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
};

const ValueContainer = props => (
    <div
        className={props.selectProps.classes.valueContainer}>
        {props.children}
    </div>
)
ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired,
};

const MenuList = props => {
    return (
        <comp.MenuList {...props}>
            {Array.isArray(props.children) ? props.children.slice(0, 50) : props.children}
        </comp.MenuList>
    );
}

export const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    MenuList,
};