import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components'
import { postToDos } from '../api/api';
import { IToDo } from '../types/todo';
import { GrClose } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modalSlice';
const AddToDo = () => {
  const dispatch = useDispatch();
  const {register , handleSubmit , setValue } = useForm<IToDo>();
  const queryClient = useQueryClient();
  const Addmutation = useMutation(postToDos, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setValue('title','');
      setValue('content','');
      dispatch(modalActions.close());
    },
  });
  const onSubmit =  (props : IToDo) => {
    Addmutation.mutate({ title : props.title , content : props.content });
  }
  const onModalClose = () => {
    dispatch(modalActions.close());
  }
  return (
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <h1>할 일 추가하기</h1>
        <CloseBtn onClick={onModalClose}></CloseBtn>
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
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display : flex;
  justify-content: center;
  align-items : center;
  flex-direction: column;
`
const Input = styled.input`
  border: 1px solid black;
  margin: 10px 10px;
  width: 50%;
  height: 50px;
  padding: 10px;
`;
const CloseBtn = styled(GrClose)`
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    width: 2rem;
    cursor: pointer;
    color : blue;
`
export default AddToDo