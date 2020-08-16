import React, { useEffect, useState, Component } from "react";
import { Route, Link } from 'react-router-dom';
import { FaCode } from "react-icons/fa";
import { Formik } from 'formik';
import { Card, Avatar, Col, Typography, Row, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from 'yup';
import moment from "moment";
import { BACK_URL } from "../../Link";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import "./LandingPage.css";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {
   const dispatch = useDispatch();
   const [key, setKey] = useState('');

   const onChangeKey = e => {
      setKey(e.target.value);
   };

   useEffect(() => {
   }, [key]);

   //input focus 일때 enter키 입력시 
   const handleKeyPress = (event) => {
      if (event.key == 'Enter') {
         alert("검색 버튼을 클릭해 주세요")
         console.log('enter press here! ')
      }
   }

   //voice recognition 기능 추가
   const commands = [                     //command
      {
        command: '*',                              //모든 언어 정규식
        callback: () => {setKey(transcript);}         //입력이 완료 되면 setKey();
      }
   ];
   const { transcript, resetTranscript,listening } = useSpeechRecognition({commands})
   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
   }

   return (
      <div class="main">
         <h1 class="main_title">우리들의<br />고여버린 기억💦</h1>
         <form class="main_box" onSubmit="return false">

            <input class="main_input" type="text" placeholder="키워드"  Value={key}
               onChange={onChangeKey} onKeyPress={handleKeyPress} onSubmit={e => { e.preventDefault(); }}
            />
            <div class="icon_box">
               <span class="mike_button" onClick={()=>{setKey("");SpeechRecognition.startListening()}}><span class="material-icons">👄</span></span>
               <Link to={{
                  pathname: `/search/${key}`,
                  state: {
                     key: key
                  }
               }}>
                  <span class="material-icons">🔍</span>
               </Link>
         
            </div>
         </form>
      </div>
   )

}

export default LandingPage;