import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../contexts/globalContext';
import { Container } from './style';

const PokemonApp = ({ pokemon }) => {
    const { updateSearchInput } = useGlobalContext();
    const navigate = useNavigate();
    const image =
        pokemon.sprites.front_default || 'https://via.placeholder.com/300';

    const handleClick = () => {
        updateSearchInput('');
        navigate(`/pokemon-details/${pokemon.name}`);
    };

    return (
        <Container image={image} onClick={handleClick}>
            <div className='image' />
            <h3 className='title'>{pokemon.name}</h3>
        </Container>
    );
};

export default PokemonApp;
