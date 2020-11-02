import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
// import { Container } from './styles';

function Index({show, body, toggle}) {

  return (
    <Modal isOpen={show} toggle={toggle} className={'modCad'}>
      <ModalBody className="mx-3">
        {body}
      </ModalBody>
    </Modal>
    );
}

export default Index;