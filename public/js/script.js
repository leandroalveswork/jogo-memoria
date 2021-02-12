const values = [];
const totalCards = 18;
const imgs = document.querySelectorAll('img');

let firstMs;
let finalMs;
let finalSeconds;
let finalMinutes;

const openCards = [];
let progress = 0;

const arrayShuffle = function(arr) {
    let i; let j; let k;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random()*i)
        k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
    }
}

const indexToSrc = function(num) {
    return './img/card' + values[num] + '.png'
}

const startGame = function() {
    for (let i = 1; i <= totalCards/2; i++) {
        values[i*2 - 2] = i;
        values[i*2 - 1] = i;
    }

    arrayShuffle(values)

    for (let i = 0; i < totalCards; i++) {
        imgs[i].id = i
        imgs[i].src = './img/cardund.png'
        imgs[i].classList.add('clickable');
    }

    firstMs = Number(new Date())
}

const removeAllClickables = function(exceptId) {
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains('clickable') && i !== exceptId) {
            imgs[i].classList.remove('clickable')
        }
    }
}

const giveBackClickables = function() {
    for (let i = 0; i < imgs.length; i++) {
        if (!imgs[i].classList.contains('clickable') && !imgs[i].classList.contains('found')) {
            imgs[i].classList.add('clickable')
        }
    }
}

const winGame = function() {
    const topText = document.querySelector('.top')
    finalMs = Number(new Date()) - firstMs;
    finalSeconds = Math.floor(finalMs / 1000)
    finalMs %= 1000
    finalMinutes = Math.floor(finalSeconds / 60)
    finalSeconds %= 60

    topText.textContent = `Parabéns! Você terminou o jogo em ${finalMinutes}:${finalSeconds}.${finalMs}`
    topText.classList.add('win')
}

startGame()

const undsrc = imgs[0].src;

for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function() {
        if (imgs[i].src === undsrc) {
            if (openCards.length < 2) {
                imgs[i].src = indexToSrc(i)
                imgs[i].classList.add('clickable')
                openCards.push(i)
                if (openCards.length === 2) {
                    if (values[i] === values[openCards[0]]) {
                        imgs[openCards[0]].classList.remove('clickable')
                        imgs[openCards[0]].classList.add('found')
                        imgs[i].classList.remove('clickable')
                        imgs[i].classList.add('found')
                        openCards.pop()
                        openCards.pop()
                        progress += 2
                        if (progress == imgs.length) {
                            winGame()
                        }
                    } else {
                        removeAllClickables(i)
                    }
                }
            }
        } else if (openCards[openCards.length - 1] === i) {
            imgs[i].src = undsrc
            openCards.pop()
            if (openCards.length === 1) {
                giveBackClickables()
            }
        }
    })
}

document.querySelector('.bottom').addEventListener('click', function() {
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains('clickable')) {
            imgs[i].classList.remove('clickable')
        }
        if (imgs[i].classList.contains('found')) {
            imgs[i].classList.remove('found')
        }
    }
    while (openCards.length > 0) {
        openCards.pop()
    }
    progress = 0
    const topText = document.querySelector('.top')
    topText.textContent = 'Junte todas as duplas'
    if (topText.classList.contains('win')) {
        topText.classList.remove('win')
    }

    startGame()
})