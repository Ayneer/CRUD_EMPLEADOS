import React from 'react';
import { Modal, Form, ModalBody as ModBody, ModalFooter, Button } from 'reactstrap';
import PropType from 'prop-types';
import BlockUi from 'react-block-ui';
import LoadingState from 'Components/Loading';

//Componente que ilustra un ventana modal pequeña en la cual se pide confirmas alguna acción
const Confirm = ({ confirmAction, modalOpen, denyAction, confirmMessage, confirmLabel, denyLabel, block }) => {
    return (
        // Hay que tener en cuenta que al congelar (block) la modal, no se pude realizar ningun tipo de acción
        <Modal isOpen={block ? true : modalOpen} toggle={block ? null : denyAction} style={{ boxShadow: 'none' }} backdrop="static" size={"sm"} centered>
            <BlockUi tag="div" blocking={block} className="block-overlay-dark" loader={<LoadingState />} renderChildren={true}>
                <Form>
                    <ModBody style={{ textAlign: 'center' }}>
                        <p>{confirmMessage}</p>
                    </ModBody>
                    <ModalFooter className="footer-modal-registro" style={{ justifyContent: 'center' }}>
                        <Button className="cancel" color="primary" onClick={confirmAction} disabled={block}>{confirmLabel}</Button>
                        <Button className="mr-2 confirm" color="primary" onClick={denyAction} disabled={block}>{denyLabel}</Button>
                    </ModalFooter>
                </Form>
            </BlockUi>
        </Modal>
    )
}

Confirm.propTypes = {
    confirmAction: PropType.func.isRequired, //Metodo que se ejecutará cuando acepten la acción
    modalOpen: PropType.bool.isRequired, //Estado de la modal
    denyAction: PropType.func.isRequired, //Metodo que se ejecutará cuando NO acepten la acción
    confirmMessage: PropType.string, //Cadena de texto para el cuerpo del modal
    confirmLabel: PropType.string, //Cadena de texto para el boton aceptar
    denyLabel: PropType.string, //Cadena de texto para el boton cancelar
}

Confirm.defaultProps = {
    confirmMessage: '¿Esta seguro de proceder?',
    confirmLabel: 'Si',
    denyLabel: 'No'
}

export default Confirm;