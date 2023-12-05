const date_loader = () => {

    const isNotRobot = confirm("로봇이 아니라면 아래의 문제를 풀어주세요.");

    if (isNotRobot) {
        const currentDate = new Date();
        const correctAnswer = currentDate.getMonth() + 1 + currentDate.getDate(); // 현재 월과 날짜를 더한 값이 정답

        const answer = prompt(`현재 날짜(월 + 일)는?`);

        if (answer !== null) { // 사용자가 취소 버튼을 누르면 null이 반환되므로 체크
            const userAnswer = parseInt(answer);

            if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
                alert("정답입니다! 페이지에 접속할 수 있습니다.");
            } else {
                alert("틀렸습니다! 다시 문제를 풀어주세요.");
                date_loader(); // 로봇이 아닌 경우에는 다시 문제를 푸는 팝업을 띄웁니다.
            }
        } else {
            alert("문제 풀이가 취소되었습니다.");
        }
    } else {
        alert("로봇입니다. 페이지에 접속할 수 없습니다.");
        // 로봇일 때의 처리를 추가할 수 있습니다.
    }

    const currentDate = new Date();
    document.getElementById('date').innerText = `${currentDate.toLocaleDateString()} / ${currentDate.toLocaleTimeString()}`;
    setInterval(() => {
        const currentDate = new Date();
        document.getElementById('date').innerText = `${currentDate.toLocaleDateString()} / ${currentDate.toLocaleTimeString()}`;
    }, 1000);

}

const go = (member) => {
    window.location.href = `./personal/${member}.html`;
}