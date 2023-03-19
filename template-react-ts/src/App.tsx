import { useRoutes } from 'react-router-dom';
import { LayoutApp } from './components/Layout';
import { RouteNode, routes } from './route';

const wrapRoutes = [
  {
    path: '/',
    element: <LayoutApp />,
    children: routes,
  },
];

export function getSideMenuRoutes(list: RouteNode[]): RouteNode[] {
  const nodes: RouteNode[] = [];
  list.forEach((l) => {
    console.log(l, l.sideMenu);
    if (l.sideMenu) {
      const item = { ...l };
      if (l.children && l.children.length) {
        item.children = l.children.filter((v) => !!v.sideMenu);
      }
      nodes.push(item);
    }
  });
  return nodes;
}

export const App = () => {
  return useRoutes(wrapRoutes);
};

export const sideMenuRoutes = getSideMenuRoutes(routes);

console.log('sideMenuRoutes', sideMenuRoutes);
