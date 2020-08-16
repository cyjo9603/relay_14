const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const axios = require('axios');

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인
  User.findOne({ name: req.body.name }, async (err, user) => {
    if (!user) return res.status(200).json({ success: true, user: [] });

    const targetUserImage = user.image;
    const searchingUserImage = req.body.image;
    const verifyResult = await compareTwoUsers(targetUserImage, searchingUserImage);

    if (verifyResult > 0.5) {
      res.status(200).json({ success: true, user: [user] });
    }
    return res.status(200).json({ success: true, user: [] });
  });
});

async function compareTwoUsers(url1, url2) {
  let result1 = undefined;
  let result2 = undefined;
  let verifyResult = undefined;
  let subscriptionKey = ''; /* 새로 발급받아서 사용 */
  let endpoint = 'https://koreacentral.api.cognitive.microsoft.com/face/v1.0/detect';
  let findSimilarEndpoint = 'https://koreacentral.api.cognitive.microsoft.com/face/v1.0/verify';

  await axios({
    method: 'post',
    url: endpoint,
    params: {
      returnFaceId: true,
      returnFaceLandmarks: false,
      returnFaceAttributes:
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,noise',
    },
    data: {
      url: url1,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
  })
    .then(function (response) {
      // console.log("Status text: " + response.status);
      // console.log("Status text: " + response.statusText);
      // console.log();
      response.data.forEach((face) => {
        // console.log("Face ID: " + face.faceId);
        result1 = face.faceId;
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios({
    method: 'post',
    url: endpoint,
    params: {
      returnFaceId: true,
      returnFaceLandmarks: false,
      returnFaceAttributes:
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,noise',
    },
    data: {
      url: url2,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
  })
    .then(function (response) {
      // console.log("Status text: " + response.status);
      // console.log("Status text: " + response.statusText);
      // console.log();
      response.data.forEach((face) => {
        // console.log("Face ID: " + face.faceId);
        result2 = face.faceId;
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios({
    method: 'post',
    url: findSimilarEndpoint,
    data: {
      faceId1: result1,
      faceId2: result2,
    },

    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
  })
    .then(function (response) {
      // console.log("Status text: " + response.status);
      // console.log("Status text: " + response.statusText);
      // console.log();
      // console.log(response.data.confidence);
      verifyResult = response.data.confidence;
    })
    .catch(function (error) {
      console.log(error);
    });
  return verifyResult;
}

module.exports = router;
