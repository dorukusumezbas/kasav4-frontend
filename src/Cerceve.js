import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Typography, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Entries from './components/Entries';
import Form1 from "./components/Form1";
import logo from './resources/logo.png'

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function Cerceve(props) {
  return (
    <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{height: "100vh"}}
        >

          <div className="logo" ><img src={logo} style={{height: 32 }}/></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">Anasayfa</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">Tablo</span>
              <Link to="/Entries" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">Yeni Giriş</span>
              <Link to="/Form1"/>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: "center", paddingTop: "10px"}}>
                <Title level={2}> Kasa v4</Title>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Route exact path="/" component={Dashboard} />
              <Route path="/Entries" component={Entries} />
              <Route path="/Form1" component={Form1} />
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Touché Privé
            ©2019 Created by BrainFog Digitals</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Cerceve;
