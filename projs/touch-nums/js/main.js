'use script';

var gBoardSize = 4;
var gNextNum;
var gGameInterval;
var gGameTime;
var gElHeader = document.querySelector('h2');
var gElVictory = document.querySelector('.victory');
var gElTimer = document.querySelector('h3');


function cellClicked(clickedCell) {
    var clickedNum = clickedCell.getAttribute('data-num');
    if (+clickedNum === gNextNum) {
        clickedCell.classList.add('clicked');
        if (gNextNum === 1) startTimer();
        gNextNum++;
        if (gNextNum === ((gBoardSize**2) + 1)) victory();
        gElHeader.innerText = `Next Number: ${gNextNum}`;
    }
}

function victory(){
    clearInterval(gGameInterval);
    gElVictory.style.display = 'block';
}

function startTimer(){
    gGameInterval = setInterval(() => {
        showTimer();
    }, 1);
}

function showTimer() {
    gElTimer.innerText = `Game Time: ${gGameTime/100}`;
    gGameTime++;
}

function renderBoard(gameNums) {
    var strHTML = '';
    for (var i = 0; i < gBoardSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoardSize; j++) {
            var currNum = gameNums.pop();
            strHTML += `<td data-num="${currNum}" onclick="cellClicked(this)">${currNum}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function changeSize(el) {
    var size = el.getAttribute('data-size');

    gElVictory.style.display = 'none';
    gBoardSize = size;
    clearInterval(gGameInterval);
    init();
}

function init() {
    var nums = [];
    gElVictory.style.display = 'none';
    gElHeader.innerText = 'Click The Nums By Their Order';
    gElTimer.innerText = '';
    gGameTime = 0;
    gNextNum = 1;
    for (var i = 0; i < gBoardSize ** 2; i++) {
        nums[i] = i + 1;
    }
    shuffle(nums);
    renderBoard(nums);
}




