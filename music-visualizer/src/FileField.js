import React from 'react';
import PropTypes from 'prop-types';
import UploadIcon from '@mui/icons-material/Upload';
import MusicNote from '@mui/icons-material/MusicNote';

export default function FileField({onUpload}) {
    const drop = React.useRef(null);
    const [isUploaded, setUploaded] = React.useState(false);
    const [isDragedOver, setDragedOver] = React.useState(false);
    const [iconSize, setIconSize] = React.useState(window.innerWidth <= 600 ? 45 : 90);

    React.useEffect(() => {
        let dRef = drop.current;
        dRef.addEventListener('dragover', handleDragOver);
        dRef.addEventListener('dragleave', handleDragStop);
        dRef.addEventListener('dragend', handleDragStop);
        dRef.addEventListener('drop', handleDrop);
        window.addEventListener('resize', handleResize);

        return () => {
            dRef.removeEventListener('dragover', handleDragOver);
            dRef.removeEventListener('drop', handleDrop);
            dRef.removeEventListener('dragend', handleDragStop);
            dRef.removeEventListener('dragleave', handleDragStop);
            window.removeEventListener('resize', handleResize);
        };
    });

    const handleResize = () => {
        
        if (window.innerWidth <= 600) {
            setIconSize(45);
        }
        else{
            setIconSize(90);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragedOver(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragedOver(false);
        
        const {files} = e.dataTransfer;
        if (files && files.length) {
            setUploaded(true);
            onUpload(files);
        }
    };

    const handleDragStop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragedOver(false);
    };

    return (
        <div className={`circle ${isDragedOver ? 'circle-hover' : ''}`} ref = {drop}>
            { !isUploaded ? <UploadIcon sx={{fontSize: iconSize}} className="upload-icon" ></UploadIcon> : <MusicNote sx={{fontSize: iconSize}} className="upload-icon"></MusicNote>}
        </div>
        
    );
};

FileField.propTypes = {
    onUpload: PropTypes.func.isRequired,
};