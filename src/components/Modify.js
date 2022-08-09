import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Modify = () => {
    const params = useParams();
    const nav = useNavigate();
    const [todo , setTodo] = useState({});
    const {register , handleSubmit} = useForm();
    let token = localStorage.getItem('preonboarding') || '';
    useEffect(() => {
        fetch('http://localhost:8080/todos/'+params.id  , {
          method : 'GET' , 
          headers: {
            "Content-Type": "application/json",
            "Authorization" : token       
          },
        }).then(response => response.json()).then((data) => setTodo(data.data));
      },[token ,params.id])
      console.log(todo);
    const onSubmit = (props) => {
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
          }).then(response => response.json()).then(data=> console.log(data));
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
                type='text'></Input>
            <Input
                {...register('content', {
                required: true,
                minLength: 6,
                })}
                type='text'></Input>
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