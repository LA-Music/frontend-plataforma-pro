import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Container } from './styles'

const DynamicTable = ({header, body, viewModal, selectPerfil }) => {

  const [ rows, setRows ] = useState({initRows: 0, endRows: 10})
  const [ perPage ] = useState(10);

  function createRow(){
    var data = []
    
    const {initRows, endRows} = rows;

    for (let a = initRows; a < endRows; a++) {
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

  function handlePage (action) {
    switch (action) {
      case 'next':
        setRows({
                ...rows,
                initRows: (rows.initRows + perPage),
                endRows: (rows.endRows + perPage)
        })
          
        break;
      case 'prev': 
          setRows({
              ...rows,
              initRows: (rows.initRows - perPage),
              endRows: (rows.endRows - perPage)
          })

        break;
      default:
        break;
    }
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
      
      <div className="table-footer d-flex align-items-center justify-content-end">
        <div>
          { rows.initRows+1 } - { rows.endRows > body.length ? body.length : rows.endRows } de {body.length}
        </div>

        <div>
          <button
            disabled={rows.initRows <= 0} 
            onClick={() => handlePage('prev')}
          > 
            &#8592;
          </button>

          <button
            disabled={rows.endRows >= body.length} 
            onClick={() => handlePage('next')}
          >
            &#8594;
          </button>
        </div>
      </div>
    </Container>
  )
}

export default DynamicTable