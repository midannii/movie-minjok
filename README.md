

# movie-minjok 영화의 민족


멀티플렉스 3사의 영화 조회부터 예매까지 한번에 !

경희대학교 `데이터베이스`  프로젝트에서 구현한 아이디어를 직접 설계합니다. :)

## Overview


### needs & Goals

영화를 예매하기 위해서는 영화 장르, 감독, 배우에 따라 영화 제목을 정하고 나면 어느 지역에서 볼지, 어떤 시간대에볼지등등 많은 선택을 필요로한다.

특히 어느 브랜드의 영화관에서 볼지에 따라 각자 다른 계정을 이용해야 하고 그에 따라 다른 결제 방법을 갖는다.

또한 특정 시간대의 특정 영화가 어느 브랜드의 어느 지점에서 상영하는지 하나하나 대조하는 것은 많은 시간이 걸린다.

우리는 본 프로젝트를 통해 여러 브랜드의 영화관의 상영 및 예매 정보를 통합하여,

회원들이 단 한번의 회원가입을 통해 쉽고 빠르게 다양한 브랜드의 영화관에서 다양한 종류와 시간의 영화를 예매할 수 있도록 한다.

또한 영화 예매를 위해 필요한 많은 정보들을 관리하기 위한 비용도 절약된다.


### step by step

[회의 일지](step_by_step.md)에 내용을 기록


### workflow

[figure 추가 예정 ]


## how to do ?

1. 영화에 대한 정보를 크롤링합니다 ( `node.js` 이용 )

- 2020/08/22 수정:  `beautifulsoap(python)` 이용

- `node.js`를 이용한 시행착오 코드는 [trial&error](https://github.com/midannii/movie-minjok/tree/master/%0Atrial%26error) 폴더에 :)

2. DB를 구축합니다 ( `mySQL`, `pymysql` 이용 )

3. DB와 연동하여 정보를 웹페이지에 업로드 합니다 ( `node.js` 이용 )

4. 영화 예매 및 결제 기능을 추가합니다 ( `I'm port` 이용 )



<br>

## Developers

- [심미단](https://github.com/midannii)

- [이다은](https://github.com/daeun197)

<br>
