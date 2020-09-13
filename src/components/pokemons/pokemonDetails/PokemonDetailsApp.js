import { CarouselProvider } from 'pure-react-carousel';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNotificationsContext } from '../../../contexts/notificationsContext';
import CarouselApp from './carousel/CarouselApp';
import { Container } from './style';

const PokemonDetailsApp = () => {
    const { showError, showWarning } = useNotificationsContext();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [pokemonImages, setPokemonImages] = useState([]);
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
                    const dbImages = Object.values(dataJson.sprites)
                        .filter(
                            (item) => item !== null && typeof item === 'string'
                        )
                        .map((item) => {
                            return item;
                        });

                    dbImages.length === 0 && setPokemonImages(['none']);
                    dbImages.length !== 0 && setPokemonImages(dbImages);

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

    useEffect(() => {
        let isCanceled = false;

        const getPokemonDescription = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_POKEMON_BASE_API}/pokemon-species/${name}`
                );
                const dataJson = await data.json();

                if (!isCanceled) {
                    const dbDescription = dataJson.flavor_text_entries
                        .filter((item) => item.language.name === 'en')
                        .map((item) => item.flavor_text);

                    const description = new Set(dbDescription);

                    setPokemonDescription(description);
                } else {
                    showWarning(
                        'Request Canceled',
                        'Seems like you canceled the request!',
                        418
                    );
                }
            } catch (err) {
                setPokemonDescription('No description found.');
                showError(
                    'Error',
                    'Failed to get pokemon description from the database!',
                    500
                );
            }
        };

        getPokemonDescription();
        return () => {
            isCanceled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderPokemonTypes = () => {
        if (!pokemonDetails) {
            return;
        }

        return pokemonDetails.types.map((item, index) => (
            <span key={index} className='pokemon-type'>
                {item.type.name}
            </span>
        ));
    };

    const renderStats = () => {
        if (!pokemonDetails) {
            return;
        }

        return pokemonDetails.stats.map((item, index) => (
            <li key={index}>{item.stat.name}</li>
        ));
    };

    return (
        <>
            <Container>
                <h2>
                    {pokemonDetails?.name}
                    {renderPokemonTypes()}
                </h2>

                <div className='carousel-container'>
                    <CarouselProvider
                        naturalSlideWidth={16}
                        naturalSlideHeight={9}
                        totalSlides={pokemonImages.length}
                        hasMasterSpinner
                        dragEnabled={false}
                    >
                        <CarouselApp images={pokemonImages} />
                    </CarouselProvider>
                </div>

                <h3>Description</h3>
                <p>{pokemonDescription}</p>

                <h3>Stats</h3>
                <ul>{renderStats()}</ul>
            </Container>
        </>
    );
};

export default PokemonDetailsApp;
