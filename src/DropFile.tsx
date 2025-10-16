import './DropFile.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Snackbar } from '@mui/material';
import { processFile } from './utils/processFile'
import { error } from './utils/error'
import { getThumbnail } from './utils/getThumbnail';
import axiosInstance from './config/axios-config';
import { AxiosError } from 'axios';

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
            console.log('Error with the file');
            setSnackbar({
                open: true,
                message: error(2),
                severity: 'error',
            });
        }
    }
    const handleButtonPost = async () => {
        try {
            const response = await axiosInstance.get("/status");
            console.log('Response:', response.data);
            setSnackbar({open: true, message: 'Petición exitosa!', severity: 'success'});
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('AxiosError details:')
                setSnackbar({open: true, message: error.message,severity: 'error'});
            } else {
                console.error('Unexpected error type:', error);
                setSnackbar({
                    open: true, message: 'Error desconocido', severity: 'error'});
            }
        }
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
                    handleDrop(e.target.files!);
                    e.target.value = '';
                }} />
                {file ? (
                    <>
                        <div id="img-view" className='success'>
                            <div id="img-thumb">
                                <img id="thumbnail" alt="video thumbnail" src={thumbnail} />
                            </div>
                            <div id="file-info">
                                <div id="info">
                                    <p><strong>Name:</strong> {file?.name}</p>
                                    <p><strong>Size:</strong> {file?.size} bytes</p>
                                    <p><strong>Type:</strong> {file?.type}</p>
                                </div>
                                <div id="post">
                                    <Button id="send-button" endIcon={<SendIcon />}
                                        onClick={handleButtonPost}
                                    >POST</Button>
                                </div>
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
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Alert
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    </>;
}


export default DropFile;