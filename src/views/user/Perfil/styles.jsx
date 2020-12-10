import styled from 'styled-components';

export const Container = styled.div`
  background: #262626;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  height: 90vh;
  padding: 5rem;

  form {
    max-width: 560px;
    margin: auto;
  }

  .row {
    margin-bottom: 1.5rem;
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

  input[type=text], [type=email], [type=password], [type=tel] {
    height: 59px;
    color: #A5A5A5;

    background: #2C2C2C;
    border: 1px solid #949494;
    box-sizing: border-box;
    border-radius: 4px;
  }
  
  textarea {
    min-height: 59px;
    color: #A5A5A5;
    padding: 1rem;

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
