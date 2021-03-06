import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .scroll-custom {
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;

      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: transparent;
    }
  }

  .bg-green {
    background-color: #0FBB00;
    color: white;
  }
`;

