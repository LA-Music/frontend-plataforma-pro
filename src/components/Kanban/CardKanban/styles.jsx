import styled from 'styled-components';

export const Badge = styled.div`
  background-color:  #C4C4C4;
  color: #000;
  width: 118px;

  border-radius: 28px;
  padding: 0.2rem;
  text-align: center;
  
`;

export const Limit = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 14px;

  margin-right: 1.5rem;
  color: ${props => props.color};
`;