import { error } from "./error";

export function processFile(file : File, maxSize : number, dataUnit : 'MB' | 'GB') : File | string {
  console.log(`${file.name}`)
  if (file.type !== 'video/mp4') {return error(1); }
  if (file.size > maxSize * (dataUnit === 'MB' ? 1048576 : 1073741824)) {return error(3); }
  if (file.size === 0) {return error(4); }
  return file;
}