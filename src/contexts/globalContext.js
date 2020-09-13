import React, { createContext, useContext, useMemo, useState } from 'react';

const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('');

    const updateSearchInput = (val) => {
        setSearchInput(val.toLowerCase());
    };

    const globalValues = useMemo(() => {
        return { updateSearchInput, searchInput };
    }, [searchInput]);

    return (
        <GlobalContext.Provider value={globalValues}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
