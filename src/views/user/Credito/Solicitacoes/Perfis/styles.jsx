import styled from 'styled-components';
import { ButtonGroup } from 'reactstrap'

export const BtnEngage = styled(ButtonGroup)`
  button {
    height: 40px;
    min-width: 100px;
    padding: 0 1rem;

    margin: 0 5px;
    display: flex;
    align-items: center;
    
    justify-content: center;

    color: black;
    background: transparent;

    &:hover {
      color: black !important; 
      background: #C4C4C4 !important;
    }
  }
  border-radius: 4px;
  border: 1px solid #C4C4C4;
`;
