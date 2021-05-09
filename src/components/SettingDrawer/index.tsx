import React from 'react';
import { SettingOutlined } from '@ant-design/icons';

const Setting = () => {
  return (
    <SettingOutlined
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      }}
      height={200}
      width={200}
    />
  );
};

export default Setting;
