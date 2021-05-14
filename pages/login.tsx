import React from 'react'
import LogIn from '~views/ui/LogIn'
//import styled from 'styled-components'
import Nav from '~views/components/Nav'





function loginPage({setViewer,viewer}){
  return (
    <div>
    <Nav viewer={viewer}/>  

    <LogIn setViewer={setViewer}/>
    </div>
  )
}

export default loginPage
