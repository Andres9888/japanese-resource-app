// @ts-nocheck
import { Layout, Affix, Icon } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MenuItems from './components/MenuItems';

import SearchBar from '~common/components/SearchBar';
import { Viewer } from '~types/globalTypes';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const { Header } = Layout;

const Nav = ({ viewer, setViewer, searchTerm, handleSearchChange }: Props) => {
  const router = useRouter();

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
          {router.asPath === '/' ? <SearchBar handleSearchChange={handleSearchChange} searchTerm={searchTerm} /> : null}
        </div>
        <div className="app-header__menu-section">
          <MenuItems setViewer={setViewer} viewer={viewer} />
        </div>
      </Header>
    </Affix>
  );
};

export default Nav;
