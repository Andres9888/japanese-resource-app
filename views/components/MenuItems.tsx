// @ts-nocheck

import React from 'react';

import { Avatar, Button, Menu } from 'antd';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';

import { Viewer } from '~types/globalTypes';
import gql from 'graphql-tag';

import { displaySuccessNotification, displayErrorMessage } from '~lib/utils';
interface Props {
  viewer: Viewer;
}

const { Item, SubMenu } = Menu;
const LOG_OUT = gql`
  mutation LogOut {
    logOut {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        //sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!");
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link href={`/user/${viewer.id}`}>Profile</Link>
        </Item>
        <Item key="/feed">
          <Link href="/feed">Feed</Link>
        </Item>
        <Item key="/timeline">
          <Link href="/timeline">Timeline</Link>
        </Item>
        <Item key="/explore/anime">
          <Link href="/explore/anime">Explore</Link>
        </Item>
        <Item key="/logout">
          <div onClick={handleLogOut}>Log out</div>
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
