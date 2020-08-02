import React from 'react';
import { FormSection, Field } from 'redux-form';
import { Row, Col, FormGroup } from 'reactstrap';
import { renderInput } from "Components/Field/Input";
import { required, onlyText, minLenght2, validDigit, positiveNumber, validateID, minLength6, validEmail } from "Forms/Validate";
import { useSelector } from 'react-redux';
import { RolesAsociados, Estados } from 'Redux/Reducers/System';
import { RenderSelect } from 'Components/Field/Select';

//Metodo encargado de validar el formulario
export const validateForm = (values, formSection) => {
    const { Nombres, Apellidos, Identificacion, RolAsociado, Estado, Contraseña, Telefono, CorreoElectronico } = values[formSection];
    if(Nombres && Apellidos && Identificacion && RolAsociado && Estado && Contraseña && Telefono && CorreoElectronico){
        return true;
    }else{
        return false;
    }
}

//Componente que exporta el formulario para la creación, edición y/o filtro de un empleado
export const Form = ({ formSection, disabled, requiredInput }) => {

    const rolesAsociadosSelects = useSelector(({System}) => RolesAsociados.getSelects(System));
    const estadosSelects = useSelector(({System}) => Estados.getSelects(System));

    return (
        <FormSection name={formSection}>
            <Row form>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Nombres${formSection}`}
                            type="text"
                            name="Nombres"
                            component={renderInput}
                            label="Nombres"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, onlyText, minLenght2] : [onlyText]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Apellidos${formSection}`}
                            type="text"
                            name="Apellidos"
                            component={renderInput}
                            label="Apellidos"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, onlyText, minLenght2] : [onlyText]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Identificacion${formSection}`}
                            type="number"
                            name="Identificacion"
                            component={renderInput}
                            label="Identificación (C.C)"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, validDigit, positiveNumber, validateID] : [validDigit, positiveNumber]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`RolAsociado${formSection}`}
                            name="RolAsociado"
                            component={RenderSelect}
                            opciones={rolesAsociadosSelects}
                            label="Rol asociado"
                            disabled={disabled}
                            required={requiredInput}
                            validate={ requiredInput ? [required] : []}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Estado${formSection}`}
                            name="Estado"
                            component={RenderSelect}
                            opciones={estadosSelects}
                            label="Estado"
                            disabled={disabled}
                            required={requiredInput}
                            validate={ requiredInput ? [required] : []}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Contraseña${formSection}`}
                            type="password"
                            name="Contraseña"
                            component={renderInput}
                            label="Contraseña"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, minLength6] : []}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`Telefono${formSection}`}
                            type="number"
                            name="Telefono"
                            component={renderInput}
                            label="Teléfono"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, validDigit, positiveNumber, minLength6] : [validDigit, positiveNumber]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                        <Field
                            id={`CorreoElectronico${formSection}`}
                            type="text"
                            name="CorreoElectronico"
                            component={renderInput}
                            label="Correo electrónico"
                            disabled={disabled}
                            required={requiredInput}
                            validate={requiredInput ? [required, validEmail] : []}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </FormSection>
    )
}