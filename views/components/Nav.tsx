import React, { useEffect } from 'react'
import Link from 'next/link'
import { Layout, Affix, Input, Icon } from 'antd'
import MenuItems from '~views/components/MenuItems'
import { useRouter } from 'next/router'
import Typed from 'typed.js'

const { Header } = Layout
const { Search } = Input

const Nav = ({ viewer, searchTerm, handleChange }) => {
  const router = useRouter()

  useEffect(() => {
    // Options for the Typed object
    const options = {
      strings: [
        'Hey, If you need to find something just search and it will filter it',
        'For Example',
        'Guide',
        'Grammar',
        'Tool',
        '',
      ],
      bindInputFocusEvents: true,
      attr: 'placeholder',
      typeSpeed: 25,
      backSpeed: 25,
      cursorChar: '_',
      startDelay: 1000,
      smartBackspace: true,
      showCursor: true,
    }

    // New Typed instance
    const typed = new Typed('.ant-input', options)

    // Destroy Typed instance on unmounting the component to prevent memory leaks
    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <Affix offsetTop={0} className='app__affix-header'>
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
            <Link href='/'>
              <div>
                <Icon type='home' />
              </div>
            </Link>
          </div>
          {router.asPath === '/' ? (
              <Search
                type='text'
                placeholder='Search to filter what you are looking for'
                value={searchTerm}
                onChange={handleChange}
              />
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
