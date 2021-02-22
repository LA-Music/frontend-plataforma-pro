import React, { useState, useEffect } from 'react';
import DynamicTable from 'components/Table';
import api from 'services/api'
import { DadosCadastrais } from './modalBody';
import { Load } from 'components/PreLoad'

import { validToken, ErrorSystem } from 'utils'

import { BtnEngage } from './styles';

function Processo({perfil}) {
  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleToggle = e => {
    setToggle(!toggle)
    !toggle === true && setSelectRow(e)
  }

  const [Table, setTable] = useState({
    header:[
      { name: 'Nome',        key: 'nome'             }, 
      { name: 'Email',       key: 'email'            }, 
      { name: 'Associado',   key: 'associado'        },
      { name: 'Status Obra', key: 'status'           },
      { name: 'Status Fono', key: 'status_fonograma' },
      { name: 'Ação',        key: 'action'           }
    ],
    body:[]
  })

  useEffect(() => {
    getProcess()
   async function getProcess () {
      await setLoading(true)
      api.get("/processo").then( async res => {
        
        if(!res) {
          ErrorSystem()
        
          return false
        }

        await validToken(res)

        if (res.data.length > 0 ) {
          console.log(res.data)

          let body = []
          res.data.map( async process => 
            process.nome === perfil.nome && 
              body.push({
                nome: process.nome, 
                email: process.email, 
                associado: process.cadastro_Abrammus ? 'Sim' : 'Não', 
                action: (
                  <div className="d-flex justify-content-center">
                    <BtnEngage onClick={() => handleToggle(process)}>Ver</BtnEngage>
                  </div>
                ),
                ...process
            })
            )
            
          await setTable({...Table, body: body })
          await setLoading(false)
        }
      })
    }

  }, []) //eslint-disable-line
  return (
    !loading ?
    <>
      <DynamicTable 
        viewModal={handleToggle} 
        moreItems={5} 
        limitItems={10} 
        {...Table} />

        <DadosCadastrais show={toggle} data={selectRow} toggle={e => handleToggle(!toggle)} />
    </>
    : <Load bg={'#000'} />

  );
}

export default Processo;