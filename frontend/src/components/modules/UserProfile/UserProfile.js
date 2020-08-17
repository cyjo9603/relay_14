import React, { CSSProperties } from 'react';
import { Modal, Button, Col, Row } from 'antd';

import './UserProfile.css';

export default function UserProfile(props) {
  return (
    <Modal
      width="80%"
      bodyStyle={{ height: '70vh' }}
      visible={props.isVisible}
      title={props.userData.name}
      onOk={() => props.offModal()}
      onCancel={() => props.offModal()}
      footer={[
        <Button key="back" onClick={() => props.offModal()}>
          돌아가기
        </Button>,
      ]}
    >
      <Row>
        <Col span={7}>
          <img class="profile" src={props.userData.image} />
        </Col>
        <Col span={1}></Col>
        <Col span={16}>
          <p>e-mail: {props.userData.email}</p>
          <p>학교: {props.userData.school}</p>
          <p>회사: {props.userData.company}</p>
          <p>자기소개: {props.userData.intro}</p>
        </Col>
      </Row>
    </Modal>
  );
}
