const Gameboard = (() => {
    // Create array of boxes to display as gamebaord
    let board = ['','','','','','','','',''];
    const mainContainer = document.querySelector('.main-container');
    return {
        // render gameboard 
        render() {
            let boardHTML = "";
            board.forEach((square, index) => {
                boardHTML += `<div class="square" id=square-${index}">${square}</div>`;
            })
            document.querySelector('.gameboard').innerHTML = boardHTML;

            // Add click event listeners to every square
            const squares = document.querySelectorAll('.square');
            squares.forEach((square) => {
                square.addEventListener('click', Game.handleClick);
            })
        },

        // update gameboard
        update(index, value) {
            // Create update function
            board[index] = value;
            
        },

        //restart game
        restart() {
            const restartBtn = document.querySelector('.restart');
            restartBtn.addEventListener('click', Game.restart);
        },

        // return gameboard indirectly
        getGameBoard() {
            return board;
        },
    }
})();

// Create module to control the game
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = (() => {
        // Load welcome screen
        const controls = document.querySelector('.controls');
        window.addEventListener('DOMContentLoaded', () => {
            controls.style.visibility = 'visible';
        });
        const startBtn = document.querySelector('.start-btn');

        // hide welcome screen and render grid when clicking on start
        startBtn.addEventListener('click', () => {

            // Hide Welcome Screen
            controls.style.visibility = 'hidden';

            // Get player names
            let player1 = document.querySelector('#player1').value;
            let player2 = document.querySelector('#player2').value;

             // Create the two players 
            players = [createPlayer(player1, "X"),createPlayer(player2, "O")],
            currentPlayerIndex = 0;
            gameOver = false;

            // Render game board
            Gameboard.render();

            // Add click event listeners to every square
            const squares = document.querySelectorAll('.square');
            squares.forEach((square) => {
                square.addEventListener('click', handleClick);
            })

            
        })
    });

    // restart game
    const restart = () => {
        for (let i = 0;i < 9; i++) {
            Gameboard.update(i,"")
        }
        Gameboard.render();
    }
    
    
    // returns clicked events on squares. Either 'X' or 'O'
    const handleClick = (e) => {
            let index = parseInt(e.target.id.split('-')[1]);

            // Check if square is filled or not
            if(Gameboard.getGameBoard()[index] !== "") {
                return;
            }

            // Update board
            Gameboard.update(index, players[currentPlayerIndex].mark);

            // Check for Win
            if (checkForWin(Gameboard.getGameBoard()) && Gameboard.getGameBoard()[index] === players[currentPlayerIndex].mark) {
                gameOver = true;
                alert(`Player ${players[currentPlayerIndex].name} Won!`);
            }
            else if (checkForTie(Gameboard.getGameBoard())) {
                gameOver = true;
                alert(`It's a tie!`)
            }
            
            // Change value after click
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            Gameboard.render();
    }
    return {
        start,
        restart,
        handleClick, 
    }
})();

function checkForWin(board) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i = 0; i< winningCombinations.length; i++) {
        const [a,b,c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== '')
}

// Create Player Factory
const createPlayer = ((name,mark) => {
    return {
        name,
        mark
    }
})

// Run functions globally to run game
Game.start();
Gameboard.restart();




