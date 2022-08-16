import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IToDo } from '../types/todo';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteToDo, getToDos, postToDos } from '../api';

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const user = localStorage.getItem('preonboarding');
  const {register , handleSubmit , setValue } = useForm<IToDo>();
  const {data:myToDos , isLoading } = useQuery('todos' , getToDos);
  const queryClient = useQueryClient();
  const Addmutation = useMutation(postToDos, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setValue('title','');
      setValue('content','');
    },
  });
  const DeleteMutation = useMutation(deleteToDo , {
    onSuccess : () => {
      queryClient.invalidateQueries('todos');
    }
  })
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);
  const onSubmit =  (props : IToDo) => {
    Addmutation.mutate({ title : props.title , content : props.content })
  }
  const onDelete = (id:IToDo) => {
    DeleteMutation.mutate(id);
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
        {isLoading && <h1>Loading...</h1>}
        {isLogin ? myToDos?.data.map((todo : IToDo) => {
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
