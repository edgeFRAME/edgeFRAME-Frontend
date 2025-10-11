export function error(errorCode : number) {
  switch (errorCode) {
    case 1:
      alert('Error: File is not an mp4 video');
      console.error('Error: File is not an mp4 video');
      break;
    case 2:
      alert('Error: Problem with the file, please try again');
      console.error('Error: Problem with the file, please try again');
      break;
    case 3:
      alert('Error: File is too big');
      console.error('Error: File is too big');
      break;
    case 4:
      alert('Error: File is empty');
      console.error('Error: File is empty');
      break;
    default:
      alert('Error: Unknown error');
      console.error('Error: Unknown error');
  }
}