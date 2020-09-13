import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 18rem));
    grid-template-rows: repeat(auto-fit, minmax(10rem, 18rem));
    grid-auto-rows: minmax(10rem, 18rem);
    justify-content: center;
    grid-gap: 20px;
    max-width: 80rem;
    margin: 0 auto;
`;
