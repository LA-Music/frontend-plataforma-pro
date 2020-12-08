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
        { label: 'Nome do responsável de contato:', 
          type: 'text', 
          name: 'nome', 
          placeholder: '', 
          required: true }, 
        { label: 'Nome da Editora:', 
          type: 'text', 
          name: 'nome_empresa',
          placeholder: '', 
          required: true },
        { label: 'Telefone do contato:', 
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

    settings: {
      nome: '',
      email: '',
      id: '',
      papel: ''
    }
};

function form(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'TYPE_FORM': {
      return { ...state, data:{...state.data, type: action.payload}}
    }
    case 'SET_INFO' : {
      return { ...state , info:{...state.info, ...action.payload}}
    }
    case 'SET_SETTINGS': {
      return {...state, settings: {...state.settings, ...action.payload}}
    }
    default:
      return state;
  }
}

const store = createStore(form);

export default store;