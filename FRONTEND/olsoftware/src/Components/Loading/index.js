import React from 'react';
import { Loader } from 'react-loaders';
import { Typography } from '@material-ui/core';

//Componente encargado de ilustrar el estado de cargando
const LoadingState = ({message}) => {
    return (
        <div className="loading-state">
             <Typography className="message">{message}</Typography>
            <Loader active type={"ball-pulse"} />
        </div>
    )
}

LoadingState.defaultProps = {
    message: 'Cargando, por favor espere.'
}

export default LoadingState;