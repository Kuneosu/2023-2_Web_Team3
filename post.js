let cnt = 1;
let date = new Date();
date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
function a() {
    let writer = f.writer.value;
    let pwd = f.pwd.value;
    let content = f.content.value;
    let el = mkDiv(writer, pwd, content);
    let list = document.getElementById("list");
    list.appendChild(el);
    f.writer.value = "";
    f.pwd.value = "";
    f.content.value = "";
}
function mkDiv(writer, pwd, content) {
    let newDiv = document.createElement("div");
    newDiv.id = "d_" + cnt;
    newDiv.pwd = pwd;
    let html = "";
    html += "작성자 &emsp;:&ensp;<span id='w_" + cnt + "'>" + writer + "</span><br/>";
    html += "작성일자 :&ensp;<span id='n_" + cnt + "'>" + date + "</span><br/>";
    html += "내용 &emsp;&emsp;:&ensp;<span id='c_" + cnt + "'>" + content + "</span><br/>";
    html += "<input type='button' value='수정' onclick=editForm(" + cnt + ")>";
    html += "<input type='button' value='삭제' onclick=del(" + cnt + ")>";
    newDiv.innerHTML = html;
    cnt++;
    return newDiv;
}


function editForm(cnt) {
    let editDiv = document.getElementById("d_" + cnt);
    let editForm = document.getElementById("editf");
    editDiv.appendChild(editForm);
    let writer = document.getElementById("w_" + cnt).innerHTML;
    let content = document.getElementById("c_" + cnt).innerHTML;
    document.getElementById("editwriter").value = writer;
    document.getElementById("editcontent").value = content;
    document.getElementById("editbtn").cnt = cnt;
    editForm.style.display = '';
}
function cancel() {
    let editForm = document.getElementById("editf");
    editForm.style.display = 'none';
    document.getElementsByTagName("body")[0].appendChild(editForm);
}
function edit() {
    let cnt = document.getElementById("editbtn").cnt;
    let editDiv = document.getElementById("d_" + cnt);
    let pwd2 = document.getElementById("editpwd").value;
    if (editDiv.pwd != pwd2) {
        alert("글 비밀번호 불일치. 수정불가");
    } else {
        let newWriter = document.getElementById("editwriter").value;
        let newContent = document.getElementById("editcontent").value;
        let newDate = date;
        document.getElementById("w_" + cnt).innerHTML = newWriter;
        document.getElementById("n_" + cnt).innerHTML = newDate;
        document.getElementById("c_" + cnt).innerHTML = newContent;
    }
    document.getElementById("editwriter").value = "";
    document.getElementById("editcontent").value = "";
    document.getElementById("editpwd").value = "";
    cancel();
}
function del(cnt) {
    let pwd = prompt("글 비밀번호");
    let delDiv = document.getElementById("d_" + cnt);
    if (pwd == delDiv.pwd) {
        document.getElementById("list").removeChild(delDiv);
    } else {
        alert("글 비밀번호 불일치. 삭제취소");
    }
}
