import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Container } from './styles'

const DynamicTable = ({header, body, limitItems, moreItems, viewModal, selectPerfil }) => {

  const [ showItems, setItems ] = useState(limitItems)

  function createRow(){
    var data = []
    let itemsLength = showItems || body.length
    
    for (let a = 0; a < itemsLength; a++) {
      var row =[]
      for (let b = 0; b < header.length; b++) {
        body[a] &&
            row.push(
              <td>{body[a][header[b].key]}</td>
            )
      }
      viewModal ? data.push(<tr>{row}</tr>) :
      selectPerfil ? data.push(<tr>{row}</tr>) : data.push(<tr>{row}</tr>)
    }
    return data
  }

  return (
    <Container>
      <Table borderless hover>
        <thead>
          <tr>
            {header.map((hd) => (
              <th className={hd.key === 'action' ? 'text-center' : ''}  key={hd.key}>{hd.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createRow()}
        </tbody>
      </Table>
      {/* {limitItems && showItems < body.length && (
        <div className="d-flex align-items-center justify-content-center">
          <MoreItems onClick={() => setItems(showItems + moreItems)} style={{cursor: 'pointer'}}>Mostrar mais</MoreItems>
        </div>
      )} */}
    </Container>
  )
}

export default DynamicTable