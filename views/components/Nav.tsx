import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'
import { Layout } from "antd";

const { Header } = Layout;

const Nav = ({viewer}) =>(
  <Header className="app-header">
      <div className="app-header__logo-search-section">
      </div>
      <div className="app-header__menu-section">
      <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Login Page</a>
        </Link>
      </li>
      <li>
        <img src={viewer ? viewer.avatar : ""} alt=""/>
      </li>
    </ul>
  </nav>
      </div>
    </Header>
)

export default Nav


