import './style.css'
import cloudUploadImg from './assets/cloud_upload.png'
import { setupDropFile } from './drop_file_script'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <label for="input-file" id="drop-area">
      <input type="file" accept="video/*" id="input-file" hidden />
      <div id="img-view">
        <img src="${cloudUploadImg}"/>
        <p>Click or Drop your video here</p>
        <span>Upload up to 200MB</span>
      </div>
    </label>
  </div>
`
setupDropFile()