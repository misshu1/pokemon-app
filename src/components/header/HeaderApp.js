import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoIcon from '../../assets/icons/LogoIcon';
import { useGlobalContext } from '../../contexts/globalContext';
import { Container, Form } from './style';
import useSearchPokemonValidation from './useSearchPokemonValidation';

const useStyles = makeStyles(() => ({
    submitButton: {
        background: '#009bce',
        height: '2rem',
        width: '2rem',
        fontSize: '1.2rem',
        padding: 0,
        color: '#fff',
        margin: 'auto 0 auto .5rem',

        '&:disabled': {
            backgroundColor: '#009bce !important',
            filter: 'grayscale(1)',
            color: '#d6d8de',
        },
        '&:hover': {
            backgroundColor: '#0668c9',
        },
    },
}));

const INITIAL_STATE = {
    pokemonName: '',
};

const HeaderApp = () => {
    const { updateSearchInput } = useGlobalContext();
    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useSearchPokemonValidation(INITIAL_STATE);
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const handleLogoClick = () => {
        updateSearchInput('');
        navigate('/');
    };

    return ReactDOM.createPortal(
        <Container>
            <div className='content'>
                <div className='logo-container' onClick={handleLogoClick}>
                    <LogoIcon width='3rem' height='3rem' />
                </div>

                <div className='form-container'>
                    {location.pathname === '/' && (
                        <Form
                            autoComplete='off'
                            onSubmit={(e) => handleSubmit(e)}
                            errors={errors}
                        >
                            <label>
                                <input
                                    value={values.pokemonName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='pokemonName'
                                    type='pokemonName'
                                    id='pokemonName'
                                    placeholder={'Pokemon name'}
                                />
                                <p className='error'>{errors.pokemonName}</p>
                            </label>
                            <IconButton
                                aria-label='search'
                                disabled={isSubmitting || !!errors.pokemonName}
                                classes={{ root: classes.submitButton }}
                                type='submit'
                            >
                                <FontAwesomeIcon
                                    icon='search'
                                    className='icon'
                                />
                            </IconButton>
                        </Form>
                    )}
                </div>
            </div>
        </Container>,
        document.getElementById('header')
    );
};

export default HeaderApp;
