import './DropFile.css'
import cloudUploadImage from './assets/cloud_upload.png';
import { processFile } from './utils/processFile'
import { error } from './utils/error'

import React, { useState } from 'react'

interface DropFileProps {
    maxSize: number;
    dataUnit?: 'MB' | 'GB'; // Optional prop with a default value
}

const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    // Don't make the default stuff 
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    // if file is null is false
    if (file) processFile(file);
    else error();

    // Cambio en el estilo del drop-area
}

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
}

function DropFile({ maxSize, dataUnit = 'MB' }: DropFileProps) {
    
    return <>
        <label htmlFor="input-file" id="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
            <input id="input-file" type="file" accept="video/*" hidden />
            <div id="img-view">
                <img src={cloudUploadImage} alt="Drop it!"></img>
                <p>Drag and drop or click here to upload image</p>
                <span>Max size {maxSize} {dataUnit}</span>
            </div>
        </label>
    </>;
}


export default DropFile;