# 오늘의 워크로그
### 오늘은 회사에서 어떤 일들이 펼쳐질까? 

### 미리 보기
![image1](https://github.com/dmchoi77/worklog/assets/76215166/1870b356-c84d-4e78-8b48-7b52a2aa10ff)
![image2](https://github.com/dmchoi77/worklog/assets/76215166/674caef8-0d68-4d63-b36b-53380c8ce2c5)
------

## 목차

- [프로젝트 설명](#프로젝트-설명)
- [주요 기능](#주요-기능)
- [트러블 슈팅](#트러블-슈팅)


------
## 프로젝트 설명 
* ### 프로젝트 목적
  평소에 회사에서 매일 개인적으로 업무 일지를 작성하며 이슈나 메모 등을 정리해 폴더 및 파일로 관리하고 있었다. 그런데 매일 날짜에 맞는 폴더와 파일들을 생성해야 하는 것이 번거롭고 업무 일지를 생성하는 것을 깜빡하는 날이 있는 등 불편한 점들이 있어 이를 웹으로 만들어 편하게 사용하고자 하여 시작하게 됨

* ### 웹사이트 주소
  https://today.worklog.shop (테스트 계정 ID: 3, PW: 3)
* ### API 명세서 
  [구글 스프레드 시트](https://docs.google.com/spreadsheets/d/1ELjduGpp7mbwTTfVWQHOoaWxEAEbjf6rfnRuwG0GM5Y/edit#gid=0)

* ### 담당
  Backend <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width="28" height="28"> [kwonghyun](https://github.com/kwonghyun/worklog_backend) / Frontend<img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width="28" height="28">[dmchoi77](https://github.com/dmchoi77/worklog)

* ### 개발 기간
  2023.11 ~ 진행중

* ### 기술 스택
  - #### Backend
    - Java, Spring Boot, JPA, MySQL, Nginx, Redis
  - #### Frontend
    - Next.js, TypeScript, React- Query, Zustand, Vercel


------

## 주요 기능

* ### 회원
  - 인증 - 로그인 및 회원가입을 할 수 있습니다.
  - 인가 - 로그인 된 사용자에 한해 서비스를 이용할 수 있습니다.
  - 토큰 재발급 
    - 액세스 토큰 만료 시 axios interceptor와 리프레시 토큰을 이용해 재발급 합니다.
* ### 업무(Work)
  - 사용자는 해당 일의 업무를 생성/조회/수정/삭제 할 수 있습니다.
  - 업무에는 제목, 내용, 업무유형, 진행상태를 포함합니다. 
  - 날짜 별로 업무가 표시되는 순서를 저장 및 변경할 수 있습니다.
  - 제목, 내용을 검색할 수 있습니다.
* ### 메모(Memo)
  - 사용자는 해당 일의 메모를 생성/조회/수정/삭제 할 수 있습니다.
  - 메모에는 내용만 기록할 수 있습니다.
  - 날짜 별로 메모가 표시되는 순서를 저장 및 변경할 수 있습니다.
  - 내용을 검색할 수 있습니다.
* ### 날짜
  - 로그인 성공 후 today 페이지로 이동하며, 오늘의 업무 일지를 작성하는 것을 기본으로 합니다.
  - 업무 또는 메모가 존재하는 날짜에 한하여 왼쪽 네비게이터에 날짜 리스트가 노출 되며, 해당 날짜의 업무 일지로 이동할 수 있습니다. 
<!-- #### 업무 마감 임박 알림(프론트 미구현)
  - 생성된 업무가 알림을 보낼 시간이 지났다면 바로 알림을 전송합니다.
  - 생성된 업무의 알림을 보낼 시간이 24시간 이내라면 알림을 예약합니다.
  - 업무의 생성 또는 수정이 발생하면 알림을 동작할지 확인합니다. -->


## 트러블 슈팅
- ### getServerSideProps 등 SSR에서 axios 사용 시 클라이언트와 인스턴스가 달라서 헤더에 Authorization을 다시 설정해 줘야하는 이슈
  - #### 문제 상황 
    - axios interceptor를 이용해 헤더에 Authorization 토큰을 세팅 해주는 커스텀 axios 모듈 작성 (http.ts) 
    - 로그인 시 커스텀 axios 모듈을 사용해 Authorization에 토큰 세팅
    - getServerSideProps에서 API 호출 시 같은 커스텀 axios 모듈을 사용했는데 헤더에 토큰이 없다고 호출 실패
  - #### 원인
    - 클라이언트와 서버의 axios 인스턴스를 공유할거라 예상했으나 각각의 인스턴스가 생성 되는 것이 문제였음
  - #### 해결 방법
    - 클라이언트와 서버의 axios 인스턴스를 각각 관리하게 되면 토큰 재발급 시 서로 다른 토큰을 가져가게 되며 관리 포인트 또한 늘어날 것으로 생각하였음
    - getServerSideProps에서 axios를 사용할 경우 현재 쿠키에 저장한 토큰을 직접 세팅하도록 하여 클라이언트와 서버가 동일한 토큰을 사용하도록 함
    - ```typescript
      export const getServerSideProps: GetServerSideProps = async (ctx) => {
      http.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;
      ...
      }
    - 만약 getServerSideProps에서 API 호출 시 토큰이 만료되었다면 API 호출을 클라이언트로 위임하고 재발급 또한 클라이언트에서 처리하도록 함.
    - 커스텀 axios 모듈에서 401(액세스 토큰 만료) 에러가 발생했을 때 window의 타입이 undefined이면 서버에서의 호출로 간주해 재발급 로직을 타지 않음
    - ```typescript
      // http.ts
      http.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const {
          response: { status },
        } = error;
        if (status === 401 && !originalRequest._retry) {
          if (typeof window === 'undefined') return;
          ...
        }
        // 토큰 재발급 로직 (reissue)
      },
    );
  - #### 고민
    - 서버사이드 렌더링을 하는 페이지 마다 매번 이렇게 헤더에 토큰을 직접 세팅해주는게 너무 번거롭다는 생각이 들었음. 더 좋은 방법이 있을지 더 공부해 보기로 함


- ### 다중 Axios 요청 및 토큰 재발급 이슈
  - #### 문제 상황
    - 액세스 토큰이 만료된 상태에서 API 요청을 하게 되면 리프레시 토큰을 이용해 액세스 토큰을 재발급 하도록 하고 실패한 API 요청을 재요청 하게 함
    - 단일 API를 요청할 때는 정상적으로 토큰이 재발급 되고 재요청도 제대로 동작 함
    - 새로 고침을 하는 등 여러 개의 API를 동시에 요청하는 상황에서는 토큰은 정상적으로 재발급 되지만 첫 번째 API만 재요청하고 나머지 API들은 재요청 하지 않았음
    - ![axios-multiple-request-1](https://github.com/dmchoi77/worklog/assets/76215166/7ea18d55-6ecc-4344-a970-8e1e7a477578)

  - #### 원인
    - 커스텀 axios 모듈을 작성할 때 토큰이 만료된 상태에서 여러 개의 API를 동시에 요청하는 상황을 고려하지 못함
  - #### 해결 방법
    - 스택오버플로우에서 실패한 API 요청들을 담는 큐를 따로 만들어 관리하면 정상적으로 동작한다는 것을 알게 됨
    - failedQueue라는 배열을 만들어 실패한 호출들을 저장하고 토큰 재발급 이후에 실패한 호출들을 재호출을 하도록 처리 함
    - ```typescript
      // http.ts
      let failedQueue: any[] = [];

      const processQueue = (error: any, token: string | null = null) => {
        failedQueue.forEach((prom) => {
          if (error) {
            prom.reject(error);
          } else {
            prom.resolve(token);
          }
        });
        failedQueue = [];
      };

      ...

      http.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          ...
        try {
            ...
        } catch(error) {
          processQueue(error, null);
        }
        })
    - ![axios-multiple-request-2](https://github.com/dmchoi77/worklog/assets/76215166/bbe61f6b-b569-4dc0-8742-5c302b331778)
    - ref: https://stackoverflow.com/questions/57890667/axios-interceptor-refresh-token-for-multiple-requests
<!-- - getServerSideProps에서 HTTPS 요청 시 정상적으로 동작하지 않는 이슈
  - 문제 상황
    - 브라우저에서 HTTPS 요청을 보냈을 때는 정상적으로 동작했으나, 서버 사이드 렌더링을 하기 위해 getServerSideProps 등 에서 같은 요청을 보냈더니 unable to verify the first certificate 라며 에러 발생
  - 원인
    - 보통 서버에 올바른 SSL 인증서가 설치되지 않거나 유효기간이 만료되었을 때 발생하는 문제. 따로 인증서 작업을 하지 않은 상태
  - 해결 방법 -->
