import React, { Fragment, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Modal, ModalFooter, Button, ModalHeader, ModalBody as ModBody } from 'reactstrap';
import BlockUi from 'react-block-ui';
import PropType from 'prop-types';
import LoadingState from 'Components/Loading';
import Confirm from 'Components/Confirm';

//Componente utilizao para ilustrar una modal que su contenido varia según sus props
const ModalBody = ({ block, modalOpen, closeConfirm, toggle, cancelToggle, confirmToggle, modalSize, modalIcon, modalTitle, contentBody, cancelLabel, confirmLabel, disabledInput, footerPosition }) => {

    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        action: null
    });

    //Metodo utilizado de forma general para verificar si se debe confirmar antes de ejecutar la acción
    const _generalToggle = action => {
        if (closeConfirm) {//Se verifica si es necesario confirmar la acción
            return setModalConfirm({ isOpen: true, action, });
        } else {
            return action();
        }
    }

    //Metodo para confirmar la accion
    const _confirmAction = () => {
        if (modalConfirm.action && modalConfirm.isOpen) {
            modalConfirm.action();
            setModalConfirm({ isOpen: false, action: null });
        }
    }

    //Metodo para denegar la accion
    const _denyAction = () => {
        setModalConfirm({ isOpen: false, action: null });
    }

    return (
        <Fragment>

            {/* Modal de confirmación */}
            {!block && <Confirm modalOpen={modalConfirm.isOpen} confirmAction={_confirmAction} denyAction={_denyAction} />}

            {/* Para animar el componente */}
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
            >
                {/* Inicio de la modal */}
                <Modal isOpen={block ? true : modalOpen} toggle={() => _generalToggle(toggle)} style={{ boxShadow: 'none' }} backdrop="static" size={modalSize} centered>
                    {/* Por si se necesita congelar la modal */}
                    <BlockUi tag="div" blocking={block} className="block-overlay-dark" loader={<LoadingState />} renderChildren={true}>

                        {/* Header */}
                        <ModalHeader toggle={() => _generalToggle(toggle)}>
                            {modalIcon}
                            {modalTitle}
                        </ModalHeader>

                        {/* Body */}
                        <ModBody>
                            {contentBody}
                        </ModBody>

                        {/* Footer */}
                        <ModalFooter style={{justifyContent: footerPosition}}>
                            <Button disabled={disabledInput} color="secondary" onClick={() => _generalToggle(cancelToggle)}>
                                {cancelLabel}
                            </Button>
                            <Button disabled={disabledInput} color="primary" onClick={() => _generalToggle(confirmToggle)}>
                                {confirmLabel}
                            </Button>
                        </ModalFooter>
                    </BlockUi>
                </Modal>
            </ReactCSSTransitionGroup>

        </Fragment>
    )
};

ModalBody.propTypes = {
    block: PropType.bool,
    modalOpen: PropType.bool.isRequired,
    closeConfirm: PropType.bool, 
    toggle: PropType.func.isRequired, 
    cancelToggle: PropType.func.isRequired,
    confirmToggle: PropType.func.isRequired, 
    modalSize: PropType.string, 
    modalIcon: PropType.element, 
    modalTitle: PropType.string.isRequired, 
    contentBody: PropType.element.isRequired, 
    cancelLabel: PropType.string, 
    confirmLabel: PropType.string, 
    disabledInput: PropType.bool.isRequired,
    footerPosition: PropType.string,
}

ModalBody.defaultProps = {
    modalSize: 'lg',
    footerPosition: 'center',
    confirmLabel: 'Si',
    cancelLabel: 'Cancelar',
    closeConfirm: true
}

export default ModalBody;