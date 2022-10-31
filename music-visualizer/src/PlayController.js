import React from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export default function PlayController(props) {
    const onClick = () => {
        props.togglePlay();
    }
    const SIZE = 50;

    return (
    <div onClick={onClick} >
        {props.toPlay ? <PauseCircleIcon sx={{ fontSize: SIZE }}/> : <PlayCircleIcon sx={{ fontSize: SIZE }}/>}
    </div>     
   );
}
