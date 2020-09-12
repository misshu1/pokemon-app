import styled from 'styled-components';

export const Container = styled.div`
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;

    .carousel__master-spinner-container {
        background: inherit;
    }

    .slide-image {
        width: 100%;
        height: 100%;
        background-color: #1b274d;
        background-position: center center;
        background-size: cover;
    }

    .no-images {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 0;
        transform: translate(-50%, -50%);
    }

    @media only screen and (min-width: 450px) {
        padding: 0.5rem;
    }
`;
