import React from 'react';
import MusicNote from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import useError from './useError';

export default function SongItem({name, onUpload, updateSongsFromServer, iconSize}){
    // let iconSize = 100;
    const {addError} = useError(2000);

    const getFile = () => {
        axios({
            url: process.env.REACT_APP_API_ROOT + "getFile/?filename=" + name,
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
                data: `Error downloading: Status ${res.response.status} (${res.response.data})`,
                type: 'error'
            };
            addError(msg);
        });
    }

    const deleteFile = () => {
        axios({
            url: process.env.REACT_APP_API_ROOT + "deleteFile/?filename=" + name,
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
                data: `Error deleting: Status ${res.response.status} (${res.response.data})`,
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