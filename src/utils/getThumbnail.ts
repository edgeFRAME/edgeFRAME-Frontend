/*
1. Llamas: getThumbnail(file)
   ↓
2. Se crea una Promise (estado: "pendiente")
   ↓
3. Se empieza a cargar el video
   ↓
4. getThumbnail retorna INMEDIATAMENTE la Promise (aún pendiente)
   ↓
5. Tu código puede hacer: await getThumbnail(file)
   ↓
6. [Esperando...] El video se carga en segundo plano
   ↓
7. Se dispara 'loadedmetadata'
   ↓
8. Se cambia video.currentTime
   ↓
9. [Esperando...] El video busca esa posición
   ↓
10. Se dispara 'seeked'
    ↓
11. Se captura el frame y genera imgUrl
    ↓
12. Se llama resolve(imgUrl)
    ↓
13. La Promise cambia de "pendiente" a "resuelta"
    ↓
14. El await getThumbnail(file) FINALMENTE recibe el imgUrl
*/

export function getThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const temporalUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = temporalUrl;
    video.muted = true;

    // wait for the video to load metadata
    video.addEventListener('loadedmetadata', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      video.currentTime = Math.random() * (video.duration); // async!!!!
        // Wait for the seeked event because is setting the currentTime is async
        video.addEventListener('seeked', () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgUrl = canvas.toDataURL('image/png');
            console.log('Thumbnail URL:', imgUrl);
            resolve(imgUrl); // ← Retorna la URL
          }
          URL.revokeObjectURL(temporalUrl);
        });
    });
  });
}