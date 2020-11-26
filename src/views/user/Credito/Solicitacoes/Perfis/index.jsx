import React, { useEffect, useState } from 'react';
import DynamicTable from 'components/Table';
import api from 'services/api'
import { shortten, joinObras } from '../actions'
// import { Container } from './styles';

function Perfis({ selectPerfil }) {

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

  useEffect(() => {
    api.get("/processo").then( async res =>{
      if (res.data.length > 0 ) {
        var arrPerfil = res.data.map(item=>{
            return [item.nome,item]
        }); 
        var mapPerfil = new Map(arrPerfil); 
        var perfil = [...mapPerfil.values()];
        
        let body = []
        perfil.map( async process => 
          body.push({
            name: process.nome, 
            email: process.email, 
            tipo: process.tipo, 
            cpf: '-', 
            nameBanda: process.nome, 
            allMusic: process.obras, 
            music: shortten(joinObras(process.obras)), 
            step: '-', 
            status: process.status})
        )
        await setTable({...Table, body: body })
      }
    })

  }, []) //eslint-disable-line

  return (
    Table.body.length > 0 && 
      <DynamicTable 
        selectPerfil={selectPerfil}
        moreItems={5} 
        limitItems={10} 
        {...Table} />
  )
}

export default Perfis;