import React from 'react';

import { Layout, Affix, Icon } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Viewer } from '~types/globalTypes';
import MenuItems from '~views/components/MenuItems';

interface Props {
  viewer: Viewer;
}

const { Header } = Layout;

const NavBlank = ({ viewer }: Props) => {
  const router = useRouter();

  console.log(router);
  return (
    <Affix className="app__affix-header" offsetTop={0}>
      <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
            <Link href="/">
              <div>
                <Icon type="home" />
              </div>
            </Link>
          </div>
        </div>
        <div className="app-header__menu-section">
          <MenuItems viewer={viewer} />
        </div>
      </Header>
    </Affix>
  );
};

export default NavBlank;
