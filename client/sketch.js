import io from 'socket.io-client'

const SIZE_WIDTH = 50
const SIZE_HEIGHT = 50

let buffer
let socket = io.connect('http://127.0.0.1:3000')

window.setup = () => {
    buffer = []
    createCanvas(640, 480)
    fill(0)
}

window.draw = () => {
    if(mouseIsPressed) {
        let myX = mouseX,
            myY = mouseY;
        ellipse(myX, myY, SIZE_HEIGHT, SIZE_WIDTH)
        socket.emit('draw_motif', {
            motif:{
                x: myX,
                y: myY
            }
        })
    }
    var pos = buffer.shift()
    if(pos){
        ellipse(pos.x, pos.y, SIZE_HEIGHT, SIZE_WIDTH)
    }

}

socket.on('draw_motif', function(data){
    buffer.push(data.motif)
})
