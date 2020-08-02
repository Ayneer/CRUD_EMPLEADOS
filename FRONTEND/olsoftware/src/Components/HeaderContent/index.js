import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { Row, Col, Button } from 'reactstrap';

//Componente que ilustra la cabecera de un contenido
const HeaderContent = ({ title, Icon, showButton, labelButton, actionButtom }) => {
    return (
        <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row style={{ width: 100 + "%", marginBottom: 'auto' }}>

                <Col xl={showButton ? 6 : 12} lg={showButton ? 6 : 12} md={showButton ? 6 : 12} sm={12} xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon />
                        <Typography className={"ml-1"} style={{fontSize: 1.1+"rem"}} noWrap>
                            {title}
                        </Typography>
                    </div>
                </Col>

                {showButton &&
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <div style={{textAlign: 'end'}}>
                            <Button color="primary" onClick={actionButtom} >{labelButton}</Button>
                        </div>
                    </Col>
                }
            </Row>
        </Toolbar>
    )
};

export default HeaderContent;