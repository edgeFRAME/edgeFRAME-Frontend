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
9. Se prepara 'seeked'
  ↓
10. [Esperando...] El video busca esa posición
   ↓
11. Se dispara 'seeked'
    ↓
12. Se captura el frame y genera imgUrl
   ↓
13. Se llama resolve(imgUrl)
   ↓
14. La Promise cambia de "pendiente" a "resuelta"
   ↓
15. El await getThumbnail(file) FINALMENTE recibe el imgUrl
*/

export async function getThumbnail(file: File): Promise<string> {
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
        // Add the event listener first because setting currentTime could
        // take 1 second (for example) and we might miss the event
        video.addEventListener('seeked', () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgUrl = canvas.toDataURL('image/png');
            console.log('Thumbnail URL:', imgUrl);
            resolve(imgUrl); // ← Retorna la URL
          }
          URL.revokeObjectURL(temporalUrl);
        });
        video.currentTime = Math.random() * (video.duration); // async!!!!
    });
  });
}