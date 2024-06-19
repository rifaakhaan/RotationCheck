let teamA = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
let teamB = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'];
let scoreA = 0;
let scoreB = 0;

function updateCourt() {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`pa${i}`).textContent = teamA[i - 1];
        document.getElementById(`pb${i}`).textContent = teamB[i - 1];
    }
    document.getElementById('scoreA').textContent = scoreA.toString().padStart(2, '0');
    document.getElementById('scoreB').textContent = scoreB.toString().padStart(2, '0');
}

function rotateTeam(team) {
    if (team === 'A') {
        teamA.unshift(teamA.pop());
    } else {
        teamB.unshift(teamB.pop());
    }
    updateCourt();
}

function addScore(team) {
    if (team === 'A') {
        scoreA++;
    } else {
        scoreB++;
    }
    updateCourt();
}

function init() {
    const players = document.querySelectorAll('.player');
    players.forEach(player => {
        player.addEventListener('dragstart', dragStart);
    });

    const positions = document.querySelectorAll('.position');
    positions.forEach(position => {
        position.addEventListener('dragover', dragOver);
        position.addEventListener('drop', drop);
    });

    updateCourt();
}

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const playerId = event.dataTransfer.getData('text');
    const target = event.target;
    if (target.classList.contains('position') && !target.textContent) {
        target.textContent = playerId;
        document.getElementById(playerId).style.visibility = 'hidden';
    }
}

function checkPositions() {
    let correct = true;
    for (let i = 1; i <= 6; i++) {
        if (document.getElementById(`upa${i}`).textContent !== teamA[i - 1]) {
            correct = false;
            document.getElementById(`upa${i}`).classList.add('red');
        } else {
            document.getElementById(`upa${i}`).classList.add('green');
        }
        if (document.getElementById(`upb${i}`).textContent !== teamB[i - 1]) {
            correct = false;
            document.getElementById(`upb${i}`).classList.add('red');
        } else {
            document.getElementById(`upb${i}`).classList.add('green');
        }
    }
    if (correct) {
        document.getElementById('feedback').textContent = 'Correct positions!';
    } else {
        document.getElementById('feedback').textContent = 'Some positions are incorrect!';
    }
}

document.addEventListener('DOMContentLoaded', init);


