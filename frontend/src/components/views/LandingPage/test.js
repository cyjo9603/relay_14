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

function test(props) {
   
    console.log(props);

   return (
      <div class="main">
         안녕하세요
      </div>
   )

}

export default test;