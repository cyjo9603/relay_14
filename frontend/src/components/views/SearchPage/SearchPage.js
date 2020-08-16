import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import FollowerBtn from './FollowBtn/Follower';
import axios from 'axios';
import * as Yup from 'yup';
import './SearchPage.css';
import { useDispatch } from 'react-redux';
const { Title } = Typography;
const { Meta } = Card;

function SearchPage(props) {
  console.log(props);
  //검색창 입력용
  const [key, setKey] = useState(props.location.state.key);
  const onChangeKey = (e) => {
    setKey(e.target.value);
  };

  useEffect(() => {}, [key]);

  //input focus 일때 enter키 입력시
  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      alert('검색 버튼을 클릭해 주세요');
      console.log('enter press here! ');
    }
  };

  const searchVariable = {
    keyword: key,
  };

  //검색 결과
  const [Users, setUsers] = useState([]);

  //페이지내에서 재 검색 하기 위한 코드
  const [find, setfind] = useState(0);
  useEffect(() => {
    axios
      .post('https://relay14-server.herokuapp.com/api/users/searchUser', searchVariable)
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.user);
        } else {
          alert('Failed to get User Data');
        }
      });
    //
  }, [find, searchVariable]);

  //following 기능
  const [Follow, setFollow] = useState([]);
  let followArr = [];
  const [propData, setPropData] = useState(props.user.userData);
  useEffect(() => {
    const userVariable = {
      userFrom: props.user.userData,
    };
    axios
      .post('https://relay14-server.herokuapp.com/api/follow/getlist', userVariable) //follow친구 목록 가져오기
      .then((response) => {
        if (response.data.success) {
          setFollow(response.data.user);
        } else {
          alert('Failed to get Follow Data');
        }
      });
  }, [propData, props.user.userData]);

  //유저목록 받아오기
  useEffect(() => {
    axios
      .post('https://relay14-server.herokuapp.com/api/users/searchUser', searchVariable)
      .then((response) => {
        //console.log(response)
        if (response.data.success) {
          setUsers(response.data.user);
        } else {
          alert('Failed to get User Data');
        }
      });
    const userVariable = {
      userFrom: props.user.userData,
    };
    axios
      .post('https://relay14-server.herokuapp.com/api/follow/getlist', userVariable) //follow친구 목록 가져오기
      .then((response) => {
        if (response.data.success) {
          setFollow(response.data.user);
        } else {
          alert('Failed to get Follow Data');
        }
      });
  }, [props.user.userData, searchVariable]);

  //voice recognition 기능 추가
  const commands = [
    //command
    {
      command: '*', //모든 언어 정규식
      callback: () => setKey(transcript), //입력이 완료 되면 setKey();
    },
  ];
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ commands });
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const renderCards = Users.map((users, index) => {
    console.log(followArr);
    return (
      <div class="people_item">
        <FollowerBtn userFrom={props.user.userData} userTo={users} follow={Follow} />
        <div class="people_item_top">
          <img class="people_img" src={`${users.image}`} alt="profile_img"></img>
          <div class="people_content">
            <p class="people_name">{`${users.name}`}</p>
            <p class="people_school">{`${users.school}`}</p>
            <p class="people_email">{`${users.email}`}</p>
          </div>
        </div>
        <div class="people_item_bottom">
          <div class="people_tag_box">
            <span class="people_tag_item">{`${users.tag[0]}`}</span>
            <span class="people_tag_item">{`${users.tag[1]}`}</span>
            <span class="people_tag_item">{`${users.tag[2]}`}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div class="root">
      <div class="top">
        <h1 class="search_title">우리들의 고여버린 기억</h1>
        <form class="search_box">
          <input
            class="main_input"
            type="text"
            placeholder="키워드"
            Value={key}
            onChange={onChangeKey}
            onKeyPress={handleKeyPress}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
          <div class="icon_box">
            <span
              class="mike_button"
              onClick={() => {
                setKey('');
                SpeechRecognition.startListening();
              }}
            >
              <span class="material-icons">👄</span>
            </span>
            <Link
              to={{
                pathname: `/search/${key}`,
                state: {
                  key: key,
                },
              }}
            >
              <span class="material-icons" onClick={() => setfind(find + 1)}>
                🔍
              </span>
            </Link>
          </div>
        </form>
      </div>
      <div class="people_main_box">
        <p class="people_main_title">혹시, 너도 고였니?😉</p>
        <div class="people_box">{renderCards}</div>
      </div>
    </div>
  );
}

export default SearchPage;
