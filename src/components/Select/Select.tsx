import { Select, SelectProps } from 'antd';
import { memo } from 'react';

const SelectForm = (props: SelectProps) => {
  return (
    <Select
      allowClear
      showSearch
      size="large"
      optionFilterProp="children"
      className={`w-full ${props.className}`}
      filterOption={(input: any, option: any) => {
        if (typeof option?.label === 'number') {
          return option.label.toString().includes(input);
        }

        return (option?.label ?? '')
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase());
      }}
      filterSort={(optionA: any, optionB: any) => {
        if (
          typeof optionA?.label === 'number' ||
          typeof optionB?.label === 'number'
        )
          return null;
        return (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase());
      }}
      {...props}
    />
  );
};

export default memo(SelectForm);
