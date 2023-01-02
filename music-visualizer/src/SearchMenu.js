import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SongItem from './SongItem';
import axios from 'axios';

export default function SearchMenu({searchOpen, iconSize, songs, onUpload, updateSongsFromServer, soundFile}){
    const uploadFile = () => {
        let formData = new FormData();
        formData.append("file", soundFile);
        formData.append("name", soundFile.name);

        axios({
            url: "http://127.0.0.1:8080/uploadFile/",
            method: 'POST',
            data: formData,
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }).then( res => {
            console.log(`File ${soundFile.name} uploaded to server`);
            updateSongsFromServer();
        });
    }

    let songNum = songs.length;
    return (
        <div className = {searchOpen ? "search-menu show" : "search-menu hide"}>
            <div className='search-wrapper'>
                <p>Upload current song to song repository:</p>
                <CloudUploadIcon onClick={uploadFile} className = "cloud-upload-icon" sx = {{fontSize: iconSize}} style = {{transition: 'transform 0.1s ease-in-out'}}></CloudUploadIcon>
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