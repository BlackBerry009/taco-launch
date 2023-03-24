import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
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
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className='h-screen'
      >
        <div className="flex justify-center items-center h-16">
          <div className="w-16">
            <LogoImg />
          </div>
        </div>
        <SideMenus />
      </Sider>
      <Layout>
        <Header className="bg-white" />
        <Content className="m-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
