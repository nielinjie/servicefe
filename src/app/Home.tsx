import React, { FC } from 'react';

import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./index.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Welcome, Issues } from "./pages"
import { Menu, Layout } from 'antd';


const {
  Header, Content, Footer, Sider,
} = Layout;



export const Home: FC = () => {
  return (
    <Router>
      <Layout>
        <Sider style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        ></Sider>
        <Menu theme="dark" mode="inline" style={{ width: 200 }}>
          <Menu.Item key="1">
            <Link to="/">主页</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/issues">问题</Link>
          </Menu.Item>
        </Menu>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} >演进架构控制台</Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Route exact path="/" component={Welcome} />
            <Route path="/issues" component={Issues} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            nielinjie.github.com
          </Footer>
        </Layout>
      </Layout>
    </Router>
  )
}