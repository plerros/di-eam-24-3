import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const min = 8
const max = 24

const marks = [
    {value: min,  label: `${min}:00`},
    {value: max,  label: `${max}:00`},
  ];

function valuetext(value) {
  return `${value}:00`;
}

export default function TimeRangeSlider({value, setValue, minDistance}) {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance + min);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ pt:5, width: 300}}>
      <Slider
        getAriaLabel={() => 'Time range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        min={min}
        max={max}
        step={1}
        marks={marks}
        disableSwap
      />
    </Box>
  );
}