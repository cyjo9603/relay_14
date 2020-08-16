/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
 
  const logoutHandler = () => {

    dispatch(logoutUser())
      .then(response => {
        if (response.payload.success) {
          window.location.reload();
        } else {
          alert('Failed to log out')
        }
      })
  };

  
  if(user.loginSucces && user.loginSucces.loginSuccess && user.userData && !user.userData.isAuth) {
    window.location.replace("/");         //수동 새로고침 proxy 사용 문제로 인해서...
  }
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item style={{ background:"white", border:'0px solid white',color:'black'}}key="name">
          <p style={{marginBottom:'1px', marginRight:'5px'}}>{(user.userData ? `안녕하세요, ${user.userData.name} 님` : ' ')}</p>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;

