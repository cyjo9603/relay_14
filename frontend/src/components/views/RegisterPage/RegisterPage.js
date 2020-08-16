import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Select, Typography } from 'antd';
import TextArea from "antd/lib/input/TextArea";



const { Title } = Typography
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


function RegisterPage(props) {
  const dispatch = useDispatch();
  const accountRegExp = /^[A-Za-z0-9_\-.@]{3,20}$/

  return (

    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        company: '',
        school:'',
        birth:'',
        phone:'',
        sex1:'',
        sex2:'',
        intro:'',
        tag:'',
        profile_url:'',//
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        email: Yup.string()
          .email('Email is invalid.')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
        intro: Yup.string()
        .required('자기소개를 입력해주세요'),
        profile_url: Yup.string()//
        .required('프로필 사진 url을 입력해주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          function addEnter(value){
            try{
              var content = value;
              content = content.replaceAll("\n", "<br/>");
              return content;
            }catch{
              return value;
            }
           
          }
          console.log("성별",values.sex);

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            company : values.company,
            school : values.school,
            birth : values.birth,
            sex : (values.sex1)?"여자":"남자",
            image: values.profile_url,
            phone: values.phone,
            intro: addEnter(values.intro),
            tag: '',
            // profile_url:values.profile_url,//
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              // alert(JSON.stringify(response));
              // console.dir(response, {depth:null});
              props.history.push("/login");
              //props.history.push("/youknow");
            } else {
              if(response.payload.inapprop){
                alert("부적절한 이미지로 파악이 되었습니다. 다시 회원가입해주세요");
              } else{
                alert(response.payload.err.errmsg);
              }
            }
          })
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <Title level={2}>Sign up </Title>

            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="name">
                <Input
                  id="name"
                  placeholder="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="confirm"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item label="전화번호">
                <Input
                  id="phone"
                  placeholder="Enter your 전화번호"
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="회사">
                <Input
                  id="company"
                  placeholder="Enter your company"
                  type="text"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              
              <Form.Item required label="학교">
                <Input
                  id="school"
                  placeholder="Enter your school"
                  type="text"
                  value={values.school}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            
              <Form.Item required label="생년월일">
                <Input
                  id="birth"
                  placeholder="Enter your birth Day"
                  type="date"
                  value={values.birth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item required label="성별" hasFeedback>
                <Input id="sex" type="radio" name="sex" value={values.sex1} onChange={handleChange}
                  onBlur={handleBlur} style={{marginLeft:'13px', marginRight:'10px'}}/>여자
                <Input id="sex" type="radio" name="sex" value={values.sex2} onChange={handleChange}
                  onBlur={handleBlur} style={{marginLeft:'13px', marginRight:'10px'}}/>남자<br/>
              </Form.Item>
              
              <Form.Item required label="자기소개">
                <TextArea
                  id="intro"
                  placeholder="Introduce yourself"
                  type="textbox"
                  value={values.intro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{width:'100%', height:'100px'}}
                />
              </Form.Item>

              <Form.Item required label="프로필사진">
                <Input
                  id="profile_url"
                  placeholder="profile url"
                  type="text"
                  value={values.profile_url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
