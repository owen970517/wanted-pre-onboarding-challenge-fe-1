import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todos , setTodos] = useState([]);
  const nav = useNavigate();
  let token = localStorage.getItem('preonboarding') || '';
  const {register , handleSubmit} = useForm();
  const onSubmit =  (props) => {
    fetch('http://localhost:8080/todos' , {
      method : 'POST' , 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      },
      body : JSON.stringify({
        title : props.title,
        content : props.content
      })
    }).then((response) => { response.json()}).then((data) => {console.log(data)});
  }
  useEffect(() => {
    fetch('http://localhost:8080/todos' , {
      method : 'GET' , 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      }
    }).then((response) => response.json()).then((data)=> setTodos(data.data));
  },[ token, todos ])
  const onDelete = (id) => {
    console.log(id) 
    fetch('http://localhost:8080/todos/' + id , {
      method : 'DELETE' , 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      }
    })
  }
  const onModify = (id) => {
    nav('/modify/' + id)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type='text'
              {...register('title', {
                required: true,
                maxLength: 30,
              })} 
              placeholder='title'
        ></Input>
                <Input type='text'
              {...register('content', {
                required: true,
                maxLength: 30,
              })} 
              placeholder='content'
        ></Input>
        <button>추가</button>
      </form>
      <ToDoList>
        {todos.map((todo) => {
          return (
            <ToDo key={todo.id}>
              <h2>{todo.content}</h2>
              <button onClick={()=> { onModify(todo.id)}}>수정하기</button>
              <button onClick={()=> { onDelete(todo.id)}}>삭제하기</button>
            </ToDo>
          )
        })}
      </ToDoList>
    </div>
  );
}
const Input = styled.input`
  border: 1px solid black;
  margin: 10px 10px;
  width: 500px;
  height: 50px;
  padding: 10px;
`;

const ToDoList = styled.div`
  text-align: center;
`
const ToDo = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding : 10px;
`
export default Home;
