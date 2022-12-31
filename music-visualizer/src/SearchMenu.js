import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SongItem from './SongItem';

export default function SearchMenu({searchOpen, iconSize, songs, onUpload, updateSongsFromServer}){
    let songNum = songs.length;
    return (
        <div className = {searchOpen ? "search-menu show" : "search-menu hide"}>
            <div className='search-wrapper'>
                <p>Upload current song to song repository:</p>
                <CloudUploadIcon className = "cloud-upload-icon" sx = {{fontSize: iconSize}} style = {{transition: 'transform 0.1s ease-in-out'}}></CloudUploadIcon>
                <p>{songNum} available songs:</p>
                <div className='song-container'>
                    {songs.map( (song) => {
                        return <SongItem key={song} name={song} onUpload = {onUpload} updateSongsFromServer={updateSongsFromServer}></SongItem>;
                    })}
                </div>
            </div>
        </div>
    );
};