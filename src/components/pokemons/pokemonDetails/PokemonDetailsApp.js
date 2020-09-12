import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNotificationsContext } from '../../../contexts/notificationsContext';
import { Container } from './style';

const PokemonDetailsApp = () => {
    const { showError, showWarning } = useNotificationsContext();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        let isCanceled = false;

        const getPokemonDetails = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_POKEMON_BASE_API}/pokemon/${name}`
                );
                const dataJson = await data.json();

                if (!isCanceled) {
                    setPokemonDetails(dataJson);
                } else {
                    showWarning(
                        'Request Canceled',
                        'Seems like you canceled the request!',
                        418
                    );
                }
            } catch (err) {
                showError(
                    'Error',
                    'Failed to get pokemon details from the database!',
                    500
                );
            }
        };

        getPokemonDetails();
        return () => {
            isCanceled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Container>something here</Container>
        </>
    );
};

export default PokemonDetailsApp;
