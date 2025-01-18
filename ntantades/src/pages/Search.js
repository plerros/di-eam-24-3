import * as React from 'react';
import Container from '@mui/material/Container';
import { Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';

import NannyBox from "../components/NannyBox";
import TimeRangeSlider from '../components/TimeRangeSlider';

import * as Database from "../components/Database.js"
import municipalities from '../municipalities.json'

export default function Search({municipality, setMunicipality}) {
  const [fullTime, setFullTime] = React.useState(true);
  const [partTime, setPartTime] = React.useState(false);
  const [hours, setHours] = React.useState([9, 17]);

  const [monday,    setMonday]    = React.useState(true);
  const [tuesday,   setTuesday]   = React.useState(true);
  const [wednesday, setWednesday] = React.useState(true);
  const [thursday,  setThursday]  = React.useState(true);
  const [friday,    setFriday]    = React.useState(true);
  const [saturday,  setSaturday]  = React.useState(false);
  const [sunday,    setSunday]   = React.useState(false);

  const handleFullTime = () => {
    if (fullTime === true)
      setPartTime(true);
    setFullTime(!fullTime);
  };

  const handlePartTime = () => {
    if (partTime === true)
      setFullTime(true);
    setPartTime(!partTime);
  };

  const handleMonday = () => {
    setMonday(!monday);
  };
  const handleTuesday = () => {
    setTuesday(!tuesday);
  };
  const handleWednesday = () => {
    setWednesday(!wednesday);
  };
  const handlethursday = () => {
    setThursday(!thursday);
  };
  const handleFriday = () => {
    setFriday(!friday);
  };
  const handleSaturday = () => {
    setSaturday(!saturday);
  };
  const handleSunday = () => {
    setSunday(!sunday);
  };

  var daysArray = [];
  if (monday)
      daysArray.push("MON")
  if (tuesday)
    daysArray.push("TUE")
  if (thursday)
      daysArray.push("THU")
  if (wednesday)
      daysArray.push("WED")
  if (friday)
      daysArray.push("FRI")
  if (saturday)
      daysArray.push("SAT")
  if (sunday)
      daysArray.push("SUN")
  
  const filteredOffers = Database.getOffers({
    notId: 0,
    availableDays: daysArray,
    availableHours: hours,
    requestID: 0
  });

  const nanniesWithOffer = filteredOffers.map((item) => (item.uidNanny));
  const filteredNannies = Database.getUsers({listUserID: nanniesWithOffer, municipality: municipality});

  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column'
      }}>
      <Box>
        {<h1> Αναζήτηση </h1>}
      </Box>
      <Box
        sx = {{
          display:'flex',
          flexDirection: 'row',
          gap: 5
        }}
      >
        <Box
          sx={{
            display:'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Autocomplete
            required={true}
            value={municipality}
            setValue={setMunicipality}
            onChange={(event, newValue) => {
              setMunicipality(newValue)
            }}
            issue={{error:false, help:""}}
            disablePortal
            options={municipalities}
            renderInput={(params) => <TextField {...params} label="Δήμος" />}
          />
          <Divider orientation="horizontal" flexItem />
          <Box>
            Απασχόληση:
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={fullTime} onChange={handleFullTime}/>
                }
                label="Πλήρης"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={partTime} onChange={handlePartTime}/>
                }
                label="Μερική"
              />
            </FormGroup>
          </Box>
          <Divider orientation="horizontal" flexItem />
          <Box>
            Ώρες Εργασίας:
            <TimeRangeSlider value={hours} setValue={setHours} fulltime = {fullTime}/>
          </Box>
          <Divider orientation="horizontal" flexItem />
          <Box>
            Ημέρες Εργασίας:
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={monday} onChange={handleMonday}/>
                }
                label="Δευτέρα"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={tuesday} onChange={handleTuesday}/>
                }
                label="Τρίτη"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={wednesday} onChange={handleWednesday}/>
                }
                label="Τετάρτη"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={thursday} onChange={handlethursday}/>
                }
                label="Πέμπτη"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={friday} onChange={handleFriday}/>
                }
                label="Παρασκευή"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={saturday} onChange={handleSaturday}/>
                }
                label="Σάββατο"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={sunday} onChange={handleSunday}/>
                }
                label="Κυριακή"
              />
            </FormGroup>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flexGrow="1" sx= {{ display:'flex', flexDirection: 'column', gap: 2 }}>
          {filteredNannies.map((user) => (
            <NannyBox uid={user.userID} key={user.userID}/>
          ))}
        </Box>
      </Box>
    </Container>
  );
}