function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul"); // ul
  const li = document.createElement("li"); //li 를 만든다.
  li.innerText = `[id:${memo.id}] ${memo.content}`; // li안을 생성.

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.addEventListener("click", deleteMemo);
  deleteBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  console.log("why?");
  ul.appendChild(li); //ul에 li를 하나하나씩 추가. (html에 추가하였으므로 페이지에 디스플레이됨!)
}

async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //바디 안의 형태로 서버에 데이터를 추가할것이다.
      id,
      content: editInput,
    }), //stringify는 괄호안의 것을 문자열로 바꿈.
  });
  readMemo(); //제대로 없데이트 됐는지 확인..
}

async function deleteMemo(event) {
  const idd = event.target.dataset.id;
  const res = await fetch(`/memos/${idd}`, {
    method: "DELETE",
  }); //body로 추가적인 정보전달은 안함.
  console.log(idd);
  readMemo(); //제대로 없데이트 됐는지 확인..
}

async function readMemo() {
  const res = await fetch("/memos"); //디폴트로 겟요청이 간다. (서버에서 데이터를 겟한다.)
  const jsonRes = await res.json(); //응답
  const ul = document.querySelector("#memo-ul"); //ul을 한번 불러와서
  ul.innerHTML = ""; //ul 안을 초기화(프론트 엔드로 보이는 부분!)
  //jsonRes = [{id:123,content:'블라블라'}]
  jsonRes.forEach(displayMemo); //읽고, 이젠 하나하나 출력한다. (디스플레이)
}

async function createMemo(value) {
  //async는 await fetch를 위함
  //await fetch는 서버에 데이터를 생성한다..
  const res = await fetch("/memos", {
    method: "POST", //Create단계, 즉 등록을 해야하기 때문에 겟이 아니라 포스트를 사용.
    //서버에 데이터를 포스트한다.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //바디 안의 형태로 서버에 데이터를 추가할것이다.
      id: new Date(),
      content: value,
    }), //stringify는 괄호안의 것을 문자열로 바꿈.
  });
  //console.log(typeof new Date().getTime());
  readMemo(); //서버에 있는 메모의 값을 읽는 단계!!
}

//createMemo함수에 인풋받은 값을 전달하는 함수.
function handleSubmit(event) {
  event.preventDefault(); //디폴트값인 '새로고침하기'를 방지한다.
  const input = document.querySelector("#memo-input"); //form 중 특히 input태그로 진입한다.
  //console.log("inputvalue" + input.value);
  createMemo(input.value); // 크리에이트메모함수에 인풋값을 넘겨준다.
  input.value = ""; //인풋박스의 텍스트를 비워준다.
}

const form = document.querySelector("#memo-form");
//form태그 속에 submit(버튼)이 발생하면 handleSubmit 함수를 실행한다.
form.addEventListener("submit", handleSubmit);
readMemo(); //맨처음에 서버에있는 데이터값 불러옴
