export function error(errorCode: number) {
  switch (errorCode) {
    case 1:
      return ('Error: File is not an mp4 video');
    case 2:
      return ('Error: Problem with the file, please try again');
    case 3:
      return ('Error: File is too big');
    case 4:
      return('Error: File is empty');
    default:
      return ('Error: Unknown error');
  }
}