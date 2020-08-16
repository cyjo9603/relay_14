const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Follow } = require("../models/Follow");
const { auth } = require("../middleware/auth");
const axios = require("axios");
const key = require('../config/key');

const flask_nlp_server = 'https://relay14-nlp-server.herokuapp.com';

// -------- kakao vision -----------
const API_URL = 'https://kapi.kakao.com/v1/vision/adult/detect'
const MYAPP_KEY = '5b1c7e32fa039f47b40edc41e6dda126' // 카카오 api key

function searchRemote(src) {
    return request = axios.request({
        method: 'POST',
        url: `${API_URL}`,
        headers: { Authorization: `KakaoAK ${MYAPP_KEY}` },
        params: { image_url: src },
    })
}
// ----------------------------------
//=================================
//             User
//=================================

//인증
router.get("/auth", auth, async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        company: req.user.company,
        school: req.user.school,
        phone: req.user.phone,
        birth: req.user.birth,
        intro: req.user.intro,
        sex: req.user.sex
    });
});


// 회원가입, 파이썬 자연어 처리를 포함하지 않은 라우터
router.post("/register", async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    const data = [req.body.school, req.body.name, req.body.company, req.body.sex, req.body.birth]
    req.body.tag = data;
    // url형태로 온 req.body.image 를 api로 유해성 선정성 검사 추가
    const name = req.body.name; // -> 회원 이름
    const profile_url = req.body.image; // -> 회원 가입 시 작성한 프로필 이미지 url
    
    let detections = await axios.request({ method: 'POST', url: `${API_URL}`, headers: { Authorization: `KakaoAK ${MYAPP_KEY}` }, params: { image_url: profile_url }, })

    let result = detections.data.result;
    let normal = result.normal
    let soft = result.soft
    let adult = result.adult

    console.log("===========================================================================================================================");
    console.dir(`normal: ${normal}`);
    console.dir(`soft: ${soft}`);
    console.dir(`adult: ${adult}`);
    console.log("===========================================================================================================================");

    const user = new User(req.body);
    try {
        if (normal < 0.5) { // 유해한 이미지 O
            console.log("유해한 이미지입니다.")
            return res.status(200).json({
                success: false,
                inapprop: true
            });
        }

        console.log("유해하지 않은 이미지입니다.")
        user.save()
        return res.status(200).json({
            success: true,
            inapprop: false
        });
    } catch (err) {
        return (err)
    }
});

// 회원가입, 파이썬 자연어 처리를 포함한 라우터
// router.post("/register", async(req, res) => {
//     res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
//     let keyword = req.body.school + " " + req.body.name + " " + req.body.company + " " + req.body.sex + " " + req.body.birth;

//     // url형태로 온 req.body.image 를 api로 유해성 선정성 검사 추가
//     const name = req.body.name; // -> 회원 이름
//     const profile_url = req.body.image; // -> 회원 가입 시 작성한 프로필 이미지 url
    
//     let detections = await axios.request({ method: 'POST', url: `${API_URL}`, headers: { Authorization: `KakaoAK ${MYAPP_KEY}` }, params: { image_url: profile_url }, })

//     let result = detections.data.result;
//     let normal = result.normal
//     // let soft = result.soft
//     // let adult = result.adult


//     try {
//         if (normal < 0.5) { // 유해한 이미지 O
//             console.log("유해한 이미지입니다.")
//             return res.status(200).json({
//                 success: false,
//                 inapprop: true
//             });
//         }
//         console.log("유해하지 않은 이미지입니다.")

//         await axios.get(flask_nlp_server +`/api/tag/` + encodeURI(keyword))
//             .then(response => {
//                 if (response.data) {
//                     let temp = response.data.taglist;
//                     let data = [];
//                     console.log(response.data);
//                     if (temp.length < 2) {
//                         data = temp;
//                     } else {
//                         temp.forEach(element => {
//                             let temp = element;
//                             if (temp[0] != '대학교' && temp[0] != '고등학교' && temp[0] != '중학교' && temp[0] != '초등학교' && temp[0] != '학교') {
//                                 data[data.length] = temp[0]; //object 형태로 배열에 저장
//                             }
//                         });
//                     }
//                     req.body.tag = data;
//                     const user = new User(req.body);
//                     try {
                       
//                         user.save()
//                         return res.status(200).json({
//                             success: true,
//                             inapprop: false
//                         });
//                     } catch (err) {
//                         return (err)
//                     }
//                 } else {
//                     console.log("error:", response.data.token_strings);
//                     return false;
//                 }
//             })
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// });


//로그인
router.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, account not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
          loginSuccess: true,
          userId: user._id,
          tokenExp: user.tokenExp,
          token: user.token,
        });
      });
    });
  });
});

//로그아웃
router.get("/logout", auth, async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" })
        return res.status(200).send({
            success: true
        });
    } catch (error) {
        console.log(error)
    }
});

//알수도 있는 사람 기능 구현
router.post("/getUser", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    try {
        User.find({ _id: req.body.userId.userData._id })
            .exec((err, user) => {
                let data = [];
                let temp;
                try {
                    temp = user[0].tag
                } catch {
                    return res.status(400).send("e");
                }
                temp.forEach((el) => {
                    let tempObj = new Object;
                    tempObj.tag = el;
                    data[data.length] = tempObj;
                })
                if (data.length < 2) { //결과가 없을 경우 리턴 에러
                    console.log("data.length<2")
                    return res.status(400).send("e");
                }
                let str = { $or: data } //키워드값 or검색
                User.find(str)
                    .exec((err, user) => {
                        console.log(err, user);
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, user })
                    })
            })
    } catch (e) {
        return res.status(400).send("e");
      }
      temp.forEach((el) => {
        let tempObj = new Object();
        tempObj.tag = el;
        data[data.length] = tempObj;
      });
      if (data.length < 2) {
        //결과가 없을 경우 리턴 에러
        console.log("data.length<2");
        return res.status(400).send("e");
      }
      let str = { $or: data }; //키워드값 or검색
      User.find(str).exec((err, user) => {
        console.log(err, user);
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, user });
      });
    });
  } catch (e) {
    return res.status(400).send("e");
  }
});

router.post("/getFindUser", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
  try {
    User.find({ _id: req.body.userId.userData._id }).exec((err, user) => {
      let data = [];
      let temp;
      try {
        temp = user[0].tag;
      } catch {
        return res.status(400).send("e");
      }
      temp.forEach((el) => {
        let tempObj = new Object();
        tempObj.tag = el;
        data[data.length] = tempObj;
      });
      if (data.length < 2) {
        //결과가 없을 경우 리턴 에러
        console.log("data.length<2");
        return res.status(400).send("e");
      }
      let str = { $or: data }; //키워드값 or검색
      User.find(str).exec((err, user) => {
        console.log(err, user);
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, user });
      });
    });
  } catch (e) {
    return res.status(400).send("e");
  }
});


//검색 기능 구현 - 검색결과 리턴
router.post("/searchUser", async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log(req.body.keyword);
    var keyword = req.body.keyword;
    try {
        await axios.get(flask_nlp_server+`/api/tag/` + encodeURI(keyword))
            .then(response => {
                if (response.data) {
                    let temps = response.data.taglist;
                    let data = [];
                    if (temps.length < 2) {
                        let temp = temps;
                        let tempObj = new Object;
                        tempObj.tag = temp[0];
                        data[data.length] = tempObj; //object 형태로 배열에 저장
                    } else {
                        temps.forEach(element => {
                            let temp = element
                            if (temp != '대학교' && temp != '고등학교' && temp != '중학교' && temp != '초등학교' && temp != '학교') {
                                let tempObj = new Object;
                                tempObj.tag = temp;
                                data[data.length] = tempObj; //object 형태로 배열에 저장
                            }
                        });
                    }

                    let str = { $or: data } //키워드값 or검색
                    if (temps.length < 2) {
                        str = data[0];
                    }
                    //console.log(data,str);
                    User.find(str)
                        .exec((err, user) => {
                            //console.log(err, user);
                            if (err) return res.status(400).send(err);
                            res.status(200).json({ success: true, user })
                        })
                } else {
                    console.log("error:", response.data.parases);
                }
            })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;