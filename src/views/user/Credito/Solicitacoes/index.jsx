import React, { useState, useEffect } from 'react'
import DynamicTable from 'components/Table';
import api from 'services/api'
import { TableContainer, ButtonConsulta } from './styles';

export default function Index(props) {
  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)

  const [Table, setTable] = useState({
    header:[
      { name: 'Nome',           key: 'name'       }, 
      { name: 'CPF',            key: 'cpf'        }, 
      { name: 'Nome da banda',  key: 'nameBanda'  },
      { name: 'Músicas',        key: 'music'      },
      { name: 'Etapa',          key: 'step'       },
      { name: 'Status',         key: 'status'     },
    ],
    body:[]
  })
  
  const handleToggle = e => {
    setToggle(!toggle)
    setSelectRow(e)
  }

  useEffect(() => {
    api.get("/processo").then( async res =>{
        if (res.data.length > 0 ) {
          let body = []
          res.data.map( async process => 
            body.push({name: process.email, cpf: '-', nameBanda: process.nome, music: '-', step: '-', status: process.status})
          )
          await setTable({...Table, body: body })
        }
    })

  }, []) //eslint-disable-line

  return (
    <div className="content">

      <TableContainer>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h2 className="m-0">Solicitações</h2>  <ButtonConsulta onClick={() => props.handleView('consulta')}>Nova Consulta</ButtonConsulta>
        </div>
        {Table.body.length > 0 && 
          <DynamicTable viewModal={e => handleToggle(e)} moreItems={5} limitItems={10} {...Table} />
        }
      </TableContainer>
    </div>
  )
}
