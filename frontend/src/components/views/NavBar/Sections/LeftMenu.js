import React from 'react';
import { Menu } from 'antd';
import {Link } from 'react-router-dom';
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {

  const user = useSelector(state => state.user);
  
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="친구추천" style={{marginTop: '5px'}}>
        <Link to={{
                  pathname : `/youknow`,
                  state : {
                     user : user.userData
                  }
               }}><span>친구추천</span>
               </Link>
        
      </Menu.Item>
      <Menu.Item key="친구찾기" style={{marginTop: '5px'}}>
        <Link to={{
                  pathname : `/find`,
                  state : null
               }}><span>친구찾기</span>
               </Link>
        
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu