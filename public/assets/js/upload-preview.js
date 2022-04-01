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
    console.log('hello')
})
preview.addEventListener('dragleave', e => {
    console.log('bye')
})
document.addEventListener('drop', e => {
    e.preventDefault()

    input.files = e.dataTransfer.files
    changePreview(e.dataTransfer.files[0])
})
