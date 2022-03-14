let antwalk;
let canvas;
let width, height;

let data = {};
let start = false;
let speed = 1;

function TransMatrix(A) {
    if (!A)
        return undefined;
    let m = A.length,
        n = A[0].length,
        AT = [];
    for (let i = 0; i < n; i++) {
        AT[i] = [];
        for (let j = 0; j < m; j++) {
            AT[i][j] = A[j][i];
        }
    }
    return AT;
}

const clone = (a) => JSON.parse(JSON.stringify(a));

function initElements() {
    document.getElementById("setup-data").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "visible";
}

function onLoadData(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        data = JSON.parse(reader.result);
        if (data.init){
            data.init.map = TransMatrix(data.init.map);
        }
        initElements();
        setupData(clone(data));
    }
}

function setupCanvas(){
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
}

function setupData(data) {
    const walktype = data.type || SQUARE;
    if (walktype === HEX) {
        setupHexWalk(data);
    } else {
        setupSquareWalk(data);
    }
    start = true;
}

function setupHexWalk(data){
    width = 700;
    height = 600;
    reset();
    antwalk = new Antwalk(10, width, height, HEX, data.steps, data.init);
    antwalk.counterElement = document.getElementById("counter")
}

function setupSquareWalk(data) {
    width = 600;
    height = 600;
    reset();
    antwalk = new Antwalk(10, width, height, SQUARE, data.steps, data.init);
    antwalk.counterElement = document.getElementById("counter")
}

function updateSpeed(count) {
    speed += count;
    speed = speed > 0 
            ? speed 
            : 0;
    document.getElementById("speed").innerHTML = `Движений за шаг: ${speed}`;
}

function reset(){
    clear();
    setupCanvas();
    setPauseButtonText("Запустить");
}

function draw() {
    if (start) {
        antwalk.actionsPerDraw = speed;
        antwalk.draw();
    }
}

function restart(){
    clear();
    setupData(clone(data));
    setPauseButtonText("Запустить");
}

function pause(){
    antwalk.paused = !antwalk.paused;
    setPauseButtonText();
}

function setPauseButtonText(text){
    let pausebutton = document.getElementById("pausebutton");
    if(text == null) {
        if(antwalk.paused) {
            pausebutton.textContent = "Продолжить";
            pausebutton.style.backgroundColor = "rgb(80, 187, 114)";
        } else {
            pausebutton.textContent = "Пауза";
            pausebutton.style.backgroundColor = "rgb(187, 171, 80)";
        }

    } else {
        pausebutton.textContent = text;
        pausebutton.style.backgroundColor = "rgb(80, 187, 114)";
    }
}

function move(){
    for (let i = 0; i < speed; i++) {
        antwalk.move();
    }
}