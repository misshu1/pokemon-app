import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    max-height: fit-content;
    min-height: 15rem;
    background: #16192e;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 4px -1px,
        rgba(0, 0, 0, 0.14) 0px -4px 5px 0px,
        rgba(0, 0, 0, 0.12) 0px -1px 10px 0px;

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        max-width: 80rem;
        height: 100%;
        margin: 0 auto;
        padding: 1rem;
    }
`;
