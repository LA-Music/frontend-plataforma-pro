import React from 'react';
import { Link } from 'react-router-dom'
import rocket from 'assets/img/rocket.svg'
import { Container } from './styles';

function Index() {
  return (
    <div className="content">
      <Container>
        <div style={{width: '500px'}}>
          <Link to="/contato">Aguarde o lançamento</Link>
          <h3>Taxa para administração autoral e liberação de créditos retidos negociável</h3>
          <h3 style={{color:'#743036'}}>Para maiores informações ou para contratar entre em contato </h3>
        </div>
        <img src={rocket} alt="Rocket" />
      </Container>
    </div>
  );
}

export default Index;