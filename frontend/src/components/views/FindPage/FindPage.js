import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { Card, Form, Input, Button, Row, Typography } from "antd";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { findUserByPhoto } from "../../../_actions/user_actions";
const { Title } = Typography;
const { Meta } = Card;

function FindPage(props) {
  const dispatch = useDispatch();
  // var image = 'https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg';
  // (<div style={{ width: '100%', overflow: 'hidden' }}>
  //     <section id='mainsection' style={{ backgroundImage: `url(${image})`, padding: '60px 0px', textAlign: 'center', height: '150px' }}><a href="/upload">
  //         <p style={{ color: 'white', fontSize: '26px', margin: '0px' }}>알수도 있는 사람</p>
  //         <p style={{ color: 'white', fontSize: '15px' }}>친구를 찾는데 도움이 됩니다.</p>
  //     </a>
  //     </section>
  //     <br /><br /><br />
  //     <Row gutter={16}>{renderCards}</Row>
  //     <hr />
  // </div>
  // )

  const user = useSelector((state) => state.user);

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
  return (
    <Formik
      initialValues={{
        name: "",
        profile_url: "", //
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        profile_url: Yup.string() //
          .required("프로필 사진 url을 입력해주세요"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          function addEnter(value) {
            try {
              var content = value;
              content = content.replaceAll("\n", "<br/>");
              return content;
            } catch {
              return value;
            }
          }

          let dataToSubmit = {
            name: values.name,
            image: values.profile_url,
          };

          dispatch(findUserByPhoto(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/findResult");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
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
            <Title level={2}>Find your freinds </Title>

            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="name">
                <Input
                  id="name"
                  placeholder="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
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
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default FindPage;
