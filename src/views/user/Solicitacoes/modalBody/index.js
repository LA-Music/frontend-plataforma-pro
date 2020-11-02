import React from 'react';
import { Input } from 'reactstrap';
import Modal from 'components/Modal';

const ViewDadosCadastrais = ({data}) => {

  return (
    <>
      <div className="row">
        <div className="w-100 mx-2 mb-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Dados Cadastrais</h5>
          <span>02/07/2020 18:30</span>
        </div>
        <div className="col-6">
          <label htmlFor="">Nome</label>
          <p>{data.name}</p>
        </div>
        <div className="col-6">
          <label htmlFor="">CPF</label>
          <p>{data.cpf}</p>
        </div>
        <div className="col-6">
          <label htmlFor="">E-mail</label>
          <p>{data.email}</p>
        </div>
        <div className="col-6">
          <label htmlFor="">Produto</label>
          <p>{data.product}</p>
        </div>
        <div className="col-6">
          <label htmlFor="">Telefone</label>
          <p>(31) 1232-2232</p>
        </div>
      </div>
      <div className="row mx-0 my-3 p-3 align-items-center" style={{backgroundColor: '#F1F1F1'}}>
        <div className="col-6">
          <div>
            <label htmlFor="">Etapa</label>
            <p>{data.step}</p>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <select name="" id="">
            <option value="">{data.status}</option>
          </select>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-6">
          <label htmlFor="">Nome da banda</label>
          <p>Back</p>
        </div>
        <div className="col-6">
          <label htmlFor="">Filiação Associação</label>
          <p>ABRAMUS</p>
        </div>
        <div className="col-6">
          <label htmlFor="">Redes Sociais</label>
          <p>@sda</p>
        </div>
        <div className="col-6">
          <label htmlFor="">Música</label>
          <p>I Want it that Way</p>
        </div>
        <div className="col-6">
          <label htmlFor=""></label>
          <p></p>
        </div>
        <div className="col-6">
          <label htmlFor="">EvedyBody</label>
          <p>HeyHoo</p>
        </div>
        <div className="col-12">
          <label htmlFor="">Observações</label>
          <Input type="textarea" name="text" id="exampleText" />
        </div>
      </div>
    </>
  )
}

export const DadosCadastrais = ({show, data, toggle}) => {

  return <Modal show={show} body={<ViewDadosCadastrais data={data} />} toggle={toggle} />

}
