
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import React from 'react';
import menu from '../../config/menu';
import './styles.css';
import { NavLink } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface ISiderProps {
  contentComponent: React.ReactNode;
}
export default class SiderBar extends React.Component<ISiderProps> {
  state = {
    collapsed: false,
    menuList: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    const menuList = this.getMenuList(menu);
    this.setState({
      menuList
    })
  }

  getMenuList = (menu: any[]) => {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={<span>{item.icon}<span>{item.title}</span></span>}>
            {this.getMenuList(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key} >
            {item.icon && item.icon}
            <span>{item.title}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >赶路人</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']}>
            {this.state.menuList}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 4 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            // className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 16,
            }}
          >
            {this.props.contentComponent}
          </Content>
        </Layout>
      </Layout>
    );
  }
}