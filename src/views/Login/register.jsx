import React, { useState } from 'react' 
import { register as apiRegister } from 'services/endpoint'
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
    const [ state, setState ] = useState({ email: '', telefone: '', nome: '', cpf: '', senha: '', error: ''}) 

    function handleChange (e) {
      const { name, value } = e.target
      name === 'telefone' && setState({...state, [name]: phoneMask(value) })
      name === 'cpf' && setState({...state, [name]: cpfMask(value) })
    }
    
    async function handleRegister (e) {
        e.preventDefault();
        const { email, senha, nome, cpf, telefone } = state;
        if (!email || !senha || !nome || !cpf || !telefone ) {
          setState({...state, error: "Por favor, preencha os dados corretamente!" });
          return false
        } else {
          try {
              await apiRegister({ ...state })
              .then(r => r.statusText.toLowerCase() === 'ok' &&  dispatch({type: 'TYPE_FORM', payload: 'Login'}))
              .catch(function(err){
                if(err.response.status === 500){
                  setState({...state, error:err.response.data.message})
                }
              })
            } catch (err) {
              setState({...state,
              error:
                  "Houve um problema com o login, verifique suas credenciais. T.T"
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
              {state.error && <p>{state.error}</p>}
              {Register.inputs.map((input, index) => 
                <Row key={index}>
                  <Col>
                    <FormGroup>
                      <Label>{input.label}</Label>
                      <InpText
                        autoComplete="email"
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
                  <BtLogin type="submit">Criar conta</BtLogin>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Dcard>
  );
}

export default Register;