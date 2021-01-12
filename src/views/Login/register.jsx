import React, { useState } from 'react' 
import { register as apiRegister } from 'services/endpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'assets/css/Login.css'
import {
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
  } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { phoneMask, cpfMask } from 'components/Mask';
import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Register = (props) => {
    const { Register } = useSelector(s=> s);

    const dispatch = useDispatch();
    
    const [ state, setState ] = useState({ email: '', telefone: '', nome: '', nome_empresa: '', senha: '', error: '', papel: 'pro'}) 

    const [ loading, setLoading ] = useState(false)

    function handleChange (e) {
      const { name, value } = e.target
      name === 'telefone' && setState({...state, [name]: phoneMask(value) })
      name === 'cpf' && setState({...state, [name]: cpfMask(value) })
    }

    async function confirm() {
      setState({...state, error: ''})
    }
    
    async function handleRegister (e) {
        e.preventDefault();
        
        await setLoading(true)
        
        const { email, senha, nome, telefone } = state;
        if (!email || !senha || !nome || !telefone ) {
          
          await setState({...state, error: "Por favor, preencha os dados corretamente!" });
          await setLoading(false)

          return false
        } else {
          try {
              await apiRegister({ ...state })
              .then(r => {
                if (r.statusText.toLowerCase() === 'ok') {
                  window.location.hash = ''
                  setLoading(false)
                  dispatch({type: 'TYPE_FORM', payload: 'Login'})
                }
              })
              .catch(function(err){
                if(err.response && err.response.status === 500){
                  setLoading(false)
                  setState({...state, error:err.response.data.message})
                }
              })
            } catch (err) {
              setLoading(false)
              setState({...state,
              error:
                  "Houve um erro, tente novamente"
              });
          }
        }
    }
  return (
        <Dcard className="card-user px-0 px-md-3">
          <CardHeader>
            <TitleCard tag="h5">Criar uma conta</TitleCard>
          </CardHeader>
          <CardBody>
            <Form autoComplete="off" onSubmit={handleRegister}>
              
              {Register.inputs.map((input, index) => 
                <Row key={index}>
                  <Col>
                    <FormGroup>
                      <Label>{input.label}</Label>
                      <InpText
                        autoComplete={input.autoComplete}
                        placeholder={input.placeholder}
                        type={input.type}
                        value={state[input.name]}
                        name={input.name}
                        required={input.required}
                        onChange={e => input.mask ? handleChange(e) : setState({...state, [e.target.name]: e.target.value }) } />
                    </FormGroup>
                  </Col>
                </Row>
              )}
              <Row style={{marginBottom: '1rem'}}>
                <Col style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Link onClick={() => dispatch({type: 'TYPE_FORM', payload: 'Login'})}>Já tenho uma conta</Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <BtLogin type="submit">{!loading ? 'Criar conta' : 'Carregando ...' }</BtLogin>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <Modal isOpen={state.error} >
              <ModalHeader>Atenção!</ModalHeader>
              <ModalBody>
              {state.error}
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={confirm} >Ok</Button>{' '}
              </ModalFooter>
            </Modal>
        </Dcard>
  );
}

export default Register;