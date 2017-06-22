let focused = false
let hitten = false
let score = 0
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const content = document.querySelector('.content')
const overlay = document.querySelector('.overlay')
const blood = document.querySelector('.blood')
const metal = document.querySelector('.metal')
const ennemy = document.querySelector('.ennemy')
const endGame = document.querySelector('.end-game')
const winGame = document.querySelector('.win-game')

const width = window.innerWidth
const height = window.innerHeight
content.style.width = width + 'px'
content.style.height = height + 'px'

function move (evt) {
  overlay.style.left = (evt.clientX - 375) + 'px'
  overlay.style.top = (evt.clientY - 310) + 'px'
  checkEnnemy(evt);
}

function lose() {
  document.removeEventListener('mousemove', move)
  document.body.style.cursor = 'default'
  clearInterval(moveInterval)
  const src = ennemy.src.split('/')
  console.log(src)
  switch(src[src.length-1]) {
    case "1.jpg":
      ennemy.src = "./img/characters/4.jpg"
      break
    case "2.jpg":
      ennemy.src = "./img/characters/5.jpg"
      break
    case "3.jpg":
      ennemy.src = "./img/characters/6.jpg"
      break
  }
  setTimeout(() => {
    endGame.style.display = "inline"
  }, 3000)
  blood.style.top = "0"
  focused = false
}

function win() {
  document.removeEventListener('mousemove', move)
  document.body.style.cursor = 'default'
  clearInterval(moveInterval)
  setTimeout(() => {
    winGame.style.display = "inline"
  }, 1000)
  metal.style.top = "0"
  focused = false
}

function checkEnnemy(evt) {
  if (evt.clientX > (ennemy.offsetLeft - 10) && evt.clientX < (ennemy.offsetLeft + 90) &&
  evt.clientY > (ennemy.offsetTop - 10) && evt.clientY < (ennemy.offsetTop + 200) && !focused && !hitten) {
    focused = true
    clearInterval(moveInterval)
    setTimeout(() => {
      if (focused) {
        lose()
      }
    },500)
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function moveEnnemy() {
  hitten = false
  ennemy.style.top = getRandom(0, innerHeight - 190) + 'px'
  ennemy.style.left = getRandom(0, innerWidth - 80) + 'px'
  const url = ennemy.src.split('.jpg')[0]
  ennemy.src = url.substr(0, url.length-1) + getRandom(1, 3) + '.jpg'

}

function hit(evt) {
  if (evt.clientX > ennemy.offsetLeft && evt.clientX < (ennemy.offsetLeft + 80) &&
  evt.clientY > ennemy.offsetTop && evt.clientY < (ennemy.offsetTop + 190) && !hitten) {
    focused = false
    hitten = true
    const src = ennemy.src
    ennemy.src = src.split('.jpg')[0] + '_hit.jpg'
    setTimeout(() => {
      ennemy.src = src
      score++
      if (score >= 10) {
        win()
      } else {
        moveEnnemy()
        moveInterval = setInterval(() => {
          moveEnnemy()
        }, 1500)
        document.querySelector('h2').innerHTML = 'Score: ' + score
      }
    }, 200)
  }
}

document.addEventListener('mousemove', move)
document.addEventListener('click', hit)
let moveInterval = setInterval(() => {
  moveEnnemy()
  console.log('okok')
}, 1500)
