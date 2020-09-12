import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import bg from '../../assets/images/nature_lake_sunset.png';

export const GlobalStyle = createGlobalStyle`
${normalize}

* {
    box-sizing: border-box;
}

html {
    height: 100%;
    font-size: 16px;
}

body {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    position: relative;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: url(${bg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #d6d8de;
}

#root {
    width: 100%;
    min-height: fit-content;
    flex: 1;
}

#footer {
    margin-top: 2rem;
}

#modal {
    z-index: 200;
    position: relative;
    user-select: none;
}
`;
