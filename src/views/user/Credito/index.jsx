import React, { useState } from 'react'
import Consulta from './Consulta'
import Solicitacoes from './Solicitacoes'

const  Index = () =>  {
  const [ view, setView ] = useState('solicitacao')

  const handleView = async (e) => await setView(e)

  return (
    <div className="content">
      {view === 'consulta' ? 
      <Consulta  handleView={handleView}/> : 
      <Solicitacoes handleView={handleView} />}
    </div>
  )
}
export default Index