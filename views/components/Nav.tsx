import React, { useEffect } from 'react';

import { Layout, Affix, Icon } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typed from 'typed.js';

import SearchBar from '~features/searchBar';
import { Viewer } from '~types/globalTypes';
import MenuItems from '~views/components/MenuItems';

interface Props {
  viewer: Viewer;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const { Header } = Layout;

const Nav = ({ viewer, searchTerm, handleSearchChange }: Props) => {
  const router = useRouter();

  useEffect(() => {
    // Options for the Typed object
    const options = {
      strings: ['Hey, If you need to find something just search and it will filter it', 'For Example', 'Guide', 'Grammar', 'Tool', ''],
      bindInputFocusEvents: true,
      attr: 'placeholder',
      typeSpeed: 25,
      backSpeed: 25,
      cursorChar: '_',
      startDelay: 1000,
      smartBackspace: true,
      showCursor: true,
    };

    // New Typed instance
    const typed = new Typed('.ant-input', options);

    // Destroy Typed instance on unmounting the component to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);

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
          {router.asPath === '/' ? <SearchBar handleSearchChange={handleSearchChange} searchTerm={searchTerm} /> : <div />}
        </div>
        <div className="app-header__menu-section">
          <MenuItems viewer={viewer} />
        </div>
      </Header>
    </Affix>
  );
};

export default Nav;
