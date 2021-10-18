import React from 'react';

import { Avatar, Button, Menu } from 'antd';
import Link from 'next/link';

const { Item, SubMenu } = Menu;

const MenuItems = ({ viewer }) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link href="/user/1">Profile</Link>
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
    <Menu className="menu" mode="horizontal" selectable={false}>
      {subMenuLogin}
    </Menu>
  );
};

export default MenuItems;
