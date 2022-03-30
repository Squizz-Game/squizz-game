const alerts = document.querySelectorAll('.alerts .alert')
const alertParent = document.querySelector('.alerts')

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

const createAlert = (msg, type) => {
    const alert = document.createElement('div')
    alert.classList.add('alert', type)
    alertParent.appendChild(alert)
    alert.innerHTML = msg

    timeoutHide(alert)
    clickHide(alert)
}

alerts.forEach(alert => {
    timeoutHide(alert)
    clickHide(alert)
})