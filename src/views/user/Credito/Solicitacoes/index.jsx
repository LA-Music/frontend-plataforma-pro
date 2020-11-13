import React, { useState } from 'react'
import DynamicTable from 'components/Table';
import { TableContainer, ButtonConsulta } from './styles';

export default function Index(props) {
  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)

  const TableSolicitations = ({
    header:[
      { name: 'Nome',           key: 'name'       }, 
      { name: 'CPF',            key: 'cpf'        }, 
      { name: 'Nome da banda',  key: 'nameBanda'  },
      { name: 'Músicas',        key: 'music'      },
      { name: 'Etapa',          key: 'step'       },
      { name: 'Status',         key: 'status'     },
    ],
    body:[
      { name: 'Dakota Rice',     cpf: '26.05.20', nameBanda: 'Registrada', music: 'Liberação de Créditos', step: 'Finalizado', status: 'Negado' }, 
      { name: 'Minerva Hooper',  cpf: '20.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Doris Greene',    cpf: '15.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Andamento', status: 'Negado' },
      { name: 'Jon Porter',      cpf: '04.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Dakota Rice',     cpf: '26.05.20', nameBanda: 'Registrada', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
      { name: 'Minerva Hooper',  cpf: '20.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Doris Greene',    cpf: '15.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Jon Porter',      cpf: '04.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Dakota Rice',     cpf: '26.05.20', nameBanda: 'Registrada', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
      { name: 'Minerva Hooper',  cpf: '20.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Doris Greene',    cpf: '15.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Jon Porter',      cpf: '04.05.20', nameBanda: 'Em analise', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
      { name: 'Dakota Rice',     cpf: '26.05.20', nameBanda: 'Registrada', music: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    ]
  })
  
  const handleToggle = e => {
    setToggle(!toggle)
    setSelectRow(e)
  }

  return (
    <div className="content">

      <TableContainer>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h2 className="m-0">Solicitações</h2>  <ButtonConsulta onClick={() => props.handleView('consulta')}>Nova Consulta</ButtonConsulta>
        </div>
        <DynamicTable viewModal={e => handleToggle(e)} moreItems={5} limitItems={10} {...TableSolicitations} />
      </TableContainer>
    </div>
  )
}
