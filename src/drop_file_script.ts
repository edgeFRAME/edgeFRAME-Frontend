export function setupDropFile() {
  // const dropArea = document.getElementById('drop-area') as HTMLLabelElement
  const inputFile = document.getElementById('input-file') as HTMLInputElement
  // const imgView = document.getElementById('img-view') as HTMLDivElement

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
  }
}

