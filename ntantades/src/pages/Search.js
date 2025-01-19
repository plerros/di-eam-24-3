import * as React from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';

import NannyBox from "../components/NannyBox";

import * as Database from "../components/Database.js"
import LookingForConrtols from '../components/LookingForControls.js';

export default function Search({lookingFor_state, lookingFor_dispatch}) {

  var daysArray = [];
  if (lookingFor_state.monday)
      daysArray.push("MON")
  if (lookingFor_state.tuesday)
    daysArray.push("TUE")
  if (lookingFor_state.thursday)
      daysArray.push("THU")
  if (lookingFor_state.wednesday)
      daysArray.push("WED")
  if (lookingFor_state.friday)
      daysArray.push("FRI")
  if (lookingFor_state.saturday)
      daysArray.push("SAT")
  if (lookingFor_state.sunday)
      daysArray.push("SUN")
  
  const filteredOffers = Database.getOffers({
    notId: 0,
    availableDays: daysArray,
    availableHours: lookingFor_state.hours,
    requestID: 0
  });

  const nanniesWithOffer = filteredOffers.map((item) => (item.uidNanny));
  const filteredNannies = Database.getUsers({listUserID: nanniesWithOffer, municipality: lookingFor_state.municipality});

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
        <LookingForConrtols
          lookingFor_state={lookingFor_state}
          lookingFor_dispatch={lookingFor_dispatch}
        />
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