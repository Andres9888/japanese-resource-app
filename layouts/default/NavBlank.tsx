// @ts-nocheck

import { Layout, Affix, Icon } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

const NavBlank = () => {
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
      </Header>
    </Affix>
  );
};

export default NavBlank;
