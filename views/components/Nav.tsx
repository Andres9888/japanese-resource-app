import React from 'react'
import Link from 'next/link'
import { Layout, Avatar, Affix, Input, Button, Icon, Menu } from 'antd'
import MenuItems from '~views/components/MenuItems'
import { useRouter } from 'next/router'

const { Header } = Layout
const { Search } = Input
const { Item, SubMenu } = Menu

const Nav = ({ viewer, searchTerm, handleChange }) => {
  const router = useRouter()

  console.log(router)
  return (
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
            <Link href='/'>
              <div>
              <Icon type="home" />
              </div>
            </Link>
          </div>
          {router.asPath === '/' ? (
            <div className='app-header__search-input'>
              <Search
                type='text'
                placeholder='Search'
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className='app-header__menu-section'>
          <MenuItems viewer={viewer} />
        </div>
      </Header>
    </Affix>
  )
}

export default Nav
