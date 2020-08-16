import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { Title } = Typography;
const { Meta } = Card;

function YouKnowPage(props) {
  const [Users, setUsers] = useState([]);
  var image = 'https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg';
  const user = useSelector((state) => state.user);
  const UserVariable = {
    userId: user,
  };
  console.log('console.log(user);', props);

  useEffect(() => {
    if (user)
      axios
        .post(/*localhost123*/ 'https://relay14-server.herokuapp.com/api/users/getUser', UserVariable)
        .then((response) => {
          if (response.data.success) {
            setUsers(response.data.user);
          } else {
            console.log('fail');
            //setUsers("error");
            alert('Failed to get User Data');
          }
        });
  }, [UserVariable, user]);

  let friendsArray = [''];

  const addFriend = (userData) => {
    console.log(userData);
  };

  //카드 css 동적 변경
  let cardStyle = function () {
    if (true) {
      return {
        marginBottom: '40px',
        width: '180px',
        textAlign: `center`,
      };
    }
  };

  if (Users.length != 0) {
    //서버에서 유저 데이터를 전달 받았을 경우
    const renderCards = Users.map((users, index) => {
      return (
        <Col lg={6} md={8} xs={24}>
          <div
            style={cardStyle()}
            onClick={() => {
              addFriend(users);
            }}
          >
            <div
              style={{
                position: 'relative',
                margin: '0px 10px',
                width: '150px',
                height: '150px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,.2)',
                borderRadius: '10px 10px',
              }}
            >
              <img
                style={{ width: '100%', height: '100%', display: `inline` }}
                alt="thumbnail"
                src={`${users.image}`}
              />
            </div>
            <div style={{ paddingLeft: '60px', position: 'relative', bottom: '0px' }}>
              <h3>{`${users.name}`}</h3>
            </div>
          </div>
        </Col>
      );
    });
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <section
          id="mainsection"
          style={{
            backgroundImage: `url(${image})`,
            padding: '60px 0px',
            textAlign: 'center',
            height: '150px',
          }}
        >
          <a href="/upload">
            <p style={{ color: 'white', fontSize: '26px', margin: '0px' }}>알수도 있는 사람</p>
            <p style={{ color: 'white', fontSize: '15px' }}>친구를 찾는데 도움이 됩니다.</p>
          </a>
        </section>
        <br />
        <br />
        <br />
        <Row gutter={16}>{renderCards}</Row>
        <hr />
      </div>
    );
  } else {
    //서버에서 전달된 데이터가 없을 경우
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <section
          id="mainsection"
          style={{
            backgroundImage: `url(${image})`,
            padding: '60px 0px',
            textAlign: 'center',
            height: '150px',
          }}
        >
          <a href="/upload">
            <p style={{ color: 'white', fontSize: '26px', margin: '0px' }}>알수도 있는 사람</p>
            <p style={{ color: 'white', fontSize: '15px' }}>친구를 찾는데 도움이 됩니다.</p>
          </a>
        </section>
        <br />
        <br />
        <br />
        추천할만한 친구가 없습니다.
      </div>
    );
  }
}

export default YouKnowPage;
