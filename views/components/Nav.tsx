import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
import { Layout, Avatar, Affix, Input, Button, Icon, Menu } from 'antd'
import SearchBar from '~views/components/SearchBar'



const { Header } = Layout
const { Search } = Input
const { Item, SubMenu } = Menu

const Nav = ({ viewer, searchTerm, handleChange  }) =>{
  
  
  
  return(
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'></div>
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
      <Item key="/login">
      <Link href="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    </Menu>
        </div>
      </Header>
    </Affix>)}
    


export default Nav
