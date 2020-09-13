import styled, { css } from 'styled-components';

export const Form = styled.form`
    display: flex;
    justify-content: center;
    min-height: 100%;
    max-width: 20rem;

    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .error {
            display: none;
        }

        span {
            margin-bottom: 1rem;
        }

        input {
            display: block;
            height: 3rem;
            width: 100%;
            outline: none;
            background: transparent;
            color: #d6d8de;
            border: 1px solid #545c91;
            border-radius: 0.3em;
            padding: 0.5rem;
            margin-bottom: 0.2rem;
        }

        input:hover {
            box-shadow: 0 0 0 1px #545c91;
            border: 1px solid #545c91;
        }

        input:focus {
            box-shadow: 0 0 0 1px #4fafe8;
            border: 1px solid #4fafe8;
            input:hover {
                border: 1px solid #4fafe8;
            }
        }

        ${(props) =>
            props?.errors?.pokemonName &&
            css`
                input,
                input:hover,
                input:focus {
                    box-shadow: 0 0 0 1px red;
                    border: 1px solid red;
                }

                .error {
                    position: absolute;
                    top: 100%;
                    display: block;
                    text-align: center;
                    font-weight: 900;
                    color: red;
                    margin: 0;
                    min-height: 1.5rem;
                    background: #16192e;
                    padding: 0.5rem;
                }
            `}
    }
`;
