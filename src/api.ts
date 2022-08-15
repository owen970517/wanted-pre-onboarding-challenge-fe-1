import { IToDo } from "./types/todo";

let token = localStorage.getItem('preonboarding') || '';

export const getToDos =  async () => {
    const response = await fetch('http://localhost:8080/todos', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    });
    return await response.json();
}

export const postToDos = (props : IToDo) => {
    return fetch('http://localhost:8080/todos' , {
        method : 'POST' , 
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token,
        },
        body : JSON.stringify({
          title : props.title,
          content :props.content
        })
      }).then((response) => { response.json()})
}

export const deleteToDo = async (id:IToDo) => {
  const ok = window.confirm("정말 삭제하시겠습니까??");
  if (ok) {
    await fetch('http://localhost:8080/todos/' + id , {
      method : 'DELETE' , 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      }
    })
  } 
}