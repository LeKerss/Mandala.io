import io from 'socket.io-client'

const SIZE_WIDTH = 50
const SIZE_HEIGHT = 50

let buffer
let socket

window.setup = () => {
    buffer = []
    socket = io.connect()
    createCanvas(640, 480)
    fill(0)
}

window.draw = () => {
    if(mouseIsPressed) {
        ellipse(mouseX, mouseY, SIZE_HEIGHT, SIZE_WIDTH)
    }
    var pos = buffer.shift()
    if(pos){
        ellipse(pos.x, pos.y, SIZE_HEIGHT, SIZE_WIDTH)
    }

}
