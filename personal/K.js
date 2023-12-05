
document.addEventListener("DOMContentLoaded", function () {
    const gallery_container = document.getElementById('gallery_container');

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '이전';
    prevBtn.addEventListener('click', showPrevSlide);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음';
    nextBtn.addEventListener('click', showNextSlide);

    nextBtn.style.marginLeft = '100px';

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
            todoInput.value = ''; // 입력 필드 초기화

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

