import Switch from 'components/Switch';
import React from 'react';

import { Container } from './styles';

function Fonogramas(props) {
  return (
    <Container>
    {props.fonogramas.length > 0 ? props.fonogramas.map( fonograma => 
      <div className="my-3">
        <div className="header">
            <p>cód Ecad {fonograma.codEcad}</p>
            <Switch>
              Confirmo participação
            </Switch>
          </div>
        <ul>
          <li><b>Título:</b> {fonograma.titulo} </li>
          <li><b>Interprete:</b> {fonograma.interprete} </li>
          <li><b>Competencia:</b> {fonograma.competencia} </li>
          <li><b>Faixa:</b> {fonograma.faixa}</li>
          <li><b>Motivo:</b> {fonograma.motivo} </li>
          <li><b>Execução:</b> {fonograma.execucao} </li>
          <li><b>Autores:</b> {fonograma.autores} </li>
        </ul>
      </div>
    ) : 
      <div className="my-3">
        <p>Nenhum fonograma encontrado</p>
      </div>
    }
    </Container>
  );
}

export default Fonogramas;