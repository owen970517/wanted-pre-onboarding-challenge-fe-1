import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

function Header({isLogin}) {
  const nav = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem('preonboarding');
    nav('/login');
  };

  return (
    <Wrapper>
      <Title>Logo</Title>
      <UL>
        <LI>
          <StyledLink to="/">Home</StyledLink>
          <Link to="/sign">회원가입</Link>
        </LI>
        {isLogin && <button onClick={onLogOut}>로그아웃</button>}
        {!isLogin &&  <LI>
            <Link to="/login">로그인</Link>
          </LI>}
      
      </UL>
    </Wrapper>
  );
}

const Title = styled.h1`
  font-size: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: space-between;
  }
`;

const UL = styled.ul`
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
    display: none;
  }
`;
const LI = styled.li`
  margin-left: 10px;
  font-size: 30px;
`;

const Input = styled.input`
  border: 1px solid black;
  padding: 10px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: #000;
`;

export default Header;
