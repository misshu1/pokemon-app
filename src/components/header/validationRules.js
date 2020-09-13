const validationRules = (values) => {
    let errors = {};

    // Search Pokemon Errors
    if (values.pokemonName.length !== 0 && values.pokemonName.length < 3) {
        errors.pokemonName = 'Pokemon name must have at least 3 characters!';
    } else if (!/^[a-zA-Z]*$/gi.test(values.pokemonName)) {
        errors.pokemonName = 'Invalid pokemon name!';
    }

    return errors;
};

export default validationRules;
