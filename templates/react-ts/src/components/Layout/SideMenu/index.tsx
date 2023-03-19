import { Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sideMenuRoutes } from '../../../App';

function compoundOpenPath(list: string[] = []): string[] {
  if (!list.length) return [];
  const len = list.length;
  let prev = list[0];
  let i = 1;
  const result: string[] = [];
  while (i < len) {
    prev = [prev, list[i]].join('/');
    result.push(prev);
    i++;
  }
  return result;
}

function SideMenus() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const [openKeys, setOpenKeys] = useState<string[]>();

  const handleMenuClick = (e: any) => {
    setSelectedKeys(e.key);
    setOpenKeys(e.keyPath);
  };

  const handleOpenChange = (keys: any) => {
    setOpenKeys(keys);
  };

  const menuItems = useMemo(() => {
    const list: any = [];
    sideMenuRoutes.forEach((r) => {
      list.push({
        label: <Link to={r.path}>{r.title}</Link>,
        key: r.path,
        icon: r.icon
      });
    });
    return list;
  }, []);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    const arr = location.pathname.split('/');
    setOpenKeys(compoundOpenPath(arr));
  }, [location.pathname]);

  return (
    <Menu
      theme='light'
      mode='inline'
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={handleMenuClick}
      items={menuItems}
    />
  );
}

export default SideMenus;
