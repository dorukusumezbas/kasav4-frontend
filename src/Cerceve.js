import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Typography, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Entries from './components/Entries';
import Cikis from "./components/Cikis";
import logo from './resources/logo.png'

const { Header, Content, Footer, Sider } = Layout
const { Title } = Typography
const { SubMenu } = Menu
function Cerceve() {
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
          style={{height: "100vh", backgroundColor: "#d9d9d9" }}
        >

          <div className="logo" ><img src={logo} style={{height: 32 }}/></div>
            <Menu style={{backgroundColor: "#d9d9d9" }} mode="inline" defaultSelectedKeys={['4']}>
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
            <SubMenu
              key="sub2"
              title={
                <span>
              <Icon type="appstore" />
              <span>Yeni İşlem</span>
            </span>
              }
              style={{backgroundColor: "#d9d9d9"}}
            >
              <Menu.Item key="3">Giriş<Link to="/Giris" /></Menu.Item>
              <Menu.Item key="4">Çıkış<Link to="/Cikis" /></Menu.Item>
              <Menu.Item key="5">Virman<Link to="/Virman" /></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: "center", paddingTop: "10px"}}>
                <Title level={2}> Kasa v4</Title>
          </Header>
          <Content style={{ margin: '0px 0px 20px' }}>
            <div style={{ background: "#fff", minHeight: 360 }}>
              <Route exact path="/" component={Dashboard} />
              <Route path="/Entries" component={Entries} />
              <Route path="/Cikis" component={Cikis} />
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
