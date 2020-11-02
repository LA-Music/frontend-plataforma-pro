import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { MoreItems } from './styles'

const DynamicTable = ({header, body, limitItems, moreItems, viewModal }) => {

  const [ showItems, setItems ] = useState(limitItems)

  function createRow(){
    var data = []
    let itemsLength = showItems || body.length
    
    for (let a = 0; a < itemsLength; a++) {
      var row =[]
      for (let b = 0; b < header.length; b++) {
        row.push(
            <td>{body[a][header[b].key]}</td>
        )
      }
      viewModal ? data.push(<tr onClick={() => viewModal(body[a])}>{row}</tr>) : data.push(<tr>{row}</tr>)
      
    }
    return data
  }

  return (
    <>
      <Table borderless>
        <thead>
          <tr>
            {header.map((hd) => (
              <th key={hd.key}>{hd.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createRow()}
        </tbody>
      </Table>
      {limitItems && showItems < body.length && (
        <div className="d-flex align-items-center justify-content-center">
          <MoreItems onClick={() => setItems(showItems + moreItems)} style={{cursor: 'pointer'}}>Mostrar mais</MoreItems>
        </div>
      )}
    </>
  )
}

export default DynamicTable