import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../types/user';
import { useMutation } from 'react-query';
import { postLogin } from '../api/api';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import LoadingAndError from '../error-loading/LoadingAndError';
import LoginError from './LoginError';
import Loginloading from './Loginloading';
import { IResponse } from '../types/response';


function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const loginMutation = useMutation(postLogin , {
    onSuccess : (getData:IResponse) => {
      if(getData.token) {
        localStorage.setItem(
          'token', getData.token);
        dispatch(authActions.login());
        nav('/');  
      }
    }
  })
  
  const onSubmit = async (props :IForm) => {
    loginMutation.mutate({ id: props.id, password: props.password })
  }

  return (
    <LoadingAndError errorFallback={<LoginError />} loadingFallback={<Loginloading />}>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <h3>로그인 페이지</h3>
          <Input
            {...register('id', {
              required: true,
              maxLength: 30,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: '올바른 이메일 형식을 입력하시오',
              },
            })}
            type="text"
            placeholder="아이디"
          ></Input>
        {errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
        <Input
          {...register('password', {
            required: true,
            minLength: 6,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              message: '특수문자 , 대문자 , 숫자를 포함하시오',
            },
          })}
          type="password"
          placeholder="비밀번호"
        ></Input>
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
        <button>로그인</button>
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

const Input = styled.input`
  border: 1px solid black;
  margin: 10px 10px;
  width: 500px;
  height: 50px;
  padding: 10px;
`;

export default Login;
