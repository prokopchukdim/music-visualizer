import React, { useState } from 'react';

export const ErrorContext = React.createContext({
    errors: [],
    addError: () => {},
    dropError: () => {},
});

export function ErrorContextProvider({children}) {

    const [errors, setErrors] = useState([]);
    const id = (error) => {
        return error.__id;
    };
    const addError = (error) => {
        error.__id = error.__id ?? new Date().getTime();
        setErrors((errors) => [...errors, error]);
        return id(error);
    };
    const removeError = (error) => {
        setErrors( (errors) => {
            return errors.filter((current) => id(current) !== id(error));
        });
    };

    const contextValue = {
        errors: errors,
        addError: (error) => addError(error),
        dropError: (error) => removeError(error),
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
}
