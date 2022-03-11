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
        <Item key="/feed">
          <Link href="/feed">Feed</Link>
        </Item>
        <Item key="/timeline">
          <Link href="/timeline">Timeline</Link>
        </Item>
        {/* <Item key="/explore/anime">
          <Link href="/explore/anime">Explore</Link>
        </Item> */}
        <Item key="/logout">
          <LogOutButton setViewer={setViewer} />
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
