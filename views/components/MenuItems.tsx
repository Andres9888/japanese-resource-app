import React from "react";
import Link from 'next/link'

import { Avatar, Button, Icon, Menu } from "antd";


interface Props {
  viewer: Viewer;
  
}

const { Item, SubMenu } = Menu;

 const MenuItems = ({ viewer  }: Props) => {
  
  const subMenuLogin =
  viewer.id && viewer.avatar ? (
    <SubMenu title={<Avatar src={viewer.avatar} />}>
      <Item key="/user">
        <Link href="/user/1">
          Profile
        </Link>
      </Item>
    </SubMenu>
  ) : (
    <Item key="/login">
    <Link href="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Item>
  );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      
      {subMenuLogin}
    </Menu>
  );
};

export default MenuItems
