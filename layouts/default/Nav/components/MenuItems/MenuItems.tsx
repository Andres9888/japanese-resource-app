// @ts-nocheck

import { Avatar, Button, Menu } from 'antd';
import Link from 'next/link';

import { LogOutButton } from './components/LogOutButton';
// import { SakuraSlider } from './SakuraSlider';

import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

const MenuItems = ({ viewer, setViewer }: Props) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        {/* <Item key="/user">
          <SakuraSlider />
        </Item> */}
        <Item key="/user">
          <Link href={`/user/${viewer.id}`}>Profile</Link>
        </Item>
        <Item key="/user">
          <Link href="/commit">Commit</Link>
        </Item>
        <Item key="/user">
          <Link href="/log">Log</Link>
        </Item>
        <Item key="/user">
          <Link href="/goals">Goal Setting</Link>
        </Item>
        <Item>
          <a href="https://discord.gg/w2gvPtCRXY" rel="noreferrer" target="_blank">
            Discord
          </a>
        </Item>
        <Item key="/logout">
          <LogOutButton setViewer={setViewer}>Sign Out</LogOutButton>
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link passHref href="/login">
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
