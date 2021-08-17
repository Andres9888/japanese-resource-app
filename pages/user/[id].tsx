import React,{useState} from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import styled from 'styled-components'
import NavBlank from '~views/components/NavBlank'
import { Avatar, Button, Card, Divider, Tag, Typography } from "antd";




const { Paragraph, Text, Title } = Typography;

function userPage({viewer}){
  return (
    <div>
    <NavBlank viewer={viewer} />  
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={viewer.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong></Text>
          </Paragraph>
        </div>
      </Card>
    </div>
    </div>
  )
}

export default userPage
