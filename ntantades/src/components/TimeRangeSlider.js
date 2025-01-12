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

export default function TimeRangeSlider({value, setValue, fulltime}) {
  var minDistance = (fulltime) ? 8 : 4;
  var maxDistance = (fulltime) ? 8 : 4;

  React.useEffect (() => {
    if (value[1]-value[0] < minDistance)
      setValue([value[0], value[0] + minDistance]);
    if (value[1]-value[0] > maxDistance)
      setValue([value[0], value[0] + maxDistance]);
  }, [minDistance, maxDistance, value, setValue]);

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
    } else if (newValue[1] - newValue[0] > maxDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - maxDistance);
        setValue([clamped, clamped + maxDistance]);
      } else {
        const clamped = Math.max(newValue[1], maxDistance + min);
        setValue([clamped - maxDistance, clamped]);
      }

    } else {
      setValue(newValue);
    }
  };


  return (
    <Box sx={{ pt:5, width: 250}} mx={3}>
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