import { useContext } from "react";
import { ErrorContext } from "./ErrorHandler";

function useError(timeout) {
    const {errors, addError: originalAddError, dropError} = useContext(ErrorContext);

    function addError(error) {
        originalAddError(error);
        let realTimeout = error.timeout ?? timeout; //Can set custom timeouts with error
        if (realTimeout > 0){
            setTimeout(() => dropError(error), realTimeout);
        }
    }
    return {errors, addError};
}

export default useError;