export function setupDropFile() {
  // const dropArea = document.getElementById('drop-area') as HTMLLabelElement
  const inputFile = document.getElementById('input-file') as HTMLInputElement
  const imgView = document.getElementById('upload') as HTMLDivElement

  inputFile.addEventListener('change', handleFileSelect)

  function handleFileSelect( ) {
    const file = inputFile.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    // We can change the 200MB limit as the server needs it
    if (file.size > 200 * 1024 * 1024) {
      alert('File size exceeds 200MB limit.');
      return;
    }
    // Debug: show the file name
    console.log('Selected file: ', file.name);
    console.log('File size (bytes): ', file.size)
    console.log('File type: ', file.type)
    
    imgView.innerHTML = `
      <div id="file-info">
        <div id="thumb">
          <p>🎬 Generando thumbnail...</p>
        </div>
        <div id="file-details">
          <p><strong>Name:</strong> ${file.name}</p>
          <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p><strong>Type:</strong> ${file.type}</p>
        </div>
      </div>
    `;
    
    // Generar thumbnail (función asíncrona)
    extractVideoThumbnail(file, (thumbnailURL) => {
      imgView.innerHTML = `
        <div id="file-info">
          <div id="thumb">
            <img src="${thumbnailURL}" style="max-width: 100%; max-height: 200px; border-radius: 8px;"/>
          </div>
          <div id="file-details">
            <p><strong>Name:</strong> ${file.name}</p>
            <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Type:</strong> ${file.type}</p>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Seleccionar otro video</button>
          </div>
        </div>
      `;
    });
  }
}

function extractVideoThumbnail(file: File, callback: (thumbnailURL: string) => void) {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.muted = true;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Wait until metadata is loaded
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    video.currentTime = Math.min(1, video.duration / 2);
  });

  video.addEventListener('seeked', () => {
    if (context) {
      // will draw the video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert canvas to data URL (base64)
      const thumbnailURL = canvas.toDataURL('image/jpeg', 0.8);
      
      // Limpiar memoria
      URL.revokeObjectURL(video.src);
      
      // Llamar al callback con el resultado
      callback(thumbnailURL);
    } else {
      console.error('Could not get canvas context');
    }
  });

  // Importante: cargar el video
  video.load();
}