import './DropFile.css'
//import cloudUploadImage from './assets/cloud_upload.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Snackbar } from '@mui/material';
import { processFile } from './utils/processFile'
import { error } from './utils/error'
import { getThumbnail } from './utils/getThumbnail';

import React, { useState } from 'react'

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'error' | 'success' | 'warning' | 'info';
}

interface DropFileProps {
    maxSize: number;
    dataUnit?: 'MB' | 'GB'; // Optional prop with a default value
}

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
}

function DropFile({ maxSize, dataUnit = 'MB' }: DropFileProps) {
    const [thumbnail, setThumbnail] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'info',
    });

    const handleDrop = async (e: FileList) => {
        const file_ = e?.[0];
        // if file is null is false
        if (file_) {
            const processedFile = processFile(file_, maxSize, dataUnit);
            if (typeof processedFile === 'string') {
                setSnackbar({
                    open: true,
                    message: processedFile,
                    severity: 'error',
                });
            } else {
                console.log('File processed successfully:');
                setThumbnail(await getThumbnail(file_));
                setFile(processedFile);
                // Post file to server
            }
        }
        // error: problem with the file, try again
        else {
            setSnackbar({
                open: true,
                message: error(2),
                severity: 'error',
            });
        }

        // Cambio en el estilo del drop-area
    }
    return <>
        <div id="dropfile-container">
            <label htmlFor="input-file" id="drop-area" onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
                e.preventDefault();
                e.stopPropagation();
                handleDrop(e.dataTransfer.files)
            }}
                onDragOver={handleDragOver}>
                <input id="input-file" type="file" accept="video/*" hidden onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDrop(e.target.files!)
                }} />
                {file ? (
                    <>
                        <div id="img-view" className='success'>
                            <div id="img-thumb">
                                <img id="thumbnail" alt="video thumbnail" src={thumbnail} />
                            </div>
                            <div id="file-info">
                                <p><strong>Name:</strong> {file?.name}</p>
                                <p><strong>Size:</strong> {file?.size} bytes</p>
                                <p><strong>Type:</strong> {file?.type}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div id="img-view">
                            <CloudUploadIcon sx={{ fontSize: 150, color: 'white' }} />
                            <p>Drag and drop or click here to upload image</p>
                            <span>Max size {maxSize} {dataUnit}</span>
                        </div>
                    </>
                )}
            </label>
            <div id='notification-order'>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={10000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
                </Snackbar>
            </div>
        </div>
    </>;
}


export default DropFile;