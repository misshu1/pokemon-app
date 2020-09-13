import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 100%;
    }

    .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 80rem;
        height: 100%;
        margin: 0 auto;
    }
`;