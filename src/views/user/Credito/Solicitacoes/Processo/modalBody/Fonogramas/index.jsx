import Switch from 'components/Switch';
import React from 'react';
import { ListItems } from '../ListItems';

import { Container } from './styles';

function Fonogramas(props) {
  return (
    <Container>
      {props.fonogramas.length > 0 
        ? props.fonogramas.map( fonograma => 
          <div className="my-3">
            <div className="header">
              <Switch>
                Confirmo participação
              </Switch>
            </div>

            <ul>
              <ListItems
                title="Cód Ecad"
                description={fonograma.codEcad}
              />

              <ListItems
                title="Título"
                description={fonograma.titulo}
              />
              
              <ListItems
                title="Interprete"
                description={fonograma.interprete}
              />

              <ListItems
                title="Competencia"
                description={fonograma.competencia}
              />

              <ListItems
                title="Faixa"
                description={fonograma.faixa}
              />
            
              <ListItems
                title="Motivo"
                description={fonograma.motivo}
              />

              <ListItems
                title="Execução"
                description={fonograma.execucao}
              />

              <ListItems
                title="Autores"
                description={fonograma.autores}
              />

            </ul>
          </div>
        ) : 
        <div className="my-3">
          <p>Nenhum fonograma encontrado</p>
        </div>
      }
    </Container>
  );
}

export default Fonogramas;