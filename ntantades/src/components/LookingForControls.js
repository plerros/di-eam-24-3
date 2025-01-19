import { Autocomplete, Box, Checkbox, Divider, FormControlLabel, FormGroup, TextField } from "@mui/material"
import TimeRangeSlider from "./TimeRangeSlider"

import municipalities from '../municipalities.json'

export default function LookingForControls({lookingFor_state, lookingFor_dispatch, municipality, hours}) {
  const municipalityField = (municipality) ? (
    municipality
  ) : (
    <Autocomplete
      required={true}
      value={lookingFor_state.municipality}
      onChange={(event, newValue) => {
        lookingFor_dispatch({
          type: 'changed_municipality',
          nextMunicipality: newValue
        })
      }}
      issue={{error:false, help:""}}
      disablePortal
      options={municipalities}
      renderInput={(params) => <TextField {...params} label="Δήμος" />}
    />
  );
  const hoursField = (hours) ? (
    <Box>
      {hours[0]}
      -
      {hours[1]}
    </Box>
  ) : (
    <TimeRangeSlider
      value={lookingFor_state.hours}
      setValue={(newValue) => {
        lookingFor_dispatch({
          type: 'changed_hours',
          nextHours: newValue
        })
      }}
      fulltime = {lookingFor_state.fullTime}
    />
  );

  return (
    <Box
      sx={{
        display:'flex',
        flexDirection: 'column',
        gap: 2,
        p: 1
      }}
    >
      {municipalityField}
      <Divider orientation="horizontal" flexItem />
      <Box>
        Απασχόληση:
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.fullTime} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_fullTime'
                })
              }}/>
            }
            label="Πλήρης"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.partTime} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_partTime'
                })
              }}/>
            }
            label="Μερική"
          />
        </FormGroup>
      </Box>
      <Divider orientation="horizontal" flexItem />
      <Box>
        Ώρες Εργασίας:
        {hoursField}
      </Box>
      <Divider orientation="horizontal" flexItem />
      <Box>
        Ημέρες Εργασίας:
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.monday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_monday'
                })
              }}/>
            }
            label="Δευτέρα"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.tuesday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_tuesday'
                })
              }}/>
            }
            label="Τρίτη"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.wednesday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_wednesday'
                })
              }}/>
            }
            label="Τετάρτη"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.thursday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_thursday'
                })
              }}/>
            }
            label="Πέμπτη"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.friday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_friday'
                })
              }}/>
            }
            label="Παρασκευή"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.saturday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_saturday'
                })
              }}/>
            }
            label="Σάββατο"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lookingFor_state.sunday} onChange={() => {
                lookingFor_dispatch({
                  type: 'toggled_sunday'
                })
              }}/>
            }
            label="Κυριακή"
          />
        </FormGroup>
      </Box>
    </Box>
  )
}