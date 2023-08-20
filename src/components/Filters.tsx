import { DatePicker, TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
const { RangePicker } = DatePicker;
interface FiltersProps {
  onFilterChange: (values: (dayjs.Dayjs)[]) => void;
}

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'today', value: [dayjs(), dayjs()] },
  { label: 'tomorrow', value: [dayjs(), dayjs().add(1, 'd')] },
  { label: 'This week', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: 'Next week', value: [dayjs().endOf('week').add(1, 'd'), dayjs().add(7, 'd')] },
  { label: 'This month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
];



const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const onRangeChange = (dates: null | (dayjs.Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      onFilterChange([dates[0], dates[1]]);
    }else{
      onFilterChange([]);
    }
  };
  return (
    <span>
      Filter by:  <RangePicker presets={rangePresets} onChange={onRangeChange} />
    </span>
  );
};

export default Filters;