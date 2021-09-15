let table = [[1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 15, 11],
             [13, 14, 12, 0]];

let moves = 0;
let Interval;
let milliseconds = 00;
let seconds = 00;
let minutes = 00;
let gameTable = document.getElementById("table");
let shownMS = document.getElementById("milliseconds");
let shownSeconds = document.getElementById("seconds");
let shownMinutes = document.getElementById("minutes");
let divType = document.getElementById("type");
let moveCount = document.getElementById("movecount");
let timer = document.getElementById("timer");
let moveResult = document.getElementById("moveResult");
let timerResult = document.getElementById("timerResult");
let announcement = document.getElementById("announcement");


function play(table) {
  
  ConvertTable(table);

  document.onclick = e => {
    if (e.target.className == "cell"){
      console.log(moves);
      if(moves == 0){
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
      }
      let btn = e.target;
      moves = Move(btn, table, moves);
      table = ConvertToTable();
      moveCount.style.display = "inline-block";
      moveCount.innerHTML = "Moves: " + moves;
    }

    if (CheckWin(table)){
      clearInterval(Interval);
      divType.style.display = "none";
      gameTable.style.display = "none";
      announcement.style.display = "block";
      moveResult.innerHTML = "Moves: " + moves;;
      timerResult.innerHTML = "Time: " + shownMinutes.innerHTML + ":" + shownSeconds.innerHTML + "." + shownMS.innerHTML;
    }
  }
}

function ConvertTable(table) {
  let btns = document.getElementsByClassName("cell");
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(table[i][j] == 0){
        continue;
      }
      else{
        let btn = btns[4 * i + j];
        btn.innerHTML = table[i][j].toString();
        btn.setAttribute("data-value", table[i][j].toString());
      }
    }
  }
  return table;
}

function ConvertToTable() {
  let btns = document.getElementsByClassName("cell");
  table = [[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]];
  for(let i = 0; i < 15; i++){
    let btn = btns[i];
    let x = btn.getAttribute("data-position")[0];
    let y = btn.getAttribute("data-position")[1];
    table[x][y] = parseInt(btn.getAttribute("data-value"));
  }
  return table;
}

function CheckWin(table) {
  flag = 0;
  winTable = [[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12],
              [13,14,15,0]];
  for(let i = 0; i < 4; i ++){
    for(let j = 0; j < 4; j ++){
      if(table[i][j] == winTable[i][j]) flag++;
    }
  }
  return (flag == 16);
}

function Move(btn, table, moves) {
  let x = parseInt(btn.getAttribute("data-position")[0]);
  let y = parseInt(btn.getAttribute("data-position")[1]);
  let xD = parseInt(btn.getAttribute("data-X"));
  let yD = parseInt(btn.getAttribute("data-Y"));
  let flag = true;
  if((x > 0) && (table[x-1][y] == 0)){
    x--;
    yD--;
    flag = false;
  }
  if((x < 3) && (table[x+1][y] == 0)){
    x++;
    yD++;
    flag = false;
  }
  if((y > 0) && (table[x][y-1] == 0)){
    y--;
    xD--;
    flag = false;
  }
  if((y < 3) && (table[x][y+1] == 0)){
    y++;
    xD++;
    flag = false;
  }
  if (flag){
    return moves;
  }
  else{
    moves++;
    btn.setAttribute("data-position", x.toString() + y.toString());
    btn.setAttribute("data-X", xD.toString());
    btn.setAttribute("data-Y", yD.toString());
    btn.style.transform = "translate(" + (xD * 110) + "%," + (yD * 110) + "%)";
  }
  return moves;
}
  
function startTimer() {
  milliseconds++;
  if(milliseconds <= 9){
    shownMS.innerHTML = "0" + milliseconds;
  }

  if(milliseconds > 9){
    shownMS.innerHTML = milliseconds;
  }

  if (milliseconds > 99) {
    seconds++;
    shownSeconds.innerHTML = "0" + seconds;
    milliseconds = 0;
    shownMS.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    shownSeconds.innerHTML = seconds;
  }

  if (seconds > 59) {
    minutes++;
    shownMinutes.innerHTML = "0" + minutes;
    seconds = 0;
    shownSeconds.innerHTML = "0" + 0;
  }

  if (minutes > 9) {
    shownMinutes.innerHTML = minutes;
  }
}

play(table);