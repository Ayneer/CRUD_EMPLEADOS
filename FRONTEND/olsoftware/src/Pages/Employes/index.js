import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Group, Search, Delete, Edit } from '@material-ui/icons';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { reduxForm } from 'redux-form';
import { useSelector, useDispatch, connect } from 'react-redux';
import Table from 'Components/Table';
import { NotifyError, NotySuccess } from 'Components/Notification'

import HeaderContent from 'Components/HeaderContent';
import { getInfo, form, getInfoFilter } from 'Redux/Reducers/Employes/Form';
import { _getInfoEmployes, getEmployeById, _getForm } from 'Redux/Reducers/Employes';
import { getEmployes, deleteEmploye, editEmploye, updateForm, addEmploye } from 'Redux/Actions/Employes';
import ModalBody from 'Components/ModalBody';
import { Form as EmployesForm, validateForm } from 'Forms/Employes';
import { RolesAsociados, Estados } from 'Redux/Reducers/System';


const formName = 'formEmployes';

//Metodo encargado de tomar la data proveniente de redux y prepararla para la vista en la tabla
const headers = [
    { title: 'Nombres', key: 'A' },
    { title: 'Apellidos', key: 'B' },
    { title: 'Identificación (C.C)', key: 'C' },
    { title: 'Rol asociado', key: 'D' },
    { title: 'Estado', key: 'E' },
    { title: 'Teléfono', key: 'F' },
    { title: 'Correo electrónico', key: 'G' },
];
const prepareDataToTable = (employes, filterData) => {
    
    let data = [];
    if (employes && employes.length > 0) {
        for (let index = 0; index < employes.length; index++) {
            const form = employes[index];
            let isMatch = true;

            //Se aplican los filtros
            if (filterData.isFiltering && getInfo.getNombres(form).trim() && getInfoFilter.getNombres(filterData.values).trim()) {
                isMatch = (getInfo.getNombres(form).trim()).toUpperCase().includes((getInfoFilter.getNombres(filterData.values).trim()).toUpperCase());
            }
            //En este punto en adelante se deben aplicar los filtros siempre y cuando el anterior haga match
            if (filterData.isFiltering && isMatch && getInfo.getApellidos(form).trim() && getInfoFilter.getApellidos(filterData.values).trim()) {
                isMatch = (getInfo.getApellidos(form).trim()).toUpperCase().includes((getInfoFilter.getApellidos(filterData.values).trim()).toUpperCase());
            }
            if (filterData.isFiltering && isMatch && getInfo.getIdentificacion(form) && getInfoFilter.getIdentificacion(filterData.values)) {
                isMatch = (getInfo.getIdentificacion(form)).includes((getInfoFilter.getIdentificacion(filterData.values)));
            }
            if (filterData.isFiltering && isMatch && getInfo.getRolAsociado(form) && getInfoFilter.getRolAsociado(filterData.values)) {
                isMatch = RolesAsociados.getValue(getInfo.getRolAsociado(form)) === RolesAsociados.getValue(getInfoFilter.getRolAsociado(filterData.values)) ? true : false;
            }
            if (filterData.isFiltering && isMatch && getInfo.getEstado(form) && getInfoFilter.getEstado(filterData.values)) {
                isMatch = Estados.getValue(getInfo.getEstado(form)) === Estados.getValue(getInfoFilter.getEstado(filterData.values)) ? true : false;
            }
            if (filterData.isFiltering && isMatch && getInfo.getContraseña(form) && getInfoFilter.getContraseña(filterData.values)) {
                isMatch = (getInfo.getContraseña(form).trim()).includes((getInfoFilter.getContraseña(filterData.values).trim()));
            }
            if (filterData.isFiltering && isMatch && getInfo.getTelefono(form) && getInfoFilter.getTelefono(filterData.values)) {
                isMatch = (getInfo.getTelefono(form)).includes((getInfoFilter.getTelefono(filterData.values)));
            }
            if (filterData.isFiltering && isMatch && getInfo.getCorreoElectronico(form) && getInfoFilter.getCorreoElectronico(filterData.values)) {
                isMatch = (getInfo.getCorreoElectronico(form).trim()).toUpperCase().includes((getInfoFilter.getCorreoElectronico(filterData.values).trim()).toUpperCase());
            }

            if (filterData.isFiltering && isMatch) {
                data.push({
                    'A': getInfo.getNombres(form),
                    'B': getInfo.getApellidos(form),
                    'C': getInfo.getIdentificacion(form),
                    'D': RolesAsociados.getLabel(getInfo.getRolAsociado(form)),
                    'E': Estados.getLabel(getInfo.getEstado(form)),
                    'F': getInfo.getTelefono(form),
                    'G': getInfo.getCorreoElectronico(form),
                });
            } else if(!filterData.isFiltering) {
                data.push({
                    'A': getInfo.getNombres(form),
                    'B': getInfo.getApellidos(form),
                    'C': getInfo.getIdentificacion(form),
                    'D': RolesAsociados.getLabel(getInfo.getRolAsociado(form)),
                    'E': Estados.getLabel(getInfo.getEstado(form)),
                    'F': getInfo.getTelefono(form),
                    'G': getInfo.getCorreoElectronico(form),
                });
            }

        }
    }
    
    return data;
}

let Employes = ({ handleSubmit, reset }) => {

    //Constantes para el manejo de la modal
    const CREATE_EMPLOYE = "CREATE_EMPLOYE";
    const EDIT_EMPLOYE = "EDIT_EMPLOYE";

    //Manejo de estados locales para crear y/0 editar empleados
    const [modalEmployes, setModalEmployes] = useState({ isOpen: false, use: null });
    //indica si se esta filtrando
    const [filterData, setIsFiltering] = useState({ isFiltering: false, values: null });

    //State redux
    const { data, loadingData, workingPersistence, loadedData } = useSelector(({ EmployesRedux }) => _getInfoEmployes(EmployesRedux));
    const rolesAsociadosSelects = useSelector(({ System }) => RolesAsociados.getSelects(System));
    const estadosSelects = useSelector(({ System }) => Estados.getSelects(System));

    //Para disparar las acciones de redux
    const dispatch = useDispatch();
    const _addEmploye = (employe, cb) => dispatch(addEmploye(employe, cb));
    const _deleteEmploye = (_id, cb) => dispatch(deleteEmploye(_id, cb));
    const _editEmployeAct = (newEmploye, uid, cb) => dispatch(editEmploye(newEmploye, uid, cb));
    const _updateForm = form => dispatch(updateForm(form));

    const _openModalToNewEmploye = () => {
        reset();
        _updateForm(form);
        setModalEmployes({ isOpen: true, use: CREATE_EMPLOYE });
    }

    const _closeModalEmploye = () => {
        setModalEmployes({ isOpen: false, use: null });
    }

    // Metodo encargado de eliminar un empleado
    const _deleteEmployed = (row, cb) => {
        if (row) {
            const employe = getEmployeById(row.C, data);
            _deleteEmploye(getInfo.getUid(employe), (err, message) => {
                if (!err) {
                    NotySuccess("Empleado eliminado con exito!");
                } else {
                    NotifyError(message);
                }
                cb();
            });
        }
    }

    //Metodo encargado de cargar la data de un empleado en el formulario
    const _chargeEmployeData = (row, cb) => {
        const employe = getEmployeById(row.C, data);
        _updateForm(employe);
        setModalEmployes({ isOpen: true, use: EDIT_EMPLOYE });
        cb();
    }

    //Metodo encargado de editar a un empleado
    const _editEmploye = formEmploye => {
        //Se verifica el formulario
        if (formEmploye && validateForm(formEmploye, "data")) {
            _editEmployeAct(formEmploye, getInfo.getUid(formEmploye), (err, message) => {
                if (!err) {
                    _closeModalEmploye();
                    NotySuccess("Empleado editado con exito!");
                } else {
                    NotifyError(message);
                }
            });
        }

    }

    //Metodo ecargado de crear a un empleado
    const _createNewEmploye = formEmploye => {
        //Se verifica el formulario
        if (formEmploye && validateForm(formEmploye, "data")) {
            _addEmploye(formEmploye, (err, message) => {
                if (!err) {
                    _closeModalEmploye();
                    NotySuccess("Empleado creado con exito!");
                } else {
                    NotifyError(message);
                }
            })
        }
    }

    //Metodo encargado de tomar los datos del formulario y elegir que acción se hará (Crear o Editar)
    const _confirmToggle = formEmploye => {
        if (modalEmployes.use === EDIT_EMPLOYE) {
            _editEmploye(formEmploye);
        } else if (modalEmployes.use === CREATE_EMPLOYE) {
            _createNewEmploye(formEmploye);
        }
    }

    //Metodo encargado de indicar que se debe tener en cuenta el panel del filtro
    const _filterData = values => {
        setIsFiltering({ isFiltering: true, values });
    }

    //Metodo encargado de indicar que no se tenga en cuenta el panel del filtro y borra el formulario
    const _clearFilterData = () => {
        reset();
        _updateForm(form);
        setIsFiltering({ isFiltering: false, values: null });
    }

    useEffect(() => {
        //Se buscan los empleados, simepre y cuento no esten cargados
        function _getEmployes(cb) {
            if (!loadedData) {
                dispatch(getEmployes(rolesAsociadosSelects, estadosSelects, cb));
            }
        }
        _getEmployes((err, message) => {
            if(err){
                NotifyError(message);
            }
        });
        return () => { }
    }, [dispatch, loadedData, estadosSelects, rolesAsociadosSelects]);
   
    //Componente
    return (
        <Fragment>
            {/* Para animar el componente */}
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Container fluid className="mb-5" style={{ paddingLeft: 10, paddingRight: 10, marginLeft: 0, marginRight: 0 }}>

                    {/* Se hace una fila con dos columnas para trabajar la tabla y el filtro */}
                    <Row>

                        {/* Tabla de empleados */}
                        <Col xl={9} lg={9} md={12} sm={12} xs={12} >

                            {/* Cabecera */}
                            <HeaderContent title={"Empleados existentes"} Icon={Group} showButton={true} labelButton={"Crear"} actionButtom={_openModalToNewEmploye} />

                            {/* Cuerpo */}
                            <Table
                                loadingData={loadingData}
                                data={prepareDataToTable(data, filterData)}
                                headers={headers}
                                actions={
                                    [
                                        { label: 'Eliminar', classIcon: 'Delete', icon: <Delete fontSize="small" />, funct: _deleteEmployed, confirmarAction: true, actionMessage: '¿Esta seguro de eliminar al empleado con C.C. @@C@@?' },
                                        { label: 'Editar', classIcon: 'Edit', icon: <Edit fontSize="small" />, funct: _chargeEmployeData, confirmarAction: false },
                                    ]
                                }
                                blockConfirmModal={!loadingData && workingPersistence}
                                numberDataPerPag={8}
                            />

                            {/* Modal para editar y crear empleados */}
                            <ModalBody
                                modalTitle={"Agregar nuevo empleado"}
                                block={(modalEmployes.isOpen && workingPersistence)}
                                disabledInput={workingPersistence}
                                modalOpen={modalEmployes.isOpen}
                                cancelToggle={_closeModalEmploye}
                                confirmToggle={handleSubmit(_confirmToggle)}
                                toggle={_closeModalEmploye}
                                contentBody={<EmployesForm formSection={"data"} disabled={false} requiredInput={true} />}
                                cancelLabel="Cancelar"
                                confirmLabel="Aceptar"
                            />

                        </Col>

                        {/* Filtro de empleados */}
                        <Col xl={3} lg={3} md={12} sm={12} xs={12} >

                            {/* Cabecera */}
                            <HeaderContent title={"Filtrar búsqueda"} Icon={Search} showButton={false} />

                            {/* Cuerpo */}
                            <Fragment>
                                <EmployesForm formSection={"filterData"} disabled={(data && Array.isArray(data) && data.length > 0) ? false : true} requiredInput={false} />
                                <div style={{ display: "flex", alignItems: "start" }}>
                                    <Button disabled={(data && Array.isArray(data) && data.length > 0) ? false : true} className="mr-1" color="primary" onClick={handleSubmit(_filterData)}>Filtrar</Button>
                                    <Button disabled={(data && Array.isArray(data) && data.length > 0) ? false : true} color="secondary" onClick={_clearFilterData}>Limpiar</Button>
                                </div>
                            </Fragment>


                        </Col>
                    </Row>
                </Container>
            </ReactCSSTransitionGroup>

        </Fragment>

    )
}

Employes = reduxForm({
    form: formName
})(Employes);

Employes = connect(
    state => ({
        initialValues: _getForm(state.EmployesRedux),
        enableReinitialize: true
    })
)(Employes);

export default Employes;