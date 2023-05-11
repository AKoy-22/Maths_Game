const BACK_COLOR = '#000000';
const LINE_COL = "#FFFFFF"; 
const LINE_WIDTH = 10;
var c;
var ctx;
var currentX = 0;
var currentY = 0;
var prevX = 0;
var prevY = 0;


function prepareCanvas() {
    c = document.getElementById("my-canvas");
    ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = BACK_COLOR;
    ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);

    ctx.strokeStyle = LINE_COL;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineJoin = 'round';

    let isDrawing = false;
    
    //mouse event
    document.addEventListener('mousemove', function (event) {
        if (isDrawing) {
            prevX = currentX;
            prevY = currentY;
            currentX = event.clientX - c.offsetLeft;
            currentY = event.clientY - c.offsetTop;

            draw();
        }
    });

    document.addEventListener('mousedown', function (event) {
        isDrawing = true;
        currentX = event.clientX - c.offsetLeft;
        currentY = event.clientY - c.offsetTop;
    });
    document.addEventListener('mouseup', function (event) {
        isDrawing = false;
    });
    c.addEventListener('mouseleave', function (event) {
        isDrawing = false;
    });

    //Touch event
    c.addEventListener('touchmove', function (event) {
        if (isDrawing) {
            prevX = currentX;
            prevY = currentY;
            currentX = event.touches[0].clientX - c.offsetLeft;
            currentY = event.touches[0].clientY - c.offsetTop;

            draw();
        }
    });

    c.addEventListener('touchstart', function (event) {
        isDrawing = true;
        currentX = event.touches[0].clientX - c.offsetLeft;
        currentY = event.touches[0].clientY - c.offsetTop;
    });
    c.addEventListener('touchend', function (event) {
        isDrawing = false;
    });
    c.addEventListener('touchcancel', function (event) {
        isDrawing = false;
    });
}

//drawing on a canvas 
function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();
}
//clears canvas when button is clicked
function clearCanvas(){
    currentX = 0;
    currentY = 0;
    prevX = 0;
    prevY = 0;
    ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);
}


