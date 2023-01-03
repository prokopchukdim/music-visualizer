import React, {useEffect} from 'react';
import useError from './useError';

export default function ErrorOverlay(){
    const {errors} = useError(2000);
    return (
        <div className='error-overlay'>
          {/* <p className={"alert error"}>Test alert</p> */}
          {errors.map((error) => <p key={error.__id} className={error.type === "error" ? "alert error" : "alert"}>{error.data}</p>)}
        </div>
    );
}
