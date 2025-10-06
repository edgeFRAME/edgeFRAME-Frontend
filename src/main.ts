import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <label for="input-file">
      <input type="file" accept="image/*" id="input-file" />
    </label>
  </div>
`