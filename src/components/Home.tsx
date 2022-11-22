import React from 'react';
import styled from 'styled-components';
import { IToDo } from '../types/todo';
import {  getToDos} from '../api';
import {  useDispatch, useSelector } from 'react-redux';
import AddToDo from '../todo/AddToDo';
import { modalActions } from '../store/modalSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RootState } from '../store/store';
import ToDosList from '../todo/ToDosList';
import { useQuery } from 'react-query';

function Home() {
  const isLogin = useSelector((state:RootState) => state.auth.isLogin);
  const isModal = useSelector((state:RootState) => state.modal.isModal);
  const dispatch = useDispatch();
  const {data:myToDos , isLoading } = useQuery(['todos'] , getToDos);
  const onModalOpen = () => {
    dispatch(modalActions.open());
  }
  return (
    <>
      {isLogin && 
        <AddDiv>
          <AddBtn onClick={onModalOpen}></AddBtn>
        </AddDiv>
      }
      <ToDoBox>
        {isLoading && <h1>Loading...</h1>}
        {isLogin ? myToDos?.data.map((todo : IToDo) => {
          return (
            <ToDosList key={todo.id} id={todo.id!} title={todo.title} content={todo.content}/>
          )
        }) : 
        <>
          <h1>로그인을 해야 사용가능합니다.</h1>
        </>}
      </ToDoBox>
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
  background-color: #fff;
  padding: 30px 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  width: 100%;
  position: relative;
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
