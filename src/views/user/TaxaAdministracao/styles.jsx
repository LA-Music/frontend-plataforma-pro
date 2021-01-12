import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #E9D6BB;
  /* height: 80vh; */

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 183px;
    height: 45px;

    font-size: 14px;

    color: #fff;
    background: #743035;
    border-radius: 83px;

    margin-bottom: 1.5rem;

    @media(min-width: 500px) {
      width: 230px;
      height: 59px;

      font-size: 16px;
    }
    
    &:hover {
      text-decoration: none;
      background: #743035;
      opacity: 0.8;
    }
  }

  h3 {
    font-weight: bold;
    font-size: 21px;
    line-height: 32px;

    color: #C27D6F;

    @media(min-width: 500px) {
      font-size: 23px;
      line-height: 35px;
    }

    @media (min-width: 1180px) {
      font-size: 25px;
      line-height: 40px;
    }
  }

  img {
    max-width: 80%;
    display: block;
    margin: auto;

    @media(min-width:500px) {
      max-width: 50%;
    }

    @media(min-width: 1180px) {
      max-width: 100%
    }
  }

`;
