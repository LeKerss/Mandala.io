import io from 'socket.io-client'

let     mWidth = 50,
        mHeight = 50,
        mColor = '#000000',
        canvasHover = false,
        buffer = [],
        socket = io.connect('http://127.0.0.1:3000')

window.setup = () => {
    ellipseMode(CENTER)
    let canvas = createCanvas(640, 480)
    canvas.parent('sketch-holder')
}

window.draw = () => {
    if(canvasHover && mouseIsPressed) {
        fill(mColor)
        let myX = mouseX,
            myY = mouseY;
        ellipse(myX, myY, mWidth, mHeight)
        socket.emit('draw_motif', {
            motif:{
                color: mColor,
                x: myX,
                y: myY,
                width: mWidth,
                height: mHeight
            }
        })
    }
    let motif = buffer.shift()
    if(motif){

        fill(motif.color)
        ellipse(motif.x, motif.y, motif.width, motif.height)
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
    document.getElementById("motif-width").addEventListener("input", function () {
            mWidth = parseInt(this.value);
    })
    document.getElementById("motif-height").addEventListener("input", function () {
            mHeight = parseInt(this.value);
    })
    document.getElementById("clear-page").addEventListener("click", function () {
            socket.emit('clear_page', {clearer: ""})
    })
    window.setHover = (state) => {
        canvasHover = state
    }
}
