import React,{useState} from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import Nav from '~views/components/Nav'
import styled from 'styled-components'
import LogIn from '~views/ui/LogIn'




function loginPage({setViewer}){
  return (
    <LogIn setViewer={setViewer}/>
  )
}

export default loginPage
