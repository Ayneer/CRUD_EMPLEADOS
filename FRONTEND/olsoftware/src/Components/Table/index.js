import React, { Fragment, useState, useEffect } from 'react';
import { Table as ReactTable } from 'reactstrap';
import PropType from 'prop-types';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import Confirm from 'Components/Confirm';
import Pagination from '@material-ui/lab/Pagination';

//Componente encargado de exportar una tabla 100% responsive con paginación
//Se le debe sumistrar la información como los titulos y su contenido
//Esta a su vez, estará diseñada para recibir un conjunto de acciones
const Table = ({ loadingData, loadingLabel, emptyLabel, blockConfirmModal, numberDataPerPag, data, headers, actions }) => {

    //Estados locales para el manejo de la modal de confirmación
    const [modalState, setModalState] = useState({
        open: false,
        message: null,
        row: null,
        action: null
    });
    //Esatdos locales para el manejo de la paginación
    const [currentPage, setCurrentPage] = useState(0);
    const [dataBodyPagination, setDataBodyPagination] = useState(data);

    //Metodo encargadod de obtener la Key del mensaje de confirmación
    //Ej: ¿Esta seguro de eliminar al empleado con C.C. @@C@@? 
    //Return: C
    const _getMessageKey = message => {
        if (message) {
            const step1 = message.split('@@')[1];
            if (step1) {
                return (step1.split('@@')[0] || null);
            }
        }
        return null;
    }

    //Metodo encargado de accionar la acción de la fila
    const _toggleAction = (row, action) => {
        if (row && action && action.confirmarAction) {
            const key = _getMessageKey(action.actionMessage);
            const labelKey = row[key];

            if (labelKey) {
                setModalState({
                    open: true,
                    message: action.actionMessage.replace(`@@${key}@@`, labelKey),
                    row,
                    action
                });
            }

        } else {
            return action.funct(row, () => _denyAction());
        }
    }

    //Metodo confirmar para la modal
    const _confirmAction = () => {
        const { row, action } = modalState;
        if (row && action) {
            action.funct(row, () => _denyAction());
        }
    }

    //Metodo denegar para la modal
    const _denyAction = () => {
        setModalState({
            open: false,
            message: null,
            row: null,
            action: null
        });
    }

    const _getNumberPag = () => {//metodo utilizado para indicarle a la paginación el numero de pasos que debe mostrar
        const length = data && data.length;
        return Math.ceil((length || 0) / numberDataPerPag);
    };

    const _showPagination = () => {//indica si se debe o no mostrar la paginación
        const length = data && data.length;
        return numberDataPerPag >= (length || 0) ? false : true;
    }

    //Metodo encargado de actualizar la cantidad de datos visibles en la tabla teniendo en cuenta la paginación
    const _changeDataByPagination = (actualPage, initialData) => {
        const initialPosition = actualPage * numberDataPerPag;
        const FinallyPosition = initialPosition + numberDataPerPag;
        let newData = [];
        for (let index = initialPosition; index < FinallyPosition; index++) {
            if (initialData[index]) {
                newData.push(initialData[index]);
            }
        }
        setDataBodyPagination(newData);
    }

    //Metodo utilizado para realizar el cambio de pagina en la tabla
    const _changePage = (Evento, number) => {
        const actualPage = number - 1;
        _changeDataByPagination(actualPage, data, false);
        setCurrentPage(actualPage);
    }

    useEffect(() => {
        if (data) {
            setCurrentPage(0);
            // Se actualiza la lista de la tabla con la paginación inicial
            const initialPosition = 0 * numberDataPerPag;
            const FinallyPosition = initialPosition + numberDataPerPag;
            let newData = [];
            for (let index = initialPosition; index < FinallyPosition; index++) {
                if (data[index]) {
                    newData.push(data[index]);
                }
            }
            setDataBodyPagination(newData); 
        }
        return () => { }
    }, [data, numberDataPerPag]);

    return (
        <Fragment>

            {/* Modal confirmar */}
            <Confirm block={blockConfirmModal} confirmAction={_confirmAction} confirmMessage={modalState.message} denyAction={_denyAction} modalOpen={modalState.open} />

            {/* Tabla */}
            <ReactTable responsive>
                {/* Se construye los titulos de la tabla con la información suministrada */}
                <thead style={{ fontSize: 0.9 + "rem", textAlign: 'center' }}>
                    <tr>
                        {headers && headers.map((header, index) =>
                            <th key={index} >{header.title}</th>
                        )}
                        {headers && headers.length > 0 &&
                            <th>{"Acción"}</th>
                        }
                    </tr>
                </thead>
                <tbody style={{ fontSize: 0.8 + "rem", textAlign: 'center' }}>

                    {/* Indicar empty/loading state en al tabla */}
                    {dataBodyPagination && dataBodyPagination.length === 0 &&
                        <tr>
                            <td colSpan={headers ? (headers.length + 1) + "" : "1"}>
                                <div className="estado-vacio-tabla">
                                    {loadingData ? loadingLabel : emptyLabel}
                                </div>
                            </td>
                        </tr>
                    }

                    {/* Recorrer la información enviada */}
                    {dataBodyPagination && dataBodyPagination.length > 0 && dataBodyPagination.map((row, i) =>
                        <tr key={i + "i"}>

                            {/* Se recorren los titulos, para colocar la data en su orden */}
                            {headers && headers.map((header, j) =>
                                <td key={j + "j" + i} style={{verticalAlign: 'middle'}}>{row[header.key]}</td>
                            )}

                            {/* Se recorren las acciones */}
                            <td>
                                {actions && actions.map((action, k) =>
                                    <IconButton
                                        key={k + "kj" + i}
                                        color="inherit"
                                        edge="end"
                                        title={action.label}
                                        className={clsx(action.classIcon)}
                                        onClick={() => _toggleAction(row, action)}
                                    >
                                        {action.icon}
                                    </IconButton>
                                )}
                            </td>
                        </tr>
                    )}

                </tbody>
            </ReactTable>

            {/* Paginación */}
            {_showPagination() &&
                <div style={{ float: "right" }}>
                    <Pagination count={_getNumberPag()} onChange={_changePage} page={currentPage + 1} showFirstButton showLastButton />
                </div>
            }
        </Fragment>
    )
};

Table.propTypes = {
    loadingData: PropType.bool.isRequired,
    loadingLabel: PropType.string,
    emptyLabel: PropType.string,
    typeLabel: PropType.string,
    numberDataPerPag: PropType.number,
    data: PropType.array.isRequired, //Estructuta: { 'A': 'Pepe', 'B': 'Perez', ... }[],
    headers: PropType.array.isRequired, //Estructura: { title: 'Nombres', key: 'A' }[]
    actions: PropType.array.isRequired, //Estructura { label: 'Eliminar', classIcon: 'Delete', icon: <Delete fontSize="small" />, funct: _deleteEmployed, confirmarAction: true, actionMessage: '¿eliminar al empleado con C.C. @@C@@?' }[]
}

Table.defaultProps = {
    loadingLabel: "Cargando información...",
    emptyLabel: "No hay información.",
    numberDataPerPag: 1
}

export default Table;