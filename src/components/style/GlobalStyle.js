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
    margin-top: 6rem;
}

#header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    z-index: 10000;
    background: #16192e;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, 
        rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, 
        rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
}

#footer {
    margin-top: 2rem;
    height: 15rem;
    background: #16192e;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 4px -1px,
        rgba(0, 0, 0, 0.14) 0px -4px 5px 0px,
        rgba(0, 0, 0, 0.12) 0px -1px 10px 0px;
}

#modal {
    z-index: 200;
    position: relative;
    user-select: none;
}
`;
