import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SongItem from './SongItem'

export default function SearchMenu({searchOpen, iconSize}){

    
    let songNames = ['song 1.mp3', 'song 2.wav', 'song 3.mp3', 'Never gonna give you up.mp3'];
    let songNum = songNames.length;
    return (
        <div className = {searchOpen ? "search-menu show" : "search-menu hide"}>
            <div className='search-wrapper'>
                <p>Upload current song to song repository:</p>
                <CloudUploadIcon className = "cloud-upload-icon" sx = {{fontSize: iconSize}} style = {{transition: 'transform 0.1s ease-in-out'}}></CloudUploadIcon>
                <p>{songNum} available songs:</p>
                <div className='song-container'>
                    {songNames.map( (song) => {
                        return <SongItem name={song}></SongItem>;
                    })}
                </div>
            </div>
        </div>
    );
};