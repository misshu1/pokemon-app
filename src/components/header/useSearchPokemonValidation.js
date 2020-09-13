import { useEffect, useState } from 'react';

import { useGlobalContext } from '../../contexts/globalContext';
import useDebounce from '../../hooks/useDebounce';
import validationRules from './validationRules';

const useSearchPokemonValidation = (initialState) => {
    const [isSubmitting, setSubmitting] = useState(null);
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const debouncedValues = useDebounce(values, 500);
    const { updateSearchInput, searchInput } = useGlobalContext();

    useEffect(() => {
        if (searchInput === '') {
            setValues((previousValues) => ({
                ...previousValues,
                pokemonName: '',
            }));
        }
    }, [searchInput]);

    const handleChange = (e) => {
        e.persist();
        setValues((previousValues) => ({
            ...previousValues,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle errors
    useEffect(() => {
        if (debouncedValues) {
            Object.keys(debouncedValues).map((val) => {
                const validationErrors = validationRules({
                    [val]: debouncedValues[val],
                });

                setErrors((prevState) => ({
                    ...prevState,
                    [val]: validationErrors[val],
                }));

                return undefined;
            });
        }
    }, [debouncedValues]);

    const handleBlur = (e) => {
        e.persist();
        const inputName = e.target.name;
        const validationErrors = validationRules(values);
        if (!errors[inputName]) {
            setErrors((prevState) => ({
                ...prevState,
                [inputName]: validationErrors[inputName],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validationRules(values);
        setErrors(validationErrors);
        setSubmitting(true);

        if (!errors.pokemonName) {
            updateSearchInput(values.pokemonName);
            setSubmitting(false);
        } else {
            updateSearchInput('');
            setSubmitting(false);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleBlur,
    };
};

export default useSearchPokemonValidation;
