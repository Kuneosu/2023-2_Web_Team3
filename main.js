// Robot question

const date_loader = () => {
    const hasAnsweredRobotQuestion = localStorage.getItem('hasAnsweredRobotQuestion');

    if (hasAnsweredRobotQuestion === 'true') {
        loadPage();
    } else {
        const isNotRobot = confirm("로봇이 아니라면 아래의 문제를 풀어주세요.");

        if (isNotRobot) {
            const currentDate = new Date();
            const correctAnswer = currentDate.getMonth() + 1 + currentDate.getDate();

            const answer = prompt(`현재 날짜(월 + 일)는?`);

            if (answer !== null) {
                const userAnswer = parseInt(answer);

                if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
                    localStorage.setItem('hasAnsweredRobotQuestion', 'true');
                    loadPage();
                } else {
                    alert("틀렸습니다! 다시 문제를 풀어주세요.");
                    date_loader();
                }
            } else {
                alert("문제 풀이가 취소되었습니다.");
            }
        } else {
            alert("로봇입니다. 페이지에 접속할 수 없습니다.");
        }
    }
};

// 현재 날짜 및 시간 표시

const loadPage = () => {
    const currentDate = new Date();
    document.getElementById('date').innerText = `${currentDate.toLocaleDateString()} / ${currentDate.toLocaleTimeString()}`;
    setInterval(() => {
        const currentDate = new Date();
        document.getElementById('date').innerText = `${currentDate.toLocaleDateString()} / ${currentDate.toLocaleTimeString()}`;
    }, 1000);
};


date_loader();


// 갤러리

document.addEventListener("DOMContentLoaded", function () {
    const gallery_container = document.getElementById('gallery_container');

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '이전';
    prevBtn.addEventListener('click', showPrevSlide);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음';
    nextBtn.addEventListener('click', showNextSlide);

    nextBtn.style.marginLeft = '200px';

    gallery_container.appendChild(prevBtn);
    gallery_container.appendChild(nextBtn);

    const gallery = document.getElementById('gallery');
    const slider = document.createElement('div');
    slider.classList.add('slider');

    // 이미지 파일명 배열
    const imageFiles = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png'];

    // 각 이미지를 슬라이드에 추가
    imageFiles.forEach(function (imageFile) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const img = document.createElement('img');
        img.src = `./images/${imageFile}`;
        img.style.width = '100%';
        img.style.height = '100%';

        slide.style.height = '440px';

        slide.appendChild(img);
        slider.appendChild(slide);
    });

    gallery.appendChild(slider);



    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * 100}%)`; // 이미지의 너비
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
        updateSlider();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slider.children.length;
        updateSlider();
    }

    // 초기 슬라이더 위치 설정
    updateSlider();


    // 투두 리스트


    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    addTodoBtn.addEventListener('click', addTodo);

    // 페이지 로드 시 로컬 스토리지에서 할일 목록 불러오기
    loadTodoList();

    function addTodo() {
        const todoText = todoInput.value.trim();

        if (todoText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                        <span>${todoText}</span>
                        <button onclick="removeTodo(this)">삭제</button>
                    `;

            todoList.appendChild(li);
            todoInput.value = '';

            // 추가한 할일 목록을 로컬 스토리지에 저장
            saveTodoList();
        }
    }

    window.removeTodo = function (element) {
        const li = element.parentNode;
        todoList.removeChild(li);

        // 삭제한 후의 할일 목록을 로컬 스토리지에 저장
        saveTodoList();
    };

    function saveTodoList() {
        // 현재 할일 목록을 배열로 저장
        const todoItems = Array.from(todoList.children).map(li => li.querySelector('span').textContent);
        // 배열을 문자열로 변환하여 로컬 스토리지에 저장
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }

    function loadTodoList() {
        // 로컬 스토리지에서 할일 목록을 가져오기
        const storedTodoItems = localStorage.getItem('todoItems');
        if (storedTodoItems) {
            // 가져온 문자열을 배열로 변환하여 할일 목록에 추가
            const todoItems = JSON.parse(storedTodoItems);
            todoItems.forEach(todoText => {
                const li = document.createElement('li');
                li.innerHTML = `
                            <span>${todoText}</span>
                            <button onclick="removeTodo(this)">삭제</button>
                        `;
                todoList.appendChild(li);
            });
        }
    }
});

// 갤러리 열고 닫기

function toggleGallery() {
    gallery = document.getElementById('gallery_container');

    // 갤러리 컨테이너의 너비를 토글
    if (gallery.style.width === '0px' || gallery.style.width === '') {
        gallery.style.width = '500px';
        gallery.style.height = '500px';
    } else {
        gallery.style.width = '0px';
        gallery.style.height = '0px';
    }
}

// 페이지 이동

const go = (link) => {
    window.location.href = `./${link}.html`;
}


// 가계부

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accountForm');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const accountList = document.getElementById('accountList');
    const searchButton = document.getElementById('searchButton');
    const searchDate = document.getElementById('searchDate');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addAccount(descriptionInput.value, amountInput.value);
        descriptionInput.value = '';
        amountInput.value = '';
    });

    function addAccount(description, amount) {
        const account = { description, amount, date: new Date().toLocaleString() };
        const accounts = getAccounts();
        accounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        displayAccounts();
    }

    function getAccounts() {
        const accounts = localStorage.getItem('accounts');
        return accounts ? JSON.parse(accounts) : [];
    }

    function displayAccounts(filterDate = '') {
        const accounts = getAccounts();
        accountList.innerHTML = '';

        filterDateFormatted = filterDate ? formatDate(filterDate) : '';
        console.log(filterDateFormatted);

        accounts.forEach((account, index) => {
            if (!filterDateFormatted || account.date.startsWith(filterDateFormatted)) {
                const li = document.createElement('li');
                li.textContent = `${account.date} - ${account.description}: ${account.amount}원`;

                // 삭제 버튼 추가
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.style.width = '50px';
                deleteButton.style.height = '25px';
                deleteButton.onclick = function () { deleteAccount(index); };
                li.appendChild(deleteButton);

                accountList.appendChild(li);
            }
        });
    }

    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month, day].join('. ') + '.';
    }

    function deleteAccount(index) {
        const accounts = getAccounts();
        accounts.splice(index, 1);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        displayAccounts(searchDate.value); // 현재 필터에 맞게 다시 목록 표시
    }

    searchButton.addEventListener('click', () => {
        displayAccounts(searchDate.value);
    });



    displayAccounts();
});



// 테트리스 게임

window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
    }
});

const canvas = document.getElementById('tetrisCanvas');
const context = canvas.getContext('2d');

const ROWS = 20;
const COLUMNS = 10;
const BLOCK_SIZE = 30;

const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill({ color: null }));

const pieces = [
    { shape: [[1, 1, 1, 1]], color: '#ff5733' }, // Red
    { shape: [[1, 1], [1, 1]], color: '#3498db' }, // Blue
    { shape: [[1, 1, 1], [0, 1, 0]], color: '#2ecc71' }, // Green
    { shape: [[1, 1, 1], [1, 0, 0]], color: '#f39c12' }, // Orange
    { shape: [[1, 1, 1], [0, 0, 1]], color: '#9b59b6' }, // Purple
    { shape: [[1, 1, 0], [0, 1, 1]], color: '#e74c3c' }, // Red
    { shape: [[0, 1, 1], [1, 1, 0]], color: '#34495e' } // Dark Gray
];

let currentPiece;
let currentRow = 0;
let currentCol = 0;
let gameInterval;

const tetrisContainer = document.getElementById('tetrisContainer');
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    canvas.style.display = 'block';
    resetGame();
    gameInterval = setInterval(() => {
        moveDown();
        draw();
    }, 1000);
}

let score = 0;  // 스코어 초기값 설정

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
    drawScore();  // 스코어 그리기 추가
}

function drawScore() {
    context.fillStyle = '#000';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 30);
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (board[row][col].color) {
                context.fillStyle = board[row][col].color;
                context.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

function drawPiece() {
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    context.fillStyle = currentPiece.color;
                    context.fillRect(
                        (currentCol + col) * BLOCK_SIZE,
                        (currentRow + row) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            }
        }
    }
}

function moveDown() {
    if (isValidMove(1, 0)) {
        currentRow++;
    } else {
        placePiece();
        clearRows();
        spawnPiece();
    }
}

function moveLeft() {
    if (isValidMove(0, -1)) {
        currentCol--;
    }
}

function moveRight() {
    if (isValidMove(0, 1)) {
        currentCol++;
    }
}

function rotate() {
    const rotatedPiece = rotateMatrix(currentPiece.shape);
    if (isValidMove(0, 0, { shape: rotatedPiece, color: currentPiece.color })) {
        currentPiece.shape = rotatedPiece;
    }
}

function isValidMove(rowOffset, colOffset, piece = currentPiece) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (
                piece.shape[row][col] &&
                (board[currentRow + row + rowOffset] &&
                    board[currentRow + row + rowOffset][currentCol + col + colOffset].color) !== null
            ) {
                return false;
            }
        }
    }
    return true;
}

function placePiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                board[currentRow + row][currentCol + col] = { color: currentPiece.color };
            }
        }
    }
}

function clearRows() {
    const fullRows = board.filter((row) => row.every((cell) => cell.color !== null));
    score += fullRows.length * 10;  // 한 줄 당 10점 추가
    fullRows.forEach((fullRow) => {
        const index = board.indexOf(fullRow);
        board.splice(index, 1);
        board.unshift(Array(COLUMNS).fill({ color: null }));
    });
}

function spawnPiece() {
    currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
    currentRow = 0;
    currentCol = Math.floor((COLUMNS - currentPiece.shape[0].length) / 2);

    if (!isValidMove(0, 0)) {
        // Game over if new piece cannot be placed
        alert('Game Over!');
        clearInterval(gameInterval);
        startBtn.style.display = 'block';
        startBtn.style.position = 'absolute';
        startBtn.style.top = '50%';
        startBtn.style.left = '50%';
        startBtn.style.transform = 'translate(-50%, -50%)';

    }
}

function resetGame() {
    board.forEach((row) => row.fill({ color: null }));
    score = 0;  // 게임 리셋 시 스코어 초기화
    spawnPiece();
}

function rotateMatrix(matrix) {
    const result = matrix[0].map((_, colIndex) =>
        matrix.map((row) => row[colIndex]).reverse()
    );
    return result;
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            rotate();
            break;
    }
    draw();
});