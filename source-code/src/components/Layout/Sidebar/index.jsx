'use client'
import { Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { menus } from '@/configs/menu';

// Subcomponent with client-side logic
const SiderWithState = ({ transformedPermissions }) => {
  const [collapsed, setCollapsed] = useState(false);

  

  const collapsedHandler = (value) => {
    setCollapsed(value);
  };

  return (
    <SiderComponent
      collapsed={collapsed}
      collapsedHandler={collapsedHandler}
      transformedPermissions={transformedPermissions}
    />
  );
};
export default SiderWithState

const { Sider } = Layout;

const SiderComponent = ({ collapsed, collapsedHandler }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleSelectMenu = (menu) => {
    router.push(menu?.key);
  };

  return (
    <Sider
      collapsible
      width={250}
      style={{
        backgroundColor: theme.useToken().token.colorBgContainer,
      }}
      collapsed={collapsed}
      onCollapse={collapsedHandler}
    >
      <div
        style={{
          height: collapsed ? 100 : 30,
          margin: 16,
          background: theme.useToken().token.colorBgContainer,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src="/assets/smt-logo.png"
          width={102.4}
          height={30}
          alt="logo"
          style={{
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={[currentPath]}
        mode="inline"
        items={menus}
        onClick={handleSelectMenu}
      />
    </Sider>
  );
};