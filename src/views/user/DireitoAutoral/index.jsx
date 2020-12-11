import React from 'react';
import { Link } from 'react-router-dom'
import { Container } from './styles';
import rocket from 'assets/img/rocket.svg'

function Index() {
  return (
    <div className="content">
      <Container>
        <div style={{width: '500px'}}>
          <Link to="/contato">Aguarde o lançamento</Link>
          <h3 >Para maiores informações ou para contratar entre em contato. </h3>
        </div> 
        <img src={rocket} alt="Rocket" />
      </Container>
    </div>
  );
}

export default Index;