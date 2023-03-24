import { AppstoreOutlined } from "@ant-design/icons";
import { LayoutApp } from "./components/Layout";
import { Home } from "./pages/Home";
import { Show } from "./pages/Show";

export type RouteNode = {
  title?: string;
  icon?: React.ReactNode;
  path: string;
  element?: React.ReactNode;
  children?: RouteNode[];
  access?: boolean; // auth by uac config
  sideMenu?: boolean; // if show in side
};

export const routes: RouteNode[] = [
  {
    title: '首页',
    path: '/',
    element: <Home />,
  },
  {
    title: '展示',
    path: '/show',
    element: <Show />,
    sideMenu: true,
    icon: <AppstoreOutlined />
  },
];
