# 프리온보딩 프론트엔드 챌린지

## 설치 방법 및 실행

- git clone https://github.com/owen970517/wanted-pre-onboarding-challenge-fe-1.git
- npm install
- npm start

## 사용한 라이브러리

- ReactJS
- TypeScript 
    - 좋은 자동완성과 안전한 개발을 위해 사용
- styled-components
    - UI 컴포넌트를 작성하기 위해 사용
- React Query
    - 비동기 데이터를 효과적으로 관리하기 위해 사용
- react-hook-form (useForm)
    - 효율적인 Form을 구현하기 위해 사용
- react-router-dom
- useNavigate
    - 페이지 전환 시 파라미터를 전달하기 위해 사용 (ex 특정 todo의 modify)
- useParams
    - query string의 매개변수 값을 받아오기 위해 사용 (ex todo의 id값)
- redux toolkit
    - 상태관리를 위해 사용 

## 사전 구현 과제

Login / SignUp 

- /auth 경로에 로그인, 회원가입 기능 개발 ☑️ 
- 이메일, 비밀번호에 대한 유효성 검사  ☑️ 
- 로그인 API 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동 ☑️ 

ToDo List  

- Todo List API를 호출하여 db에 존재하는 Todo 목록 보여주기 ☑️ 
- Todo List API를 호출하여 db에 Todo 추가하기 ☑️ 
- Todo List API를 호출하여 선택한 Todo 삭제하기 ☑️ 
- Todo List API를 호출하여 선택한 Todo 수정하기  ☑️ 

## 1-1주차 과제 

- 자바스크립트로 만든 기존 프로젝트를 타입스크립트로 개선 ☑️ 
- 기존 프로젝트에 다양한 기능 추가 및 개선 ☑️

## 1-2주차 과제 (React-Query를 사용하여 api호출)

- 기존의 프로젝트를 react-query를 사용하여 개선☑️

## 2-1주차 과제 

- README 작성 및 코드 정리 ☑️ 
- 설치, 환경설정 및 실행 방법 작성 ☑️ 
- 최종 구현 화면 이미지/ 동영상으로 제공
- 폴더 구조 tree 형태로 설명 
- 과제 진행 시 주안점 
- 개선 사항

## 추가로 개선한 점 

- todo 삭제 시 alert창을 띄워 정말 삭제할 것인지 확인하도록 만듦 
- 로그인 했을 때만 todolist를 생성할 수 있도록 만듦 
- todo 수정할 때 현재 값을 보여주도록 개선 
- Redux-toolkit을 사용하여 상태 관리 
- 체크박스를 추가하여 완료한 todo를 알 수 있도록 만듦
- React-Query를 사용하여 ToDo API 호출 
- React-Query의 useMutataion을 사용해서 todo의 CRUD 구현 
- React.memo를 사용하여 props가 변한 것만 리렌더링 하도록 개선 

## 챌린지를 하면서 느낀 점 

- 올바른 README 작성과 폴더 설계 방법을 배워 주니어 개발자로서 더 발전할 수 있었습니다. 
- React-Query를 사용하여 useEffect, useState를 사용하지 않아도 되기 때문에 코드의 양이 줄일 수 있었습니다.
- React-Query에 isloading, isError, isFetching 같은 동작의 상태에 대한 값을 갖고 있어서 해당 기능을 구현하기 편했습니다.
 