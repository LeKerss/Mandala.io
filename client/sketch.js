function setup() {
    createCanvas(640, 480)
}

function draw() {
    fill(0)
    if(mouseIsPressed) {
        ellipse(mouseX, mouseY, 50, 50)
    }

}
