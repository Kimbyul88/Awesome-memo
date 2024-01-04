from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:str
    content:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo): #Memo클래스를 memo라는 참조변수로 가져온다.
    memos.append(memo) # 배열에 Memo클래스인 변수 memo를 넣어준다.
    return "메모추가성공"

@app.get("/memos")
def read_memo():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id ==req_memo.id:
            memo.content=req_memo.content
            return "성공했습니다"
    return "그런메모는 없습니다."
    
 
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index,memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)
            return "성공했습니다"
    return "그런메모는 없습니다."

#api주소에("/") static폴더 안에 있는 것들을 구현한다.
app.mount("/", StaticFiles(directory='static', html=True),name="static")