import React from 'react';
import PropTypes from 'prop-types';

export default function FileField({onUpload}) {
    const drop = React.useRef(null);

    React.useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);

        return () => {
            drop.current.removeEventListener('dragover', handleDragOver);
            drop.current.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const {files} = e.dataTransfer;
        if (files && files.length) {
            onUpload(files);
        }
    };

    return (
        <div className='circle' ref = {drop}/>
        
    );
};

FileField.propTypes = {
    onUpload: PropTypes.func.isRequired,
};