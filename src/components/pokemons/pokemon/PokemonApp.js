import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from './style';

const PokemonApp = ({ pokemon }) => {
    const navigate = useNavigate();
    const image =
        pokemon.sprites.front_default || 'https://via.placeholder.com/300';

    return (
        <Container
            image={image}
            onClick={() => navigate(`/pokemon-details/${pokemon.name}`)}
        >
            <div className='image' />
            <h3 className='title'>{pokemon.name}</h3>
        </Container>
    );
};

export default PokemonApp;
