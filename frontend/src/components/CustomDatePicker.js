import React from 'react';
import moment from "moment";
import { DatePicker } from 'antd';

const CustomDatePicker = props => {
  const {value, onChange, ...other} = props;
  
  const time = value ? moment(value) : null;
  const triggerChange = (_, dateStr) => {
    onChange && onChange(dateStr);
  };

  return (
    <DatePicker
      defaultValue={time}
      onChange={triggerChange}
      {...other}
    />
  )
};

export default CustomDatePicker;