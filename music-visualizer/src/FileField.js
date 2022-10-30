import React from 'react';
import PropTypes from 'prop-types';
import UploadIcon from '@mui/icons-material/Upload';
import MusicNote from '@mui/icons-material/MusicNote'

export default function FileField({onUpload}) {
    const drop = React.useRef(null);
    const [isUploaded, setUploaded] = React.useState(false);
    const [isDragedOver, setDragedOver] = React.useState(false);

    React.useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('dragleave', handleDragStop);
        drop.current.addEventListener('dragend', handleDragStop);
        drop.current.addEventListener('drop', handleDrop);

        return () => {
            drop.current.removeEventListener('dragover', handleDragOver);
            drop.current.removeEventListener('drop', handleDrop);
        };
    }, []);

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
            { !isUploaded ? <UploadIcon sx={{ fontSize: 90 }} className="upload-icon" ></UploadIcon> : <MusicNote sx={{ fontSize: 90 }} className="upload-icon"></MusicNote>}
        </div>
        
    );
};

FileField.propTypes = {
    onUpload: PropTypes.func.isRequired,
};