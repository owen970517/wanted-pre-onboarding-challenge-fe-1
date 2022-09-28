import React ,{useState}from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteToDo } from '../api'
import { IToDo } from '../types/todo'

const ToDosList = (props :IToDo) => {
  const nav = useNavigate();
  const [checked , setChecked] =useState<string[]>([]);
  const getCheckedList = JSON.parse(localStorage.getItem('checkedList') as string) || [] ;
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation(deleteToDo , {
    onSuccess : () => {
      queryClient.invalidateQueries('todos');
    }
  })
  const onDelete = (id:string) => {
    DeleteMutation.mutate(id)
    localStorage.setItem('checkedList' , JSON.stringify(getCheckedList.filter((d:string) => d !== id )));
  }
  const onModify = (id :string) => {
    nav('/modify/' + id);
  }
  const onChecked = (checkedList:string[]) => {
    setChecked(checkedList)
  }
  const changeCheckHandler = (e:React.ChangeEvent<HTMLInputElement> , id:string) => {
    if(e.target.checked) {
      onChecked([...checked, id]);
      localStorage.setItem('checkedList' , JSON.stringify([...getCheckedList,id])); 
    } else {
      onChecked(checked.filter((d:string) => d !== id))
      localStorage.setItem('checkedList' , JSON.stringify(getCheckedList.filter((d:string) => d !== id)));
    }
  }
  const completeToDo = (id:string) => getCheckedList?.includes(id) ? 'line-through' : 'none';
  return (
    <ToDoBox key={props.id}>
    <input id={props.id} type='checkbox' onChange={(e) => changeCheckHandler(e,props.id!)} checked={getCheckedList?.includes(props.id) ? true : false }></input>
    <ToDo onClick={()=> { onModify(props.id!)}}>
      <h2 style={{textDecoration : completeToDo(props.id!)}}>{props.title}</h2>
      <h2 style={{textDecoration : completeToDo(props.id!)}}>{props.content}</h2>
    </ToDo>
    <Buttons>
      <button style={{backgroundColor: 'transparent' , cursor:'pointer'}} onClick={()=> { onDelete(props.id!)}}>❌</button>
    </Buttons>
  </ToDoBox>
  )
}
const ToDoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
export default React.memo(ToDosList)