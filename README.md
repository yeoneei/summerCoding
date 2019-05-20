# summerCodingBack

## git 설치하기
- 리눅스에 패키지로 Git 설치하기
~~~
$ yum install git-core
~~~
- apt-get 이용
~~~
$ apt-get install git
~~~

## Back-end 소스코드 다운받기
- https://github.com/yeoneei/summerCodingBack/tree/master 에 들어가서 소스코드 다운받기
~~~
$git clone https://github.com/yeoneei/summerCodingBack.git
~~~

## Back-end 파일 설정하기
- npm과 node 설치
    1. crul과 wget으로 npm 설치
    ~~~
    # curl으로 설치하기
    $curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

    # wget으로 설치하기
    $wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    ~~~
    - .bash_profile에 반영
    ~~~
    $source .bash_profile
    ~~~
    2. node 설치
    - 자동으로 npm 설치
    ~~~
    # nodejs v9.4.0 설치
    $nvm install v9.4.0
    # v9.4.0을 사용한다는 의미. 다른 버전으로 바꾸는 것도 가능.
    $nvm use v9.4.0
    ~~~
    - .bash_profile에 반영
    ~~~
    $source .bash_profile
    ~~~
    - 캐시삭제하고 n모듈 설치 후 n모듈을 사용하여 Node.js를 설치
    ~~~
    #sudo npm cache clean --force
    #sudo npm install -g n
    #sudo n stable
    ~~~
    - npm 업그레이드
    ~~~
    #sudo npm install -g npm
    ~~~
- node module 다운받기
~~~
$npm install 
~~~  
 
## DB설정

- 루트 디렉토리에 `cofig` 디렉토리 생성
- `config.js` 파일 생성
~~~
const mysql = require('promise-mysql');

const dbConfig = {
    host: 'DB주소입력',
    port: 3306,
    user: '사용자 이름 입력',
    password: '비밀번호 입력',
    database: 'DB'스키마 입력,
}

module.exports = mysql.createPool(dbConfig);
~~~
- DB 스키마
~~~
idx int(11) AI PK
title varchar(45)
content varchar(200)
prior int(10)
complete int(1)
dueDate date
~~~

## Back-end 시작하기
- 루트 디렉토리 들어가서 명령어 실행
~~~
$npm start
~~~

## EndPoint
- TodoList 모두 가져오기
    - `GET /list/all`
- TodoList 하나 생성하기
    - `POST /list`
    - title(필수), content(필수),prior,complete ,dueDate
- TodoList 하나 수정하기
    - `POST /list/modiy`
    - title(필수), content(필수),prior,complete ,dueDate
- TodoList 하나 삭제
    - `POST /list/delete`
    -  idx(필수)
- 마감 지난 TodoList 가져오기
    - `GET /list/expire`
- TodoList 하나 완료 처리하기
    - `POST /list/complete`
    - idx(필수)

## Front 다운받기
- https://github.com/yeoneei/summerCodingFront 주소의 파일 git clone 하기
~~~
$git clone https://github.com/yeoneei/summerCodingFront.git
~~~

- 노드 모듈 다운 받기
~~~
$npm install
~~~
- 루트 파일 들어가서 시작하기
~~~
$npm start
~~~

## 주의 사항
1. TodoList 수정시 modify누르고 취소 누르기
2. 날짜 입력은 05-25 (5월 25일)이런식으로

