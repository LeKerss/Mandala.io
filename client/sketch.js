import io from 'socket.io-client'

const   SIZE_WIDTH = 50,
        SIZE_HEIGHT = 50

let mColor = '#000000'
let canvasHover = false;

let buffer
let socket = io.connect('http://127.0.0.1:3000')

window.setup = () => {
    buffer = []
    let canvas = createCanvas(640, 480)
    canvas.parent('sketch-holder')

}

window.draw = () => {
    if(canvasHover && mouseIsPressed) {
        fill(mColor)
        let myX = mouseX,
            myY = mouseY;
        ellipse(myX, myY, SIZE_WIDTH, SIZE_HEIGHT)
        socket.emit('draw_motif', {
            motif:{
                color: mColor,
                x: myX,
                y: myY
            }
        })
    }
    let motif = buffer.shift()
    if(motif){
        fill(motif.color)
        ellipse(motif.x, motif.y, SIZE_HEIGHT, SIZE_WIDTH)
    }
}

socket.on('draw_motif', function(data){
    buffer.push(data.motif)
})

socket.on('clear_page', function(data) {
    clear()
})



window.onload = function() {
    document.getElementById("motif-color").addEventListener("input", function () {
            mColor = this.value;
    })
    document.getElementById("clear-page").addEventListener("click", function () {
            socket.emit('clear_page', {clearer: ""})
    })
    window.setHover = (state) => {
        canvasHover = state
    }
}
