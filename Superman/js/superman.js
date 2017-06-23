let myGamePiece
let myObstacles = []
let gameStarted = false

function startGame () {
  gameStarted = true
  myGamePiece = new component(30, 10, "./img/superman.png", 10, 120, "image")
  myGamePiece.gravity = 0.05
  myGameArea.start()
}

const myGameArea = {
  canvas : document.createElement("canvas"),
  start : function () {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.frameNo = 0
    this.interval = setInterval(updateGameArea, 9)
  },
  clear : function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function component (width, height, color, x, y, type) {
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.type = type
  this.score = 0
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.x = x
  this.y = y
  this.gravity = 1
  this.gravitySpeed = 0
  this.update = function () {
    ctx = myGameArea.context
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height
      ctx.fillStyle = color
      ctx.fillText(this.text, this.x, this.y)
    } else if (this.type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  this.newPos = function () {
    this.gravitySpeed += this.gravity
    this.x += this.speedX
    this.y += this.speedY + this.gravitySpeed
    this.hitBottom()
    this.hitTop()
  }
  this.hitBottom = function () {
    const rockbottom = myGameArea.canvas.height - this.height
    if (this.y > (rockbottom + 15)) updateGameArea(true)
    // this.y = rockbottom
    // this.gravitySpeed = 0
  }
  this.hitTop = function () {
    if (this.y < -15) updateGameArea(true)
    // this.y = 0
    // this.gravitySpeed = 1
  }
  this.crashWith = function (otherobj) {
    const myleft = this.x
    const myright = this.x + (this.width)
    const mytop = this.y
    const mybottom = this.y + (this.height)
    const otherleft = otherobj.x
    const otherright = otherobj.x + (otherobj.width)
    const othertop = otherobj.y
    const otherbottom = otherobj.y + (otherobj.height)
    let crash = true
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false
    }
    return crash
  }
}

function updateGameArea (force) {
  let x, height, gap, minHeight, maxHeight, minGap, maxGap
  let myScore = 0
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myObstacles[i].x < 10) myScore++
    if (myGamePiece.crashWith(myObstacles[i]) || force) {
      clearInterval(myGameArea.interval)
      gameStarted = false
      crash = false
      myObstacles = []

      const sendScore = currentScore.innerHTML.split(':')[1].trim()
      if (window.localStorage.getItem('score') &&
          parseInt(window.localStorage.getItem('score')) < parseInt(sendScore)) {
        window.localStorage.setItem('score', sendScore)
        window.localStorage.setItem('username', username.value)
      }
      else if (!window.localStorage.getItem('score')) {
        window.localStorage.setItem('score', sendScore)
        window.localStorage.setItem('username', username.value)
      }

      document.body.removeChild(document.querySelector('canvas'))
      bestUser.innerHTML = 'Meilleur joueur : ' + window.localStorage.getItem('username')
      bestScore.innerHTML = 'Meilleur score : ' + window.localStorage.getItem('score')
      content.style.display = 'block'
      restartGame.style.display = 'flex'
      return
    }
  }
  myScore = Math.floor(myScore / 2)
  myGameArea.clear()
  myGameArea.frameNo += 1
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width
    minHeight = 40
    maxHeight = 200
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
    minGap = 40
    maxGap = 200
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
    myObstacles.push(new component(40, height, "./img/building-reverse.png", x, 0, "image"))
    myObstacles.push(new component(40, x - height - gap, "./img/building.png", x, height + gap, "image"))
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1
    myObstacles[i].update()
  }
  currentScore.innerHTML = 'SCORE : ' + myScore
  myGamePiece.newPos()
  myGamePiece.update()
}

function everyinterval (nb) {
  if ((myGameArea.frameNo / nb) % 1 == 0) return true
  return false
}

function accelerate (nb) {
  myGamePiece.gravity = nb
}

const currentScore = document.querySelector('.current-score')
currentScore.innerHTML = 'SCORE : 0'

const username = document.querySelector('.username')
const bestUser = document.querySelector('.user')
const bestScore = document.querySelector('.score')
const content = document.querySelector('.content')
const launcher = document.querySelector('.start-game')
const start = document.querySelector('.start')
start.addEventListener('click', () => {
  if (username.value === '') return
  content.style.display = 'none'
  launcher.style.display = 'none'
  currentScore.style.display = 'block'
  startGame()
})

const restartGame = document.querySelector('.restart-game')
const restart = document.querySelector('.restart')
restart.addEventListener('click', () => {
  content.style.display = 'none'
  launcher.style.display = 'none'
  startGame()
})

document.addEventListener('keydown', evt => {
  if (!gameStarted) return
  switch (evt.keyCode) {
    case 38:
      accelerate(-0.09)
      setTimeout(() => { accelerate(0.02) }, 70)
      break
    case 32:
      accelerate(-0.09)
      setTimeout(() => { accelerate(0.02) }, 70)
      break
  }
})

document.addEventListener('click', evt => {
  if (gameStarted) {
    accelerate(-0.09)
    setTimeout(() => { accelerate(0.02) }, 70)
  }
})
