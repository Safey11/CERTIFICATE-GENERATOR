import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const NavApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: <Link to="/Admin">ADMIN</Link> },
    { key: '2', icon: <VideoCameraOutlined />, label: <Link to="/students">STUDENTS</Link> },
    { key: '3', icon: <UploadOutlined />, label: <Link to="/logout">LOGOUT</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png"
            alt="Logo"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={toggleCollapsed} items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavApp;
