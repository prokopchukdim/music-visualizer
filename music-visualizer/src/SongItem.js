import React from 'react';
import MusicNote from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import App from './App';
import useError from './useError';

export default function SongItem({name, onUpload, updateSongsFromServer, iconSize}){
    // let iconSize = 100;
    const {addError} = useError(2000);

    const getFile = () => {
        axios({
            url: "http://127.0.0.1:8080/getFile/?filename=" + name,
            method: 'GET',
            responseType: 'blob'
        }).then( res => {
            res.data.name = name;
            onUpload(res.data);
            let msg = {
                data: `File ${name} downloaded`,
                type: 'info'
            };
            addError(msg);
        }).catch( res => {
            let msg = {
                data: `Error downloading: ${res.message}`,
                type: 'error'
            };
            addError(msg);
        });
    }

    const deleteFile = () => {
        axios({
            url: "http://127.0.0.1:8080/deleteFile/?filename=" + name,
            method: 'DELETE'
        }).then( res => {
            let msg = {
                data: `File ${name} deleted`,
                type: 'info'
            };
            
            updateSongsFromServer();
            addError(msg);
        }).catch( res => {
            let msg = {
                data: `Error deleting: ${res.message}`,
                type: 'error'
            };
            addError(msg);
        });
    }

    return (
        <div className='song-item'>
            <MusicNote className='song-item-icon' sx = {{fontSize: iconSize * 2.2}}></MusicNote>
            <p>{name}</p>
            <DownloadIcon onClick={getFile} className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DownloadIcon>
            <DeleteIcon onClick = {deleteFile} className='song-item-action-icon' style = {{transition: 'all 0.1s ease-in-out'}}></DeleteIcon>
        </div>
    );
}