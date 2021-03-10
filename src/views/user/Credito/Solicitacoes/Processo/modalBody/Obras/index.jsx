import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from 'components/Switch';

import { Container } from './styles';
import { ListItems } from '../ListItems';


function Obras(props) {
  const { obras } = useSelector(state => state);
  
  const dispatch = useDispatch();

  function handleSelect(obj, obra) {
    
    if (obras[obj].includes(obra._id)) {
      obras[obj] = obras[obj].filter(id_obra => id_obra !== obra._id);
    } else {
      obras[obj] = [...obras[obj], obra._id]
    }
    console.log(obra.autores)

    dispatch({
      type: 'SET_OBRAS', 
      payload: {
        autores: obra.autores,
        all: props.obras, 
        [obj]:[ ...obras[obj] ] 
      }
    })
  }

  return (
    <Container>
      {props.obras.length > 0 ? props.obras.filter(obra =>  obra.status !== 'removido').map( obra => 
        <div key={obra._id} className="my-3">
          {/* {console.log(obra)} */}

          <div className="header">
            {obra.status === 'desativado' && (
              <Switch onChange={() => handleSelect('autoria', obra)}>
                Minha autoria
              </Switch>
            )}

            {obra.status === 'ativado' && ( 
              <Switch onChange={() => handleSelect('contratar', obra)}>
                Contratar
              </Switch>
            )}
          </div>

          <ul>
            <ListItems
              title="Status"
              description={obra.status}
            />

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