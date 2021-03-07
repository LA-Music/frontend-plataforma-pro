import Switch from 'components/Switch';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItems } from '../ListItems';

import { Container } from './styles';

function Fonogramas(props) {
  const { fonograma } = useSelector(state => state);
  
  const dispatch = useDispatch();

  function handleSelect(obj, id) {
    
    if (fonograma[obj].includes(id)) {
      fonograma[obj] = fonograma[obj].filter(id_obra => id_obra !== id);
    } else {
      fonograma[obj] = [...fonograma[obj], id]
    }

    dispatch({type: 'SET_FONOGRAMA', payload: { [obj]:[ ...fonograma[obj] ] }})
  }


  return (
    <Container>
      {props.fonogramas.length > 0 
        ? props.fonogramas.map( fonograma => 
          <div className="my-3">
            <div className="header">
              <Switch onChange={() => handleSelect('parte', fonograma._id)}>
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