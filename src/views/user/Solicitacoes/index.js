import React, { useState } from 'react';
import DynamicTable from 'components/Table';
import Kanban from 'components/Kanban';
import { TableContainer } from './styles';
import { DadosCadastrais } from './modalBody';
import { useSelector } from 'react-redux';

const TableSolicitations = ({
  header:[
    { name: 'Nome',     key: 'name'     }, 
    { name: 'CPF',      key: 'cpf'      }, 
    { name: 'E-mail',   key: 'email'    },
    { name: 'Produto',  key: 'product'  },
    { name: 'Etapa',    key: 'step'     },
    { name: 'Status',   key: 'status'   },
  ],
  body:[
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Finalizado', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Andamento', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Dakota Rice',     cpf: '26.05.20', email: 'Registrada', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' }, 
    { name: 'Minerva Hooper',  cpf: '20.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Doris Greene',    cpf: '15.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
    { name: 'Jon Porter',      cpf: '04.05.20', email: 'Em analise', product: 'Liberação de Créditos', step: 'Aguardando Retorno', status: 'Negado' },
  ]
})

const columnKanban = ['Aguardando', 'Andamento', 'Finalizado']


function Solicitacoes(props) {
  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)
  const { typeSolicitacao } = useSelector(state => state.info)

  const handleToggle = e => {
    setToggle(!toggle)
    setSelectRow(e)
  }

  return (
    <div className="content">
      {typeSolicitacao === 'list' && (
        <>
          <TableContainer>
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h2 className="m-0">Solicitações</h2> <span>Últimos 6 meses</span>
            </div>
            <DynamicTable viewModal={e => handleToggle(e)} moreItems={5} limitItems={10} {...TableSolicitations} />
          </TableContainer>
        </>
      )}
      {typeSolicitacao === 'kanban' && (
        <Kanban viewModal={e => handleToggle(e)} columns={columnKanban} data={TableSolicitations.body} />
        )}
        <DadosCadastrais show={toggle} data={selectRow} toggle={e => handleToggle(!toggle)} />
    </div>
    );
}

export default Solicitacoes;