import styled from 'styled-components'
import { FormControlLabel, FilledInput } from '@material-ui/core'

export const Container = styled.div`
  background: #262626;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);

  padding: 5rem;
  
  form {
    max-width: 560px;
    margin: auto;
  }

  small {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    margin-top: 10px;
    color: #A5A5A5;
  }

  h1 {
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;

    color: #FFFFFF;

  }

  label {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    color: #FFFFFF;
  }

  input[type=text]{
    height: 59px;

    background: #2C2C2C;
    border: 1px solid #949494;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .submit {
    width: 100%;
    height: 59px;

    background: #0FBB00;
    border-radius: 4px;
    
    &:hover {
      background: #0FBB00 !important;
      border-radius: 4px;
      opacity: 0.8;
    }
  }
`;

export const RadioInput = styled(FormControlLabel)`
  width: 100%;
  color: #A5A5A5;
  .MuiButtonBase-root{
    color: #A5A5A5 !important;
  }
`;

export const InputButtom = styled(FilledInput)`
  background-color: #2C2C2C !important;
  height: 59px;
  border: 1px solid #949494;
  border-radius: 4px;
  input{
    height: 100%;
    font-family: 'AvenirRegular';
    color: #A5A5A5;
    padding: 0rem 1rem;
    border-right: none !important;
  }
`;

export const TagLabel = styled.span`
  height: 30px;
  color: #A5A5A5;
  background: #2C2C2C;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
`;

export const CloseTag = styled.span`
  cursor: pointer;
  color: #ffffff;
  margin-left: 1rem;
`;

export const ButtonConsulta = styled.button`
  width: 184px;
  height: 40px;

  color: black;
  background: #C4C4C4;
  
  border-radius: 31px;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

export const SpanCheck = styled.span`
  color: #fff;
  font-weight: 400;
  a{
    color: #fff;
    text-decoration: underline;
  }
`;