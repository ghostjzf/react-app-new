import React from 'react';
import Descriptions from '@/components/Descriptions';

export default () => {
  const columns = [
    {
      dataIndex: 'name',
      title: 'Name'
    },
    {
      dataIndex: 'age',
      title: 'Age'
    }
  ];

  const dataSource = {
    name: '韬柏',
    age: '28'
  };

  return <Descriptions title="用户信息" dataSource={dataSource} columns={columns} />;
};
