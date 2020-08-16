const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Follow } = require("../models/Follow");
const { auth } = require("../middleware/auth");
const key = require('../config/key');
//=================================
//             Follow
//=================================


//팔로우
router.post("/followFriend", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log("followFriend");
    const follow = new Follow({userFrom:req.body.userFrom._id, userTo:req.body.userTo._id });
    try {
        follow.save()
        return res.status(200).json({ success: true })
    } catch (err) {
        return (err)
     }
});


//언팔
router.post("/unfollowFriend", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log("undfollowFriend", req.body);
    try {
        Follow.findOneAndDelete({userFrom:req.body.userFrom._id, userTo:req.body.userTo._id })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
    } catch (err) {
        return (err)
     }
});

router.post("/isfollow", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log("isfollow", req.body);
    try {
        Follow.find({userFrom:req.body.userFrom._id, userTo:req.body.userTo._id })
                .exec((err,user) => {
                    console.log(user);
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, isfollow:user })
                })
        
    } catch (err) {
        return (err)
     }
});


//팔로우 목록
router.post("/getlist", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    Follow.find(req.body.userFrom)
        .exec((err, user) => {
            console.log(err, user);
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, user })
        })
});



module.exports = router;
