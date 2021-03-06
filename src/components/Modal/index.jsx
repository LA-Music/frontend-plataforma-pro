import React from 'react';
import { ModalBody } from 'reactstrap';
import { ModalContainer } from './styles';

function Index({show, body, toggle}) {

  return (
    <ModalContainer 
      isOpen={show} 
      toggle={toggle} 
      className={'modCad'}
    >
      <span 
        title="Fechar" 
        className="close"
        onClick={toggle}
      >
        x
      </span>
    
      <ModalBody className="mx-3 pb-0">
        {body}
      </ModalBody>
    </ModalContainer>
    );
}

export default Index;