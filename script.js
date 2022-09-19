const buttons = document.querySelectorAll('.buttons')
const body = document.querySelector('body');
const computerChoice = document.createElement('p')
const result = document.createElement('div');
const gameResult = document.createElement('div');

let win = 0;
let lose = 0;

let choices = ["ROCK", "PAPER", "SCISSORS"];

function getComputerChoice() {
    // Rock: 1    Paper: 2    Scissors: 3
    let randomNum = Math.floor(Math.random() * 3) + 1;
    return choices[randomNum - 1];
}

function roundResult(outcome, winner, loser) {
    return "You " + outcome + "! " + winner + " beats " + loser;
}

function playRound(playerSelection, computerSelection) {
    let res = 0;
    result.textContent = ""

    switch (playerSelection) {
    case "ROCK":
        switch (computerSelection) {
        case "ROCK":
            result.textContent += "It's a tie!";
            break;
        case "PAPER":
            result.textContent += 
            roundResult("lose", computerSelection, playerSelection);
            --res;
            break;
        case "SCISSORS":
            result.textContent += 
            roundResult("win", playerSelection, computerSelection);
            ++res;
        }
        break;

    case "PAPER":
        switch (computerSelection){
        case "ROCK":
            result.textContent += roundResult("win", playerSelection, computerSelection);
            ++res;
            break;
        case "PAPER":
            result.textContent += "It's a tie!";
            break;
        case "SCISSORS":
            result.textContent += 
            roundResult("lose", computerSelection, playerSelection);
            --res;
        }
        break;
    case "SCISSORS":
        switch (computerSelection) {
        case "ROCK":
            result.textContent += 
            roundResult("lose", computerSelection, playerSelection);
            --res;
            break;
        case "PAPER":
            result.textContent += 
            roundResult("win", playerSelection, computerSelection);
            ++res;
            break;
        case "SCISSORS":
            result.textContent += "It's a tie!";
        }
        break;
    }
    return res;
}

function game(playerSelection) {
    let computerSelection = getComputerChoice();
    let res = playRound(playerSelection, computerSelection);

    computerChoice.textContent = "The Computer chose " + computerSelection + "!";
    computerChoice.classList.add('results');
    computerChoice.style.color = "lightpink"

    result.classList.add('results')
    body.appendChild(computerChoice);
    body.appendChild(result);
    return res;
}

function printResult(){
    if (win > lose)
        gameResult.textContent = `You win! ${win} - ${lose}`;
    else if (win === lose)
        gameResult.textContent = `It's a tie ${win} - ${lose}`;
    else
        gameResult.textContent = `You lose! ${win} - ${lose}`
}

function playGame(e){
    gameResult.textContent = "";
    gameResult.style.fontSize = "3em";
    gameResult.classList.add("results");
    body.insertBefore(gameResult, body.firstChild);
    let playerSelection = e.target.textContent;
    if (!playerSelection) return;
    let roundResult = game(playerSelection);
    if (roundResult === 1)
        ++win;
    else if (roundResult === -1)
        ++lose;
    if (win === 5){
        printResult();
        win = 0;
        lose = 0;

    } 
}

buttons.forEach((btn) => btn.addEventListener('click', playGame)); 
