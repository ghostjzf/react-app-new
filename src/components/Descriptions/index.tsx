import React, { FC } from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';

const Item = Descriptions.Item;

interface DescriptonsCompProps extends DescriptionsProps {
  dataSource: any;
  columns: any[];
  descriptionsItemProps?: DescriptionsItemProps;
}

const DescriptonsComp: FC<DescriptonsCompProps> = ({ dataSource, columns, descriptionsItemProps = {}, ...rest }) => {
  function renderItem(item: any) {
    if (item.render && typeof item.render === 'function') {
      if (!item.dataIndex) {
        return item.render(item);
      }
      return item.render(dataSource[item.dataIndex], item);
    }
    return dataSource[item.dataIndex];
  }

  return (
    <Descriptions {...rest}>
      {columns.map((item) => {
        return (
          <Item key={item.dataIndex} label={item.title} {...descriptionsItemProps}>
            {renderItem(item)}
          </Item>
        );
      })}
    </Descriptions>
  );
};

export default DescriptonsComp;
