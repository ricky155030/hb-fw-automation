import React from 'react'
import { Table, Icon, Button, Menu, Dropdown, Tooltip } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Progress',
  dataIndex: 'progress',
  key: 'progress',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  progress: 20,
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'New York No. 1 Lake Park',
  progress: 40,
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'New York No. 1 Lake Park',
  progress: 30,
}];

class App extends React.Component {
  state = {
    dropdownVisible: false,
    showColumnKeys: columns.map(col => col.key),
    cacheShowColumnKeys: columns.map(col => col.key),
  };
  onMenuSelect = ({ selectedKeys }) => {
    this.setState({ cacheShowColumnKeys: selectedKeys });
  }
  onDropdownVisibleChange = (visible) => {
    if (!visible) {
      this.setState({
        showColumnKeys: this.state.cacheShowColumnKeys,
        dropdownVisible: visible,
      });
      return;
    }
    this.setState({ dropdownVisible: visible });
  }
  render() {
    const { showColumnKeys, cacheShowColumnKeys, dropdownVisible } = this.state;
    const menuitems = columns.map(col => {
      return (
        <Menu.Item key={col.key} className="filter-column-menu-item">
          {col.title}
          {
            cacheShowColumnKeys.indexOf(col.key) >= 0
              ? <Icon type="check" /> : null
          }
        </Menu.Item>
      );
    });
    const menu = (
      <Menu
        multiple
        selectedKeys={cacheShowColumnKeys}
        onSelect={this.onMenuSelect}
        onDeselect={this.onMenuSelect}
        selectable
       >
        {menuitems}
      </Menu>
    );
    const showColumns = columns.filter(col => showColumnKeys.indexOf(col.key) >= 0);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary">Add</Button>
          <div style={{ float: 'right' }}>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              visible={dropdownVisible}
              onVisibleChange={this.onDropdownVisibleChange}
              placement="bottomRight"
            > 
              <Tooltip title="Select columns" placement="left">
                <Icon type="bars" className="filter-column-icon" />
              </Tooltip>
            </Dropdown>
          </div>
        </div>
        <Table
          columns={showColumns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default App
