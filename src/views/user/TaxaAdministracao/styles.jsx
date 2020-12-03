import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 230px;
    height: 59px;

    font-size: 16px;

    color: #fff;
    background: #0FBB00;
    border-radius: 4px;
    
    &:hover {
      text-decoration: none;
      background: #0FBB00 !important;
      border-radius: 4px;
      opacity: 0.8;
    }
  }

`;
