# 프리온보딩 프론트엔드 챌린지 사전 과제

- useForm Hook을 사용하여 회원가입, 로그인 페이지 구현 
- css는 styled components를 사용하였습니다.
- todo를 추가, 삭제, 수정 기능을 구현했습니다.

## 설치 방법 및 실행

- git clone https://github.com/owen970517/wanted-pre-onboarding-challenge-fe-1.git
- npm start

## 사용한 라이브러리

- ReactJS
- TypeScript 
- styled-components
- React Query
- react-hook-form (useForm)
- react-router-dom

## 사전 구현 과제

Login / SignUp 

- /auth 경로에 로그인, 회원가입 기능 개발  ☑️ 
- 이메일, 비밀번호에 대한 유효성 검사  ☑️ 
- 로그인 API 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동 |☑️ 

ToDo List  

- Todo List API를 호출하여 db에 존재하는 Todo 목록 보여주기 ☑️ 
- Todo List API를 호출하여 db에 Todo 추가하기 ☑️ 
- Todo List API를 호출하여 선택한 Todo 삭제하기 ☑️ 
- Todo List API를 호출하여 선택한 Todo 수정하기  ☑️ 



## 1-1주차 과제 

- 자바스크립트로 만든 프로젝트를 타입스크립트로 개선하였습니다.
- todo 삭제 시 alert창을 띄워 정말 삭제할 것인지 확인하도록 만들었습니다.
- 로그인 했을 때만 todolist를 생성할 수 있도록 만들었습니다.
- todo 수정할 때 현재 값을 보여주도록 개선했습니다.

## 1-2주차 과제

- React-Query를 사용하여 api 데이터를 fetch 했습니다.
- React-Query의 useMutataion을 사용해서 update, delete, create를 다루었습니다.

## React-Query를 사용하며 느낀점 

- useEffect, useState를 사용하지 않아도 되기 때문에 코드의 양이 줄일 수 있었습니다.
- isloading, isError, isFetching 같은 동작의 상태에 대한 값을 갖고 있어서 기능을 구현하기 편합니다.


