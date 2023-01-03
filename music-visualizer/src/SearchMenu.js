import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SongItem from './SongItem';
import axios from 'axios';
import useError from './useError';

export default function SearchMenu({searchOpen, iconSize, songs, onUpload, updateSongsFromServer, soundFile}){
    const {addError} = useError(2000);
    
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
            let msg = {
                data: `File ${soundFile.name} uploaded`,
                type: 'info'
            };
            addError(msg);
            updateSongsFromServer();
        }).catch( res => {
            console.log(res);
            let msg = {
                data: `Error uploading: ${res.message}`,
                type: 'error'
            };
            addError(msg);
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