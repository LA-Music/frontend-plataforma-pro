import React from 'react';
import { Card } from 'reactstrap'
import CardKanban from './CardKanban'
import { Container, Qtd } from './styles';

function Kanban({columns, data, viewModal}) {
  const createList = (e) => {
    return data.map(dt => dt.step.indexOf(e) !== -1 && <CardKanban toggle={() => viewModal(dt)} column={e} {...dt} />)
  }

  return (
    <Container className="d-flex justify-content-between">
      {columns.map( e =>
        <Card className="p-3 mx-3" style={{width: `33.33%`}} >
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="m-0">{e}</h3>
            <div>
              <span className="mx-3">Filtro</span>
              <Qtd className="mx-3">{data.map(dt => dt.step.indexOf(e) !== -1).length}</Qtd>
            </div>
          </div>
          <div style={{height: 'auto', overflowY: 'auto'}}>
            {createList(e)}
          </div>
        </Card>
      )}
    </Container>
  )
}

export default Kanban;