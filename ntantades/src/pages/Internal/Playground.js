import * as React from 'react';

import Container from '@mui/material/Container';
import TimeRangeSlider from '../../components/TimeRangeSlider';

export default function Playground({handleRoleNanny, handleRoleFamily, handleRoleNone}) {
  const [value, setValue] = React.useState([9, 17]);
  return (
    <Container maxWidth="xl">
    <TimeRangeSlider value={value} setValue={setValue} minDistance = {8}/>
    </Container>
  );
}