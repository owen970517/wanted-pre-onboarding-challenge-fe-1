import { IToDo } from "./types/todo";
import { IForm } from "./types/user";

let token = localStorage.getItem('preonboarding') || '';

export const createUser = async (props :IForm) => {
  const response = await fetch('http://localhost:8080/users/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: props.id,
      password: props.password
    })
  });
  return await response.json();
}

export const postLogin = async (props : IForm) => {
  const response = await fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: props.id,
      password: props.password
    })
  });
  const data = await response.json();
  return data;
}

export const getToDos = async () => {
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

export const getToDoById = (id:string) => {
  return fetch('http://localhost:8080/todos/'+ id  , {
    method : 'GET' , 
    headers: {
      "Content-Type": "application/json",
      "Authorization" : token       
    },
  }).then(response => response.json())
}

export const modifyToDo = ( props:IToDo) => {
  return fetch('http://localhost:8080/todos/'+ props.id , {
    method : 'PUT' ,
    headers: {
      "Content-Type": "application/json",
      "Authorization" : token
    },
    body : JSON.stringify({
      title : props.title,
      content : props.content,
      updatedAt : props.updatedAt
    })
  }).then(response => response.json())
}