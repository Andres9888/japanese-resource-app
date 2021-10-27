import React from 'react';

import { Avatar, Button, Menu } from 'antd';
import Link from 'next/link';

import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
}

const { Item, SubMenu } = Menu;

const MenuItems = ({ viewer }: Props) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link href={`/user/${viewer.id}`}>Profile</Link>
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
