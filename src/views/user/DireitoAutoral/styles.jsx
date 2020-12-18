import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #E9D6BB;
  
  padding: 3rem;
  height: 80vh;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 230px;
    height: 59px;

    font-size: 16px;

    color: #fff;
    background: #743035;
    border-radius: 83px;

    margin-bottom: 1.5rem;
    
    &:hover {
      text-decoration: none;
      background: #743035;
      opacity: 0.8;
    }
  }

  h3 {
    font-weight: bold;
    line-height: 48px;

    color: #C27D6F;
  }

  img {
    display: block;
    margin: auto;
    max-width: 80%;
  }

`;
