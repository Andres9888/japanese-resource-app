import React,{useState} from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LogIn from '~views/ui/LogIn'




function loginPage({setViewer}){
  return (
    <div>
    <LogIn setViewer={setViewer}/>
    </div>
  )
}

export default loginPage
