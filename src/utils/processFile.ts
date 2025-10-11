import { error } from "./error"

export function processFile(file : File, maxSize : number, dataUnit : 'MB' | 'GB') : File | null {
  console.log(`${file.name}`)
  if (file.type !== 'video/mp4') {error(1); return null;} // error 1: not mp4
  if (file.size > maxSize * (dataUnit === 'MB' ? 1048576 : 1073741824)) {error(3); return null;} // error 3: file too big
  if (file.size === 0) {error(4); return null;} // error 4: file empty
  return file;
}