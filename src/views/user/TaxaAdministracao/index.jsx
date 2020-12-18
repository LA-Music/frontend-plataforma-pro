import React from 'react';
import { Link } from 'react-router-dom'
import rocket from 'assets/img/rocket.svg'
import { Container } from './styles';

function Index() {
  return (
    <div className="content">
      <Container className="row p-3 p-xl-5">
        <div className="col-12 col-xl-6 text-xl-left d-flex d-xl-inline flex-column justify-content-start align-xl-items-left px-3 px-lg-5">
          <Link to="/contato">Fale com a gente</Link>
          <h3>Trabalhamos com taxa de administração autoral de liberação de retidos negociável.</h3>
          <h3 style={{color: '#743035'}}> Podemos administrar o seu catálogo.
          </h3>
        </div>
        <div className="col-12 col-xl-6">
         <img src={rocket} alt="Rocket" />
        </div>
      </Container>
    </div>
  );
}

export default Index;