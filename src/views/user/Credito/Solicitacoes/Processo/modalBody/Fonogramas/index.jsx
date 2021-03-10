import Switch from 'components/Switch';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItems } from '../ListItems';

import { Container } from './styles';

function Fonogramas(props) {
  const { fonograma } = useSelector(state => state);
  
  const dispatch = useDispatch();

  function handleSelect(obj, fono) {
    
    if (fonograma[obj].includes(fono._id)) {
      fonograma[obj] = fonograma[obj].filter(id_obra => id_obra !== fono._id);
    } else {
      fonograma[obj] = [...fonograma[obj], fono._id]
    }

    dispatch({type: 'SET_FONOGRAMA', payload: { all: props.fonogramas, [obj]:[ ...fonograma[obj] ] }})
  }


  return (
    <Container>
      {props.fonogramas.length > 0 
        ? props.fonogramas.map( fonograma => 
          <div className="my-3">
            <div className="header">
              
              {fonograma.status === 'desativado' && (
                <Switch onChange={() => handleSelect('parte', fonograma)}>
                  Confirmo participação
                </Switch>
              )}

              {fonograma.status === 'ativado' && ( 
                <Switch onChange={() => handleSelect('contratar', fonograma)}>
                  Contratar
                </Switch>
              )}
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