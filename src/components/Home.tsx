import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IToDo } from '../types/todo';

function Home() {
  const [todos , setTodos] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const user = localStorage.getItem('preonboarding');
  const nav = useNavigate();
  let token = localStorage.getItem('preonboarding') || '';
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);
  const {register , handleSubmit , setValue} = useForm<IToDo>();
  const onSubmit =  (props : IToDo) => {
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
    setValue('title' , '');
    setValue('content','');
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
  const onDelete = async (id:IToDo) => {
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
  const onModify = (id : IToDo) => {
    nav('/modify/' + id)
  }
  return (
    <div>
      {isLogin &&      
       <Wrapper onSubmit={handleSubmit(onSubmit)}>
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
      </Wrapper>}
      <ToDoList>
        {isLogin ? todos.map((todo : IToDo) => {
          return (
            <ToDo key={todo.id}>
              <h2>제목 : {todo.title}</h2>
              <h2>내용 : {todo.content}</h2>
              <Buttons>
                <button onClick={()=> { onModify(todo.id)}}>수정하기</button>
                <button onClick={()=> { onDelete(todo.id)}}>삭제하기</button>
              </Buttons>
            </ToDo>
          )
        }) : 
        <>
          <h1>로그인을 해야 사용가능합니다.</h1>
        </>}
      </ToDoList>
    </div>
  );
}

const Wrapper = styled.form`
  display : flex;
  justify-content: center;
  align-items : center;
`
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding : 10px;
`
const Buttons = styled.div`
  display : flex;
  margin-top : 10px;
`
export default Home;
