import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import SideMenus from './SideMenu';
import { ReactComponent as LogoImg } from '@/assets/logo.svg';

const { Sider, Header, Content } = Layout;

export const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const jump2Page = (keyPath: string[]) => {
    navigate(keyPath.join());
  };
  return (
    <Layout className="layout-app">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className='sider'
      >
        <div className="logo-area">
          <div className="logo">
            <LogoImg />
          </div>
        </div>
        <SideMenus />
      </Sider>
      <Layout>
        <Header className="bg" />
        <Content className="my-4">
          <Outlet />
        </Content>
        {/* <Footer className='text-center'>
          A tools collection for girlfriend😊
        </Footer> */}
      </Layout>
    </Layout>
  );
};
