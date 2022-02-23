var framerateElement;
var antwalk;
var canvas;
var width, height;

let data = {};
let start = false;

function initElements() {
    document.getElementById("setup-data").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "visible";
}

function onLoadData(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        data = JSON.parse(reader.result);
        initElements();
        setupData(data);
    }
}

function setupCanvas(){
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
}

function setupData(data) {
    start = true;
    const walktype = data.type || SQUARE;
    const steps = data.steps;
    if (walktype === HEX) {
        setupHexWalk(steps);
    } else {
        setupSquareWalk(steps);
    }
}

function setupHexWalk(steps){
    width = 800;
    height = 700;
    reset();
    antwalk = new Antwalk(10, width, height, HEX, steps);
    antwalk.counterElement = document.getElementById("counter")
}

function setupSquareWalk(steps) {
    width = 700;
    height = 700;
    reset();
    antwalk = new Antwalk(10, width, height, SQUARE, steps);
    antwalk.counterElement = document.getElementById("counter")
}

function reset(){
    clear();
    setupCanvas();
    setPauseButtonText("Start");
}

function draw() {
    if (start)
        antwalk.draw();
}

function restart(){
    clear();
    setupData(data);
    setPauseButtonText("Start");
}

function pause(){
    antwalk.paused = !antwalk.paused;
    setPauseButtonText();
}

function setPauseButtonText(text){
    let pausebutton = document.getElementById("pausebutton");
    if(text == null) {
        if(antwalk.paused) {
            pausebutton.textContent = "Continue";
            pausebutton.style.backgroundColor = "rgb(80, 187, 114)";
        } else {
            pausebutton.textContent = "Pause";
            pausebutton.style.backgroundColor = "rgb(187, 171, 80)";
        }

    } else {
        pausebutton.textContent = text;
        pausebutton.style.backgroundColor = "rgb(80, 187, 114)";
    }
}

function move(){
    antwalk.move();
}