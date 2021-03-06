import styled from 'styled-components'
import { Card, Button, CardTitle, Input } from 'reactstrap';

export const Container = styled.div`
  margin: 0;
  height: 90%;
`;

export const Header = styled.div`
  padding: 1rem;
  height: 15%;

  img {
    width: 200px;
    max-width: 80%;
  }
`;

export const Dcard = styled(Card)`
  border-radius: 0px;
  width: 90%;
  max-width: 520px;
  padding: 1rem;
`;

export const Link = styled.span`
  cursor: pointer;
  color: #949494;
  padding: 0;
  font-weight: 600;
`;

export const InpText = styled(Input)`
  padding-left: 1rem !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  border: 1px solid #949494 !important;
  border-radius: 4px !important;
  background-color: #ffffffff !important;
  color: #949494 !important;
`;

export const BtLogin = styled(Button)`
  display: block;
  width: 100%;
  
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #0FBB00;
  
  color: #ffffff;
  text-transform: capitalize;
  font-weight: 600;

  &:hover{
    background-color: #0FBB00 !important;
    opacity: 0.8;
  }
`;

export const Label = styled.label`
  color: #000000 !important;
  font-size: 1rem !important;
  font-weight: 600;
`;

export const TitleCard = styled(CardTitle)`
  color: #000000;
  font-size: 1.625rem;
  font-weight: bold;
`;
