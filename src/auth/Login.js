import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (props) => {
    fetch('http://localhost:8080/users/login' , {
      method : 'POST' ,
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        email : props.id,
        password : props.password
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      localStorage.setItem(
        'preonboarding',
        JSON.stringify({
          token : data.token
        })); 
    }) 
/*     const response = await fetch('http://localhost:8080/users/login' , {
      method : 'POST' , 
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        email : props.id,
        password : props.password
      })
    })
    const data = response.json();
    console.log(data); */
    nav('/');
  };
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>로그인 페이지</h3>
      {errors.id ? (
        <Input
          style={{ border: '1px solid red' }}
          {...register('id', {
            required: true,
            maxLength: 30,
          })}
          type="text"
          placeholder="아이디"
        ></Input>
      ) : (
        <Input
          {...register('id', {
            required: true,
            maxLength: 30,
          })}
          type="text"
          placeholder="아이디"
        ></Input>
      )}
      {errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
      {errors.password ? (
        <Input
          style={{ border: '1px solid red' }}
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          type="password"
          placeholder="비밀번호"
        ></Input>
      ) : (
        <Input
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          type="password"
          placeholder="비밀번호"
        ></Input>
      )}
      {errors.password && (
        <p style={{ color: 'red' }}>{errors.password.message}</p>
      )}
      <button>로그인</button>
    </Wrapper>
  );
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

export default Login;
