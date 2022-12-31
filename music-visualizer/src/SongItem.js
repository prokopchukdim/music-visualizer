import React from 'react';
import MusicNote from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import App from './App';

export default function SongItem({name, onUpload, updateSongsFromServer}){
    let iconSize = 100;

    const getFile = () => {
        axios({
            url: "http://127.0.0.1:8080/getFile/?filename=" + name,
            method: 'GET',
            responseType: 'blob'
        }).then( res => {
            onUpload(res.data);
        });
    }

    const deleteFile = () => {
        axios({
            url: "http://127.0.0.1:8080/deleteFile/?filename=" + name,
            method: 'DELETE'
        }).then( res => {
            console.log(name, "deleted:", res.status);
            updateSongsFromServer();
        })
    }

    return (
        <div className='song-item'>
            <MusicNote className='song-item-icon' sx = {{fontSize:iconSize}}></MusicNote>
            <p>{name}</p>
            <DownloadIcon onClick={getFile} className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DownloadIcon>
            <DeleteIcon onClick = {deleteFile} className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DeleteIcon>
        </div>
    );
}