import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
import { Layout, Avatar, Affix, Input, Button, Icon, Menu } from 'antd'

const { Header } = Layout
const { Search } = Input
const { Item, SubMenu } = Menu

const Nav = ({ viewer }) =>(
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'></div>
          <div className='app-header__search-input'>
            <Search placeholder="Search 'San Fransisco'"/>
          </div>
        </div>
      </Header>
    </Affix>)
    


export default Nav
