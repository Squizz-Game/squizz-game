const preview = document.querySelector('.preview')
const input = document.querySelector('#image')

const changePreview = img => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        preview.src = reader.result
    })
    reader.readAsDataURL(img)
}

input.addEventListener('change', e => {
    changePreview(e.target.files[0])
})

preview.addEventListener('dragover', e => {
    e.preventDefault()
})
preview.addEventListener('dragenter', e => {
    preview.classList.add('dragover')
})
preview.addEventListener('dragleave', e => {
    preview.classList.remove('dragover')
})
document.addEventListener('drop', e => {
    e.preventDefault()
    preview.classList.remove('dragover')
    const type = e.dataTransfer.files[0].type
    if (type === 'image/png' || type === 'image/jpeg') {
        input.files = e.dataTransfer.files
        changePreview(e.dataTransfer.files[0])
    }
})

preview.addEventListener('click', e => {
    input.click()
})