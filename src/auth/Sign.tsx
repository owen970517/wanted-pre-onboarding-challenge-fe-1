import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../types/user';
import { useMutation } from 'react-query';
import { createUser } from '../api';
import LoadingAndError from '../error-loading/LoadingAndError';
import LoginError from './LoginError';
import Loginloading from './Loginloading';

const Sign = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const CreateUser  = useMutation(createUser , {
    onSuccess : (data)=> {
      alert(data.message);
      nav('/login');
    }
  })
  const onSubmit = async (props : IForm) => {
    CreateUser.mutate({ id: props.id, password: props.password } , {
      onError : (error:any) => {
        return error?.response?.data && error.response.data.details
      }
    })
  };
  return (
    <LoadingAndError errorFallback={<LoginError/>} loadingFallback={<Loginloading/>}>
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
          <h3>회원가입</h3>
            <Input
              {...register('id', {
                required: {value : true , message : '아이디를 입력하시오'},
                maxLength: 30,
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: '올바른 이메일 형식을 입력하시오',
                },
              })}
              type="text"
              placeholder="아이디"
              isError ={errors.id ? 'red' : ''}
            ></Input>
          {errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
            <Input
              {...register('password', {
                required: {value : true , message : '비밀번호를 입력하시오'},
                minLength: {value : 7 , message :'7자리 이상 입력하시오'},
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  message: '특수문자 , 대문자 , 숫자를 포함하시오',
                },
              })}
              type="password"
              placeholder="비밀번호"
              isError ={errors.password ? 'red' : ''}
            ></Input>
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
          <button>가입하기</button>
        </Wrapper>
    </LoadingAndError>
  );
}
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Input = styled.input<{isError : string}>`
  border: 1px solid black;
  margin: 10px 10px;
  width: 500px;
  height: 50px;
  padding: 10px;
  border-color: ${props => props.isError};
`;


export default Sign