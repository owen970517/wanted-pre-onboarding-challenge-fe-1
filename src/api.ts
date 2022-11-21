import axios from "axios";
import { IToDo } from "./types/todo";
import { IForm } from "./types/user";

let token = localStorage.getItem('preonboarding') || '';

export const createUser = async (props :IForm) => {
  try {
    const response = await axios.post('http://localhost:8080/users/create', {
      email: props.id,
      password: props.password
    })
    return await response.data
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.details);
    }
  }
}

export const postLogin = async (props : IForm) => {
  try {  
    const response = await axios.post('http://localhost:8080/users/login' , {
    email: props.id,
    password: props.password
  })
  return await response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.details);
    }
  }
}

export const getToDos = async () => {
    const response = await axios.get('http://localhost:8080/todos', {
      headers : { "Authorization": token, }
    })
    if (response.status === 200) {
      const data = response.data
      return data
    }
  }

export const postToDos = async (props : IToDo) => {
  await axios.post('http://localhost:8080/todos' , {
      title: props.title,
      content: props.content
    }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    }
})
}

export const deleteToDo = async (id:string) => {
  const ok = window.confirm("정말 삭제하시겠습니까??");
  if (ok) {
    await axios.delete('http://localhost:8080/todos/' + id , {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      }
    })
  } 
}

export const getToDoById = async (id:string) => {
 try {
    const response = await axios.get('http://localhost:8080/todos/' + id , {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    })
    return await response.data
 } catch (err) {
    if(axios.isAxiosError(err) && err.response) {
      console.log(err.response);
    }
 }
}

export const modifyToDo = async ( props:IToDo) => {
  const response = await axios.put('http://localhost:8080/todos/' + props.id, {
      title: props.title,
    content: props.content,
    updatedAt: props.updatedAt
  } , 
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  return await response.data;
}