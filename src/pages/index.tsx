import React, {useState} from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Input, Button, message } from 'antd';
import './index.less';

const { Header, Content, Sider } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState("子菜单1-1");
  const [activeMenuKey, setActiveMenuKey] = useState("1");
  const [menuItems, setMenuItems] = useState([
    {
      label: "菜单一",
      key: 'sub1',
      icon: <UserOutlined />,
      type: 'group',
      children: [
        {
          label: "子菜单1-1",
          key: '1',
        },
        {
          label: "子菜单1-2",
          key: '2',
        },
      ]
    },
    {
      label: "菜单二",
      key: 'sub2',
      icon: <LaptopOutlined />,
      type: 'group',
      children: [
        {
          label: "子菜单2-1",
          key: '3',
        },
        {
          label: "子菜单2-2",
          key: '4',
        },
      ]
    },
  ]);

  const handleMenuClick = ({ item, key, keyPath, domEvent }: any) => {
    setActiveMenuKey(key);
    [...menuItems[0].children, ...menuItems[1].children].map((item, index)=>{
      if(key == item.key){
        setActiveMenuName(item.label);
      }
    })
  }

  const handleSaveMenuName = () => {
    if(activeMenuName){
      [...menuItems[0].children, ...menuItems[1].children].map((item, index)=>{
        if(activeMenuKey == item.key){
          item.label = activeMenuName;
        }
      })
      setMenuItems([...menuItems]);
    }else{
      message.error("名称不能为空");
    }
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        {/*<div className="demo-logo" >*/}
        {/*  <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />*/}
        {/*  <span className="css-zsb1p1">react</span>*/}
        {/*</div>*/}
      </Header>
      <Layout>
        <Sider width={200} theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1','sub2']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            theme="dark"
            onSelect={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Input value={activeMenuName} onChange={(e)=>setActiveMenuName(e.target.value)}/>
            <Button type="primary" onClick={handleSaveMenuName}>保存</Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
