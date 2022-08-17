import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getToDoById, modifyToDo } from '../api';
import { IToDo } from '../types/todo';



const Modify = () => {
    const params = useParams();
    const nav = useNavigate();
    const {register , handleSubmit ,setValue} = useForm<IToDo>();
    const {data}= useQuery('todo' , () => getToDoById(params.id as string))
    setValue('title' , data?.data.title)
    setValue('content' , data?.data.content)
    const mutation = useMutation(  modifyToDo , {
      onSuccess: () => {
        nav('/');
      },
    });
    const onSubmit = (props:IToDo) => {
      mutation.mutate({id : params.id , title : props.title , content : props.content})
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