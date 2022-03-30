const alerts = document.querySelectorAll('.alerts .alert')

const timeoutHide = (alert) => {
    setTimeout(() => {
        alert.classList.add('hide')
    }, 3000)
}

const clickHide = (alert) => {
    alert.addEventListener('click', e => {
        alert.classList.add('hide')
    })
}

alerts.forEach(alert => {
    timeoutHide(alert)
    clickHide(alert)
})
console.log(alerts);