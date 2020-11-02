import { createStore } from 'redux'

const INITIAL_STATE = {
  data: { type: 'Login' },
  info:{
    type: '',
    typeSolicitacao: 'kanban'
  },
  Login:{
    inputs:[
      { label: 'Endereço de e-mail:', 
        type: 'text', 
        name: 'email', 
        placeholder: 'luiz@lamusic.com.br' },
      { label: 'Senha:', 
        type: 'password', 
        name: 'senha', 
        placeholder: '*******' }
    ]},
  Recover: {
    inputs:[
      { label: 'Seu e-mail:',  
        type: 'email', 
        name: 'email', 
        placeholder: 'luiz@lamusic.com.br'}
      ]},
    Register: {
      inputs:[
        { label: 'Endereço de e-mail:', 
          type: 'email', 
          name: 'email', 
          placeholder: 'luiz@lamusic.com.br', 
          required: true },
        { label: 'Seu nome completo:', 
          type: 'text', 
          name: 'nome', 
          placeholder: '', 
          required: true }, 
        { label: 'CPF:', 
          type: 'text', 
          name: 'cpf',
          placeholder: '', 
          mask: true,
          required: true },
        { label: 'Número de telefone:', 
          type: 'tel', 
          name: 'telefone',
          mask: true, 
          placeholder: '(00) 0 0000-0000', 
          required: true  },
        { label: 'Senha:', 
          type: 'password', 
          name: 'senha', 
          placeholder: '******', 
          required: true }
      ]},
};

function form(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'TYPE_FORM': {
      return { ...state, data:{...state.data, type: action.payload}}
    }
      case 'SET_INFO' : {
        return { ...state , info:{...state.info, ...action.payload}}
      }
    default:
      return state;
  }
}

const store = createStore(form);

export default store;