const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const playerText = document.getElementById("player");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Combinaisons gagnantes
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6]             // diagonales
];

// Gérer un clic sur une cellule
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // Si la cellule est déjà prise ou si le jeu est fini
    if (board[index] !== "" || !gameActive) return;

    // Marquer la cellule
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    // Vérifier victoire ou égalité
    checkResult();

    // Changer de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerText.textContent = currentPlayer;
}

// Vérifier victoire ou égalité
function checkResult() {
    let roundWon = false;

    // Vérifier chaque combinaison gagnante
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;
        gameActive = false;
        return;
    }

    // Vérifier égalité
    if (!board.includes("")) {
        statusText.textContent = "Match nul !";
        gameActive = false;
        return;
    }
}

// Réinitialiser le jeu
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Tour de : ";
    playerText.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

// Ajouter les écouteurs d'événements
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
