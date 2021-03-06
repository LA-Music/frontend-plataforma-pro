import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    p {
      margin-bottom: 0;
    }
  }

  > div {
    border-bottom: 1px solid #dee2e6;
    width: 100%;
    
    ul {
      margin-top: 16px;
      width: 100% !important;
      list-style: none;
      

      li {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 8px;
        
        color: #000000;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        text-transform: capitalize;

        &:first-child {
          margin-bottom: 16px;
        }

        b {
          font-size: 14px;
          color: #66615B;
          margin-right: 8px;
        }
      }
    }
  }
`;
