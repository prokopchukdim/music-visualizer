import React from 'react';
import MusicNote from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SongItem({name}){
    let iconSize = 100;
    return (
        <div className='song-item'>
            <MusicNote className='song-item-icon' sx = {{fontSize:iconSize}}></MusicNote>
            <p>{name}</p>
            <DownloadIcon className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DownloadIcon>
            <DeleteIcon className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DeleteIcon>
        </div>
    );
}