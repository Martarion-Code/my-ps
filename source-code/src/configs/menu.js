import { AppstoreOutlined  } from '@ant-design/icons'

export const menus = [
  {
    key: '/admin/dashboard',
    label: 'Dashboard',                                                                                                                                                                                                                                                                        
    icon: <AppstoreOutlined />,
    style: {
      fontWeight: 'normal'
    }
  },
  {
    key: '/admin/users',
    label: 'Users',
    icon: <AppstoreOutlined />,
    permission_code: 'read_isp_customer',
    style: {
      fontWeight: 'normal'
    }
  },
  {
    key: '/admin/transactions',
    label: 'Transactions',
    icon: <AppstoreOutlined />,
    style: {
      fontWeight: 'normal'
    }
  },
 
  {
    key: '/admin/ps',
    label: 'PS',
    icon: <AppstoreOutlined />,
    permission_code:"read_item",
    style: {
      fontWeight: 'normal'
    }
  },

  {
    key: '/logout',
    label: 'Logout',
    // icon: <AppstoreOutlined />,
    // permission_code:"read_item",
    style: {
      fontWeight: 'normal'
    }
  },
]
