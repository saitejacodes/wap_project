let currentPlayer = 'red';
let isGameOver = false;
let gameBoard;
const ROWS = 6;
const COLS = 7;
let availableRows = [];
window.onload = startGame;
function startGame() {
    gameBoard = [];
    availableRows = new Array(COLS).fill(ROWS - 1);
    for (let row = 0; row < ROWS; row++) {
        let currentRow = [];
        for (let col = 0; col < COLS; col++) {
            currentRow.push(null);
            let tile = document.createElement("div");
            tile.id = `${row}-${col}`;
            tile.className = "tile";
            tile.addEventListener("click", handleMove);
            document.getElementById("board").appendChild(tile);
        }
        gameBoard.push(currentRow);
    }
}
function handleMove() {
    if (isGameOver) return;
    const [row, col] = this.id.split("-").map(Number);
    const dropRow = availableRows[col];
    if (dropRow < 0) return;
    gameBoard[dropRow][col] = currentPlayer;
    const tile = document.getElementById(`${dropRow}-${col}`);
    tile.classList.add(`${currentPlayer}-piece`);
    availableRows[col]--;
    if (checkForWin(dropRow, col)) {
        announceWinner();
        return;
    }
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
}
function checkForWin(row, col) {
    return (
        checkHorizontal(row, col) ||
        checkVertical(row, col) ||
        checkDiagonalRight(row, col) ||
        checkDiagonalLeft(row, col)
    );
}
function checkHorizontal(row, col) {
    let count = 0;
    const player = gameBoard[row][col];
     for (let c = 0; c < COLS; c++) {
        if (gameBoard[row][c] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}
function checkVertical(row, col) {
    let count = 0;
    const player = gameBoard[row][col];
    for (let r = 0; r < ROWS; r++) {
        if (gameBoard[r][col] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}
function checkDiagonalRight(row, col) {
    let count = 0;
    const player = gameBoard[row][col];
    let r = row - Math.min(row, col);
    let c = col - Math.min(row, col);
    while (r < ROWS && c < COLS) {
        if (gameBoard[r][c] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
        r++;
        c++;
    }
    return false;
}
function checkDiagonalLeft(row, col) {
    let count = 0;
    const player = gameBoard[row][col];
    let r = row - Math.min(row, COLS - 1 - col);
    let c = col + Math.min(row, COLS - 1 - col);
     while (r < ROWS && c >= 0) {
        if (gameBoard[r][c] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
        r++;
        c--;
    }
    return false;
}
function announceWinner() {
    const winner = document.getElementById("winner");
    winner.innerText = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} Wins!`;
    isGameOver = true;
}