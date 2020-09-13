import styled from 'styled-components';

export const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    background: #16192e;
    padding: 2rem;
    box-shadow: 0px 0px 10px -2px #202020;
    border-radius: 0.5rem;

    h2 {
        text-transform: capitalize;
        text-align: center;
        margin: 0 0 4rem 0;
    }

    p {
        line-height: 1.4;
    }

    .carousel-container {
        display: flex;
        flex-wrap: wrap;

        .carousel {
            max-width: 52rem;
            width: 100%;
            margin: 0 auto 2rem auto;
        }
    }

    .pokemon-type {
        display: inline-block;
        padding: 0.25rem 0.4rem;
        margin: 0 0.3rem;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        background: #009bce;
        color: #fff;
        user-select: none;
    }
`;
