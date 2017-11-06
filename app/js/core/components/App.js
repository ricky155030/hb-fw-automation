import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import style from './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import TicketForm from 'registration/components/Form'

class App extends React.PureComponent {
  constructor(props) {
    super()

    this.state = {
      collapsed: true
    }
  }

  toggle = () => this.setState({ collapsed: !this.state.collapsed })

  render () {
    return (
      <Router>
        <Layout className={style.page}>
          <Layout.Sider 
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={style.title}>
              HBFW
            </div>
            <Menu
              theme="dark"
              mode="inline"
            >
              <Menu.Item>
                <Link to="/create">
                  <Icon type="plus" />
                  <span>Create Ticket</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/create">
                  <Icon type="file-text" />
                  <span>View Ticket</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout>
            <Layout.Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={style.slideIcon}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Layout.Header>
			      <Layout.Content className={style.content}>
              <Route exact path="/create" component={TicketForm} />
			      </Layout.Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default App
