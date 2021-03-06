import React from 'react';
import Switch from 'components/Switch';

import { Container } from './styles';
import { ListItems } from '../ListItems';


function Obras(props) {
  let isValidated = true

  return (
    <Container>
      {props.obras.length > 0 ? props.obras.map( obra => 
        <div className="my-3">
          <div className="header">

            {!isValidated && (
              <Switch>
                Minha autoria
              </Switch>
              )}

            {isValidated && ( 
              <Switch>
                Contratar
              </Switch>
            )}
          </div>

          <ul>
            <ListItems
              title="Cód Ecad"
              description={obra.codEcad}
            />

            <ListItems
              title="Título"
              description={obra.titulo}
            />

            <ListItems
              title="Interprete"
              description={obra.interprete}
            />

            <ListItems
              title="Competencia"
              description={obra.competencia}
            />

            <ListItems
              title="Faixa"
              description={obra.faixa}
            />

            <ListItems
              title="Motivo"
              description={obra.motivo}
            />

            <ListItems
              title="Execução"
              description={obra.execucao}
            />

            <ListItems
              title="Autores"
              description={obra.autores}
            />
          </ul>
        </div>
      ) :  
        <div className="my-3">
          <p>Nenhuma obra encontrada</p>
        </div>
      }
    </Container>
  );
}

export default Obras;