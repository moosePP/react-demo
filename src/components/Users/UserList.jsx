import React, {PropTypes} from 'react';
import { Table, message, Popconfirm } from 'antd';

const UserList = ({
	total,
	current,
	loading,
	dataSource,
}) => {
	const columns = [{
			title: 'Data Site',
	    dataIndex: 'site',
	    key: 'site',
	}, {
			title: 'Building',
	    dataIndex: 'building',
	    key: 'building',
	}, {
			title: 'Floor',
	    dataIndex: 'floor',
	    key: 'floor',
	}, {
			title: 'Room NO.',
	    dataIndex: 'roomNO',
	    key: 'roomNO',
	}, {
	    title: 'Capacity',
	    dataIndex: 'capacity',
	    key: 'capacity',
	}, {
	    title: 'Equipment',
	    dataIndex: 'equipment',
	    key: 'equipment',
	},  {
	    title: 'Extension Number',
	    dataIndex: 'extNumber',
	    key: 'extNumber',
	},  {
	    title: 'Status',
	    dataIndex: 'status',
	    key: 'status',
    }, {
	    title: 'Operation',
	    key: 'operation',
	    render: (text, record) => (
	      <p>
	        <a onClick={()=>{}}>编辑</a>
	        &nbsp;
	        <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
	          <a>删除</a>
	        </Popconfirm>
	      </p>
	     ),
    }];

    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: ()=>{},
    };

	  return (
	    <div>
	      <Table
	        columns={columns}
	        dataSource={dataSource}
	        loading={loading}
	        rowKey={record => record.id}
	        pagination={pagination}
	      />
	    </div>
	  );
}

export default UserList;