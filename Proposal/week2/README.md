### 기능 [A Type - 자연어처리]

> 입력이나 출력에 자연어 처리 인공지능이 도입됩니다.

[Week2 Draft](./GoMemory_week2_draft.pdf)

### 1. 회원 가입

* 기능 구현에 필요한 회원정보를 입력받는다. (Draft 참고)

  * **필요한 데이터**
    * 필수 :  초,중,고등학교 / 각 학교별 기수(기수를 모르는 사용자에겐 입학년도 or 졸업년도를 물어보고 기수를 알려줌) / 이름 / 나이 / 성별 
    * 선택사항 : 사는곳 / 이메일 / 전화번호 / SNS

* 입력받은 정보를 바탕으로 태그화시켜서 DB에 저장한다. (필요에 따라 NLP 활용)

  ex1) 군자초등학교 13기 => ``군자초 13기``

  ex2) 1995년생 => `95년생`

  ex3) 경기도 성남시 분당구 정자동 그린팩토리 => ``경기도`` ``성남시 `` ``분당구`` ``정자동`` ``그린팩토리``

* 저장한 태그를 기반으로 **'알수도 있는 사람'** 리스트를 보여준다.

* 사용자가 클릭한 **'알수도 있는 사람'**을 팔로워 리스트에 저장한다.

  

### 2. 친구 찾기

* 검색창에 졸업년도, 학교이름, 친구이름 등의 태그화될 정보를 입력받는다.
  * **텍스트** : 학교이름, 친구이름은 사용자가 직접 입력한다.
  * **음성** : 음성을 인식하면 NLP가 분석하여 준다.
  * **맞춤법 검사** : 오탈자나 음성인식이 제대로 안된경우 각 필도값을 유사도가 높은 값으로 넣어주고 검색결과를 보여준다.

* 입력된 태그를 포함하는 사용자 리스트를 보여준다. (공개허용된 태그에만 적용)
  * 'X' 버튼을 통해 태그를 삭제하면 남은 태그들로 재검색된 결과를 보여준다.
  * 사용자 뷰의 '+' 버튼을 누르면 팔로워로 추가할 수 있다. 



### :movie_camera: ​시나리오

사용자들이 겪을 자연어 처리의 시나리오입니다.

1. 회원가입시 인적사항을 입력합니다.
2. '알수도 있는 사람' 목록에서 원하는 사람을 팔로우합니다.
3. 음성발화를 하거나 직접 입력을 통해 '친구찾기'를 합니다.
4. '친구찾기'에 나온 결과로 친구를 팔로우하거나 공개된 연락처로 연락합니다.

<br/>

## :memo: 구현을 위한 지식

:mag:   **형태소분석 API **

형태소 분석 API는 자연어 문장에서 의미를 가진 최소 단위인 형태소(명사, 동사, 형용사, 부사, 조사, 어미 등)를 분석하는 기술로, 태그셋은 세종 태그셋을 기반으로 한 [TTA 표준 형태소 태그셋 (TTAK.KO-11.0010/R1)](http://aiopen.etri.re.kr/data/001.형태소분석_가이드라인.pdf)에 기반합니다.

**종류**

* 한나눔 – http://semanticweb.kaist.ac.kr/hannanum/index.htmlOpen
* Korean Text – https://github.com/open-korean-text/open-korean-text
* 코모란 – https://www.shineware.co.kr/products/komoran/
* 은전한닢 – http://eunjeon.blogspot.com/
* 아리랑 – https://github.com/korluceneRHINO – http://lingua1972.blogspot.com/2014/11/korean-morphological-analyzer-rhino.html
* 꼬꼬마 – http://kkma.snu.ac.kr/

#### **음성인식 관련**

- Web Speech API : [https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- HTML5 Speech Recognition API : [https://shapeshed.com/html5-speech-recognition-api/](https://shapeshed.com/html5-speech-recognition-api/)