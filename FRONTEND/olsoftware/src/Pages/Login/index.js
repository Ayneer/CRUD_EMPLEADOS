import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from 'Components/Field/Input';
import { InputAdornment, Typography } from '@material-ui/core';
import { PersonOutlineOutlined, LockOpenOutlined } from '@material-ui/icons';
import { required, validEmail } from "Forms/Validate";
import { useDispatch } from 'react-redux';
import { login } from 'Redux/Actions/Sesion';
import BlockUi from 'react-block-ui';
import LoadingState from 'Components/Loading';
import { NotifyError } from 'Components/Notification';

const formName = 'formLogin';

let Login = ({ handleSubmit }) => {

    const [loadingSesion, setLoadingSesion] = useState(false);

    const dispatch = useDispatch();
    const _signIn = (CorreoElectronico, Contraseña, cb) => dispatch(login(CorreoElectronico, Contraseña, cb));

    //Metodo que permite iniciar sesión
    const _login = values => {
        const { Password, User } = values;
        if (Password && User) {
            setLoadingSesion(true);
            _signIn(User.trim(), Password.trim(), (err, message) => {
                if (err) {
                    setLoadingSesion(false);
                    NotifyError(message);
                }
            })
        }
    }

    useEffect(() => {
        return () => { setLoadingSesion(false) }
    }, []);

    return (
        <BlockUi tag="div" blocking={loadingSesion} className="block-overlay-dark" loader={<LoadingState message={"Estamos preparando todo para tí"} />} renderChildren={true}>
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
                    <div className="login" >
                        <Typography className="title" variant="h6" noWrap>
                            Inicio de sesión
                    </Typography>
                        <Row>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <FormGroup>
                                    <Field
                                        id="UserLogin"
                                        name="User"
                                        component={renderInput}
                                        label="Usuario"
                                        disabled={loadingSesion}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonOutlineOutlined fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        requerido={true}
                                        validate={[required, validEmail]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <FormGroup>
                                    <Field
                                        id="PasswordLogin"
                                        name="Password"
                                        type={"password"}
                                        component={renderInput}
                                        label="Contraseña"
                                        disabled={loadingSesion}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <LockOpenOutlined fontSize="small" />
                                                </InputAdornment >
                                            )
                                        }}
                                        requerido={true}
                                        validate={[required]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl={12} md={12} sm={12} xs={12}>
                                <FormGroup>
                                    <Button
                                        onClick={handleSubmit(_login)}
                                        onSubmit={handleSubmit(_login)}
                                        color="primary"
                                        className="btn-login"
                                        disabled={loadingSesion}
                                    >
                                        Iniciar sesión
                                </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        </BlockUi>

    )
}

Login = reduxForm({
    form: formName
})(Login);

export default Login;