let level = 1
const levels = [
  null,
  null,
  {
    map: '2.jpg',
    waldoTop: '78%',
    waldoLeft: '8%'
  },
  {
    map: '3.jpg',
    waldoLeft: '14%',
    waldoTop: '80%'
  }
]
const wallpaper = document.querySelector('.wallpaper')
const overlay = document.querySelector('.overlay')
const img = document.querySelector('body img')
const waldo = document.querySelector('.waldo')
const win = document.querySelector('#win-popup h3')

const btnNext = document.querySelector('.btn-next')
const next = document.querySelector('.next-level')

const end = document.querySelector('.end-game')
const btnRestart = document.querySelector('.btn-restart')
const setName = document.querySelector('.username')

const start = document.querySelector('.start-game')
const btnStart = document.querySelector('.btn-start')
const username = document.querySelector('.name')

const width = window.innerWidth
const height = window.innerHeight

function move (evt) {
  overlay.style.left = (evt.clientX - (width * 5)) + 'px'
  overlay.style.top = (evt.clientY - (height * 5)) + 'px'
  img.style.display = 'block'
  img.style.left = (evt.clientX - 100) + 'px'
  img.style.top = (evt.clientY - 90) + 'px' 
}

btnStart.addEventListener('click', () => {
  if (username.value !== '') {
    document.body.style.cursor = 'none'
    document.addEventListener('mousemove', move)
    start.style.display = 'none'
  }
})

btnRestart.addEventListener('click', () => {
  location.reload();
})

waldo.addEventListener('click', () => {
  document.removeEventListener('mousemove', move)
  let sentence
  switch (level) {
    case 1:
      sentence = 'Vous avez remporte le premier niveau'
      break
    case 2:
      sentence = 'Vous avez remporte le deuxieme niveau'
      break
    case 3:
      sentence = 'Vous avez remporte le dernier niveau'
      break
  }
  win.innerHTML = sentence
  document.body.style.cursor = 'default'
  if (level !== 3) {
    setTimeout(() => { next.style.display = 'flex' }, 1000)
  }
  else {
    setName.innerHTML = username.value
    setTimeout(() => { end.style.display = 'flex' }, 1000)
  }
})

btnNext.addEventListener('click', () => {
  level++
  console.log(level)
  console.log(levels[level])
  wallpaper.src = "./img/maps/" + levels[level].map;
  waldo.style.left = levels[level].waldoLeft
  waldo.style.top = levels[level].waldoTop
  next.style.display = 'none'
  document.body.style.cursor = 'none'
  document.addEventListener('mousemove', move)
})