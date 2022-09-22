import React , {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IToDo } from '../types/todo';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteToDo, getToDos} from '../api';
import {  useDispatch, useSelector } from 'react-redux';
import AddToDo from './AddToDo';
import { modalActions } from '../store/modalSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RootState } from '../store/store';

function Home() {
  const [checked , setChecked] =useState<string[]>([]);
  const getCheckedList = JSON.parse(localStorage.getItem('checkedList') as any);
  const isLogin = useSelector((state:RootState) => state.auth.isLogin);
  const isModal = useSelector((state:RootState) => state.modal.isModal);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {data:myToDos , isLoading } = useQuery('todos' , getToDos);
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation(deleteToDo , {
    onSuccess : () => {
      queryClient.invalidateQueries('todos');
    }
  })
  const onDelete = (id:IToDo) => {
    DeleteMutation.mutate(id);
  }
  const onModify = (id : IToDo) => {
    nav('/modify/' + id);
  }
  const onModalOpen = () => {
    dispatch(modalActions.open());
  }
  const onChecked = (selected:string[]) => {
    setChecked(selected)
  }
  const changeCheckHandler = (e:React.ChangeEvent<HTMLInputElement> , id:string) => {
    if(e.target.checked) {
      onChecked([...checked, id]);
      localStorage.setItem('checkedList' , JSON.stringify([...checked,id]));
      
    } else {
      onChecked(checked.filter((d:string) => d !== id))
      localStorage.setItem('checkedList' , JSON.stringify(getCheckedList.filter((d:string) => d !== id)));
    }
  }
  const completeToDo = (id:string) => getCheckedList?.includes(id) ? 'line-through' : 'none';
  console.log(getCheckedList);
   
  return (
    <>
      <ToDoList>
        {isLoading && <h1>Loading...</h1>}
        {isLogin ? myToDos?.data.map((todo : IToDo , idx:string) => {
          return (
            <ToDoBox key={todo.id}>
              <input id={todo.id} type='checkbox' onChange={(e) => changeCheckHandler(e,todo.id)} checked={getCheckedList?.includes(todo.id) ? true : false }></input>
              <ToDo onClick={()=> { onModify(todo.id)}}>
                <h2 style={{textDecoration : completeToDo(todo.id)}}>{todo.title}</h2>
                <h2 style={{textDecoration : completeToDo(todo.id)}}>{todo.content}</h2>
              </ToDo>
              <Buttons>
                <button style={{backgroundColor: 'transparent' , cursor:'pointer'}} onClick={()=> { onDelete(todo.id)}}>❌</button>
              </Buttons>
            </ToDoBox>
          )
        }) : 
        <>
          <h1>로그인을 해야 사용가능합니다.</h1>
        </>}
      </ToDoList>
      {isLogin && 
        <AddDiv>
          <AddBtn onClick={onModalOpen}></AddBtn>
        </AddDiv>
      }
      {isModal && 
      <Background>
        <ModalContainer>
          <AddToDo/>
        </ModalContainer>
      </Background>}
    </>
  );
}
const ToDoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 0;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 15vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;

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
  cursor: pointer;
`
const Buttons = styled.div`
  display : flex;
  margin-top : 10px;
`
const AddDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddBtn = styled(AiOutlinePlusCircle)`
  font-size : 50px;
  cursor: pointer;
`
export default Home;
