import React from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import useError from './useError';

export default function PlayController(props) {
    const onClick = () => {
        props.togglePlay();
        if (!props.isUploaded){
            let msg = {
                data: 'Please drag in or choose a file to play',
                type: 'info'
            };
            addError(msg);
        }
    }
    const {addError} = useError(2000);
    
    const SIZE = 50;

    return (
    <div onClick={onClick} className='pause-play-icon'>
        {props.toPlay ? <PauseCircleIcon sx={{ fontSize: SIZE }}/> : <PlayCircleIcon sx={{ fontSize: SIZE }}/>}
    </div>     
   );
}
