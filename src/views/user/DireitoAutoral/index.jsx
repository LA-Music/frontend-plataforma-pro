import React from 'react';
import { Link } from 'react-router-dom'
import { Container } from './styles';
import rocket from 'assets/img/rocket.svg'

function Index() {
  return (
    <div className="content">
      <Container className="row">
        <div className="col-12 col-xl-6 text-xl-left d-flex d-xl-inline flex-column justify-content-start align-xl-items-left px-3 px-lg-5">
          <h3 >Tem alguma dúvida sobre direito autoral ou treta para resolver? </h3>
          <Link to="/contato">Fale com a gente</Link>
        </div> 
        <div className="col-12 col-xl-6">
         <img src={rocket} alt="Rocket" />
        </div>
      </Container>
    </div>
  );
}

export default Index;