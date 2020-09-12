import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useCallback, useEffect, useState } from 'react';

import { useNotificationsContext } from '../../../contexts/notificationsContext';
import PokemonApp from '../pokemon/PokemonApp';
import { Container } from './style';

const useStyles = makeStyles({
    paginationUl: {
        justifyContent: 'center',
    },
    paginationRoot: {
        margin: '2rem 0',
    },
});

const ITEMS_ON_PAGE = 20;

const PokemonsListApp = () => {
    const [pokemonsNames, setPokemonsNames] = useState(null);
    const [pokemons, setPokemons] = useState(null);
    const [totalPokemons, setTotalPokemons] = useState(null);
    const { showError } = useNotificationsContext();
    const classes = useStyles();

    const pokemonPageUrl = useCallback((offset = 0) => {
        return `${process.env.REACT_APP_POKEMON_BASE_API}/pokemon?limit=${ITEMS_ON_PAGE}&offset=${offset}`;
    }, []);

    useEffect(() => {
        getPokemons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPokemonsInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonsNames]);

    const getTotalPages = () => {
        if (!totalPokemons) {
            return;
        }

        const totalPages = totalPokemons / ITEMS_ON_PAGE;
        return +totalPages.toFixed(0);
    };

    const handlePageChange = (e, pageNum) => {
        const offset = pageNum * ITEMS_ON_PAGE - ITEMS_ON_PAGE;
        const url = pokemonPageUrl(offset);

        getPokemons(url);
    };

    const getPokemons = async (url = pokemonPageUrl()) => {
        setPokemonsNames([]);

        try {
            const data = await fetch(url);
            const dataJson = await data.json();

            setTotalPokemons(dataJson.count);
            const names = dataJson.results.map((pokemon) => {
                return pokemon.name;
            });

            setPokemonsNames(names);
        } catch (err) {
            showError(
                'Error',
                'Failed to get the f**king pokemons from the database!',
                500
            );
        }
    };

    const getPokemonsInfo = async () => {
        if (!pokemonsNames) {
            return;
        }

        const promisesArray = pokemonsNames.map(async (pokemon) => {
            return fetch(
                `${process.env.REACT_APP_POKEMON_BASE_API}/pokemon/${pokemon}`
            ).then((data) => data.json());
        });

        const settledPokemons = await Promise.allSettled(promisesArray);

        settledPokemons
            .filter((item) => item.status === 'rejected')
            .map((err) =>
                showError(
                    'Error',
                    `Failed to get pokemon information: ${err.reason.message}!`,
                    500
                )
            );

        const dbPokemons = settledPokemons
            .filter((item) => item.status === 'fulfilled')
            .map((item) => item.value);

        setPokemons(dbPokemons);
    };

    return (
        <>
            <Container>
                {pokemons &&
                    pokemons.map((pokemon) => {
                        return (
                            <PokemonApp key={pokemon.id} pokemon={pokemon} />
                        );
                    })}
            </Container>
            <Pagination
                count={getTotalPages()}
                variant='outlined'
                shape='rounded'
                classes={{
                    ul: classes.paginationUl,
                    root: classes.paginationRoot,
                }}
                onChange={handlePageChange}
            />
        </>
    );
};

export default PokemonsListApp;
