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
  })
  if (response.ok) {
    return await response.json();
  }else {
    const errorData = await response.json().catch(err => console.log(err));
    alert(errorData.details);
  }
  
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
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json().catch(err => console.log(err));
    alert(errorData.details);
  }
}

export const getToDos = async () => {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const errorData = await response.json().catch(err => console.log(err));
      alert(errorData.details);
    }
}

export const postToDos = async (props : IToDo) => {
    const response = await fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      title: props.title,
      content: props.content
    })
  });
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

export const getToDoById = async (id:string) => {
  const response = await fetch('http://localhost:8080/todos/' + id, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data
  } 
}

export const modifyToDo = async ( props:IToDo) => {
  const response = await fetch('http://localhost:8080/todos/' + props.id, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      title: props.title,
      content: props.content,
      updatedAt: props.updatedAt
    })
  });
  return await response.json();
}