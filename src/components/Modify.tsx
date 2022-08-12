import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IToDo } from '../types/todo';



const Modify = () => {
    const params = useParams();
    const nav = useNavigate();
    const [todo , setTodo] = useState<IToDo>();
    const {register , handleSubmit ,setValue} = useForm<IToDo>();
    setValue('title' , todo?.title)
    setValue('content' , todo?.content)
    let token = localStorage.getItem('preonboarding') || '';
    useEffect(() => {
      fetch('http://localhost:8080/todos/'+params.id  , {
        method : 'GET' , 
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token       
        },
      }).then(response => response.json()).then(data => setTodo(data.data));
      },[params.id , token])
    const onSubmit = (props:IToDo) => {
        fetch('http://localhost:8080/todos/'+ params.id , {
            method : 'PUT' ,
            headers: {
              "Content-Type": "application/json",
              "Authorization" : token
            },
            body : JSON.stringify({
              title : props.title,
              content : props.content
            })
          }).then(response => response.json())
        nav('/')
    }
  return ( 
    <div>
        <Wrapper onSubmit={handleSubmit(onSubmit)}> 
            <Input           
                {...register('title', {
                required: true,
                minLength: 6,
                })} 
                type='text'
                placeholder='title'></Input>
            <Input
                {...register('content', {
                required: true,
                minLength: 6,
                })}
                type='text'
                placeholder='content'></Input>
            <button>
                수정완료
            </button>
        </Wrapper>
    </div>
  )
}
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Input = styled.input`
  border: 1px solid black;
  margin: 10px 10px;
  width: 500px;
  height: 50px;
  padding: 10px;
`;

export default Modify