import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
import { Layout, Avatar, Affix, Input, Button, Icon, Menu } from 'antd'



const { Header } = Layout
const { Search } = Input
const { Item, SubMenu } = Menu

const Nav = ({ viewer, searchTerm, handleChange  }) =>{
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
      </SubMenu>
    ) : (
      <Item key="/login">
      <Link href="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );
  
  
  return(
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
          <Link href="/">
              <div>
              <h1>Home</h1>
              </div>
            </Link>
          </div>
          <div className='app-header__search-input'>
            <Search
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
        />
          </div>
        </div>
        <div className="app-header__menu-section">
        <Menu mode="horizontal" selectable={false} className="menu">
        {subMenuLogin}
    </Menu>
        </div>
      </Header>
    </Affix>)}
    


export default Nav
