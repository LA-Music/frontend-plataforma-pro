import React from 'react';
import { Link } from 'react-router-dom'
import { Container } from './styles';
import rocket from 'assets/img/rocket.svg'

function Index() {
  return (
    <div className="content">
      <Container className="row" >
        <div className="col-12" >
          <Link to="/contato">Fale com a gente</Link>
          <h3>Sempre que uma música é executada nas plataformas digitais é gerada receita de direito autoral fonomecânico.<br /> 
            São centavos que multiplicados por milhares de execuções, podem gerar uma fonte de receita extra considerável.<br />
            Se seus artistas ainda não estão recebendo o valor arrecado, nós podemos resolver isso pra você. 
          </h3>
          <h3 style={{color:'#743036'}}>
          Somos filiados à Abramus Digital e podemos administrar a coleta dos seus direitos.
          </h3>
        </div>
        <div className="col-12">
          <img src={rocket} alt="Rocket" />
        </div>
      </Container>
    </div>
  );
}

export default Index;