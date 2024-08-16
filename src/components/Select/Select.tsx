import { Select, SelectProps } from 'antd';
import { memo } from 'react';

const SelectForm = (props: SelectProps) => {
  const handleFilterOption = (input: any, option: any) => {
    if (typeof option?.label === 'number')
      return option.label.toString().includes(input);

    return (option?.label ?? '')
      .toString()
      .toLowerCase()
      .includes(input.toLowerCase());
  };

  const handleFilterSort = (optionA: any, optionB: any) => {
    if (
      typeof optionA?.label === 'number' ||
      typeof optionB?.label === 'number'
    )
      return null;

    return (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase());
  };

  return (
    <Select
      allowClear
      showSearch
      size="large"
      optionFilterProp="children"
      className={`w-full ${props.className}`}
      filterSort={handleFilterSort}
      filterOption={handleFilterOption}
      {...props}
    />
  );
};

export default memo(SelectForm);
