/** Afficher le score */
const score = document.querySelector('.mon_score .other_rank_pts')
score.innerText = JSON.parse(window.localStorage.result)?.score + ' pts'

/** Emojis dispersion */
const emojis = ['}', '{', 'o']
const slots = document.querySelector('.slots')

const generateEmoji = () => {
    const emoji = document.createElement('div')
    const index = Math.floor(Math.random() * emojis.length)
    emoji.innerText = emojis[index]
    emoji.className = 'color_' + (Math.floor(Math.random() * 3) + 1)
    return emoji
}

const move = emoji => {
    const xDirection = Math.random() > .5 ? 1 : -1
    const yDirection = Math.random() > .5 ? 1 : -1

    const x = Math.random() * 1000 * xDirection
    const y = Math.random() * 1000 * yDirection

    emoji.animate([
        {transform: 'translate(0px, 0px)'},
        {transform: 'translate(' + x + 'px, ' + y + 'px)'}
    ], {
        duration: 1500,
        iterations: Infinity
    })

    setTimeout(() => {
        slots.removeChild(emoji)
    }, 1500)
}

if (slots) {
    const interval = setInterval(() => {
        const emoji = generateEmoji()
        slots.appendChild(emoji)
        move(emoji)
    }, 15)

    setTimeout(() => {
        clearInterval(interval)
    }, 1000)
}