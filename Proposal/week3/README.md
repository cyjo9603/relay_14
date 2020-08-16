### 기능 [ B Type - 이미지/영상처리 ]

>이미지/영상으로 입력하거나 인공지능이 만든 이미지를 출력합니다.

[Week3 Draft](./GoMemory_week3_draft.pdf)

### **1. 부적절한 이미지 처리**

### 동작 설명

프로필 이미지를 추가, 수정 작업 시 **부적절한 이미지**를 인공지능을 통해 필터링 한다.

> 부적절한 이미지 : 폭력성, 선정성 등에 위배되는 이미지.

### 동작 흐름
사용자가 **이미지를 넣는 시점**에 서버에서 모델 적용하여 필터링

- 부적절한 이미지로 판단되었을 때

    경고 메시지 출력 후, 저장이나 수정 버튼이 작동하지 않음. 

<img src="https://user-images.githubusercontent.com/42436353/89118343-02070a00-d4e0-11ea-80b9-d45f5d86e1d0.png" width = "400" height = "500">

### :movie_camera: ​시나리오

사용자들이 겪을 프로필 업로드 이미지 처리의 시나리오입니다.

1. 프로필 사진 업로드를 한다.
2. 프로필 작성을 마치고 저장 요청을 한다.

<br/>

### **2. 이미지로 지인 찾기**
### 동작 설명
특정 이미지를 업로드 하고 인공지능을 통해 서비스를 사용하는 다른 사용자의 프로필과 유사한 패턴을 가지는 사용자 정보 목록을 반환한다.

### 동작 흐름
1. 사용자가 사진을 업로드하여 서버에 전송.
2. 서버에서 가지고 있는 다른 사용자 이미지와 비교.
3. 유사한 이미지 패턴을 가진 사용자 정보를 리스트로 생성 후 보여줌.

<img src="https://user-images.githubusercontent.com/42436353/89118344-03d0cd80-d4e0-11ea-8334-c2d0c4dc68dd.png" width = "400" height = "500">

### :movie_camera: 시나리오

사용자들이 겪을 지인찾기 업로드 이미지 처리의 시나리오입니다.

1. 검색창에 이미지 아이콘을 클릭하여 이미지 업로드
2. 분석 대기
3. 반환된 결과 확인

<br/>

## :memo: 구현을 위한 지식​

- 카카오 비전 : https://developers.kakao.com/docs/latest/ko/vision/dev-guide#recog-face
- 구글 비전 : https://cloud.google.com/vision?hl=ko
- 텐스플로우 : https://www.tensorflow.org/js/models?hl=ko
- 네이버 클라우드 : https://www.ncloud.com/product/aiService/cfr
- 아마존 Rekognition : https://docs.aws.amazon.com/rekognition/latest/dg/collections.html
