import React from 'react';
import { Loader } from 'react-loaders';
import { Typography } from '@material-ui/core';

//Componente encargado de ilustrar el estado de cargando
const LoadingState = ({message}) => {
    return (
        <div>
            <Loader color="#ffffff" active type={"ball-pulse"} />
            <Typography>{message}</Typography>
        </div>
    )
}

LoadingState.defaultProps = {
    message: 'Cargando, por favor espere.'
}

export default LoadingState;