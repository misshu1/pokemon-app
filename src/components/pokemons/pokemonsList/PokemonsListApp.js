import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useCallback, useEffect, useState } from 'react';

import { useNotificationsContext } from '../../../contexts/notificationsContext';
import SpinnerApp from '../../common/SpinnerApp';
import PokemonApp from '../pokemon/PokemonApp';
import { Container } from './style';

const useStyles = makeStyles({
    paginationUl: {
        justifyContent: 'center',
    },
    paginationRoot: {
        margin: '2rem 0',
        color: '#d6d8de !important',

        '& button': {
            border: '1px solid #d6d8de ',
            color: '#d6d8de ',
        },

        '& div': {
            color: '#d6d8de ',
        },

        '& .Mui-selected': {
            backgroundColor: '#009bce',
            color: '#fff',
            border: '1px solid #fff',
        },
    },
});

const ITEMS_ON_PAGE = 20;

const PokemonsListApp = () => {
    const [pokemonsNames, setPokemonsNames] = useState(null);
    const [pokemons, setPokemons] = useState(null);
    const [totalPokemons, setTotalPokemons] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
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

        if (currentPage !== pageNum) {
            setCurrentPage(pageNum);
            getPokemons(url);
        }
    };

    const getPokemons = async (url = pokemonPageUrl()) => {
        setPokemonsNames([]);
        setIsLoading(true);

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

        if (dbPokemons.length !== 0) {
            setIsLoading(false);
        }

        setPokemons(dbPokemons);
    };

    const renderSpinners = () => {
        let spinners = [];

        for (let i = 0; i < ITEMS_ON_PAGE; i++) {
            spinners = [
                ...spinners,
                <div key={i} style={{ background: '#16192e' }}>
                    <SpinnerApp />
                </div>,
            ];
        }

        return spinners;
    };

    return (
        <>
            <Pagination
                count={getTotalPages()}
                variant='outlined'
                shape='rounded'
                classes={{
                    ul: classes.paginationUl,
                    root: classes.paginationRoot,
                }}
                onChange={handlePageChange}
                page={currentPage}
            />

            <Container>
                {!isLoading &&
                    pokemons.map((pokemon) => {
                        return (
                            <PokemonApp key={pokemon.id} pokemon={pokemon} />
                        );
                    })}
                {isLoading && renderSpinners()}
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
                page={currentPage}
            />
        </>
    );
};

export default PokemonsListApp;
