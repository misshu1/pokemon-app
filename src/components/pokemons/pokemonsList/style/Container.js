import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 20rem);
    grid-gap: 20px;
    width: 80rem;
    margin: 0 auto;
`;
