import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from 'components/Switch';

import { Container } from './styles';
import { ListItems } from '../ListItems';


function Obras(props) {
  const { obras } = useSelector(state => state);
  
  const dispatch = useDispatch();

  let isValidated = true

  function handleSelect(obj, id) {
    
    if (obras[obj].includes(id)) {
      obras[obj] = obras[obj].filter(id_obra => id_obra !== id);
    } else {
      obras[obj] = [...obras[obj], id]
    }

    dispatch({type: 'SET_OBRAS', payload: { [obj]:[ ...obras[obj] ] }})
  }

  return (
    <Container>
      {props.obras.length > 0 ? props.obras.map( obra => 
        <div className="my-3">

          <div className="header">
            {!isValidated && (
              <Switch onChange={() => handleSelect('autoria', obra._id)}>
                Minha autoria
              </Switch>
              )}

            {isValidated && ( 
              <Switch onChange={() => handleSelect('contratar', obra._id)}>
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