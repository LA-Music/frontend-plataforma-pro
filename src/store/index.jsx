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
        autoComplete: 'new-email',
        placeholder: 'luiz@lamusic.com.br' },
      { label: 'Senha:', 
        type: 'password', 
        name: 'senha', 
        autoComplete: 'new-password',
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
          required: true,
          autoComplete: 'new-email' },
        { label: 'Nome do responsável de contato:', 
          type: 'text', 
          name: 'nome', 
          placeholder: '', 
          required: true,
          autoComplete: 'new-nome' }, 
        { label: 'Nome da Editora:', 
          type: 'text', 
          name: 'nome_empresa',
          placeholder: '', 
          required: true,
          autoComplete: 'new-empresa' },
        { label: 'Telefone do contato:', 
          type: 'tel', 
          name: 'telefone',
          mask: true, 
          placeholder: '(00) 0 0000-0000', 
          required: true,
          autoComplete: 'new-phone'  },
        { label: 'Senha:', 
          type: 'password', 
          name: 'senha', 
          placeholder: '******', 
          required: true,
          autoComplete: 'new-password' }
      ]},

    settings: {
      nome: '',
      email: '',
      id: '',
      papel: '',
      expired: false,
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
      console.log(action)
      return {...state, settings: {...state.settings, ...action.payload}}
    }
    default:
      return state;
  }
}

const store = createStore(form);

export default store;