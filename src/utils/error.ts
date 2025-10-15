export function error(errorCode: number) {
  switch (errorCode) {
    case 1:
      return ('Error: File is not an mp4 video');
      break;
    case 2:
      return ('Error: Problem with the file, please try again');
      break;
    case 3:
      return ('Error: File is too big');
      break;
    case 4:
      return('Error: File is empty');
      break;
    default:
      return ('Error: Unknown error');
  }
}