function create(number) {
  const data = [];
  for (let i = 0; i < number; ++i) {
    data.push(createUserData());
  }  
  return JSON.stringify(data);
}

function createUserData() {
  return {
    'role': 0,
    'name': getName(),
    'company': getCompanyName(),
    'image': getImage(),
    'birthday': getBirthday(),
    'address': getAddress(),
    'phone': getPhoneNumber(),
    'school': getSchoolName(),
    'email': getEmail(),
    'password': getPassword(),
  };
}

function getImage() {
  return `http://gravatar.com/avatar/${randomNumber(1, 1000)}?d=identicon`;
}

function getBirthday() {
  return randomNumber(1900, 2020);
}

function getEmail() {
  function getDomain() {
    const list = ['naver.com', 'kakao.com', 'gmail.com'];
    return list[randomNumber(0, list.length)];
  }
  return getString(7) + '@' + getDomain();
}

function getPassword() {
  return getString(10);
}

function getString(size) {
  const string = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < size; ++i) {
    result += string[randomNumber(0, string.length)];
  }
  return result;
}

function getAddress() {
  function getCity() {
    const list = ['서울특별시', '인천광역시'];
    return list[randomNumber(0, list.length)];
  }
  function getGu() {
    const list = ['성동구', '강남구', '강북구', '서구'];
    return list[randomNumber(0, list.length)];
  }
  function getDong() {
    const list = ['성수동', '자양동', '삼성동'];
    return list[randomNumber(0, list.length)];
  }
  return `${getCity()} ${getGu()} ${getDong()}`;
}

function getSchoolName() {
  const list = ['상산고', '한가람고', '하나고'];
  return list[randomNumber(0, list.length)];
}

function getCompanyName() {
  const list = ['네이버', '커넥트재단', '라인'];
  return list[randomNumber(0, list.length)];
}

function getName() {
  const first = ['상경', '도균', '예지', '승래', '장현', '찬규', '준영', '동훈'];
  const last = ['김', '이', '류', '한', '모', '신', '장'];
  return last[randomNumber(0, last.length)] + first[randomNumber(0, first.length)];
}

function getPhoneNumber() {
  function getNumberString(size) {
    const mod = 10 ** (size - 1);
    return String(randomNumber(0, mod)).padStart(size, '0');
  }
  return '010' + getNumberString(4) + getNumberString(4);
}

// end: exclusive
function randomNumber(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}

console.log(create(10));