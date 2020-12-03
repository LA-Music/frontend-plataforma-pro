import React from 'react';
import { Link } from 'react-router-dom'
import { Container } from './styles';

function Index() {
  return (
    <div className="content">
      <Container>
        <h1>EM BREVE!</h1>
        <h3>Taxa para administração autoral e liberação de créditos retidos negociável</h3>
        <h3>Para maiores informações ou para contratar entre em contato </h3>
        <Link to="/contato">Contato</Link>
      </Container>
    </div>
  );
}

export default Index;