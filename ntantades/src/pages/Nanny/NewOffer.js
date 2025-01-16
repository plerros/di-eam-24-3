import * as React from "react"
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid2 } from "@mui/material";
import TimeRangeSlider from "../../components/TimeRangeSlider";
import { Navigate } from "react-router-dom";

import * as Database from "../../components/Database"

const issueNone = {error:false, help:""};
//const issueRequired = {error:true, help:"Υποχρεωτικό"};

function LSgetItemSafe(item, defaultVal)
{
  const result = JSON.parse(localStorage.getItem(item));
  return (result === null) ? defaultVal : result;
}

const initialState = {
  type                 : LSgetItemSafe('newOfferType', "FullTime"),
  typeIssue            : issueNone,

  availableDays        : LSgetItemSafe('newOfferAvailableDays', ["MON", "TUE", "WED", "THU", "FRI", "SAT"]),
  availableDaysIssue   : issueNone,

  availableHours       : LSgetItemSafe('newOfferAvailableHours', [9, 17]),
  availableHoursIssue  : issueNone,

  rendezvousDays       : LSgetItemSafe('newOfferRendezvousDays', ["MON", "TUE", "WED", "THU", "FRI", "SAT"]),
  rendezvousDaysIssue  : issueNone,

  rendezvousHours       : LSgetItemSafe('newOfferRendezvousHours', [9, 17]),
  rendezvousHoursIssue  : issueNone,

  submit                : false,
  submitIssue           : issueNone
}

function reducer(state, action) {
  var tmp = [];
  switch (action.type) {
    case 'changed_type': {
      localStorage.setItem('newOfferType', JSON.stringify(action.nextType));
      return {
        ...state,
        type: action.nextType,
        typeIssue: issueNone
      }
    }
    case 'added_availableDay': {
      tmp = state.availableDays;
      const index = tmp.indexOf(action.nextAvailableDay);
      if (index === -1) {
        tmp.push(action.nextAvailableDay);
      }
      localStorage.setItem('newOfferAvailableDays', JSON.stringify(tmp));
      return {
        ...state,
        availableDays: tmp,
        availableDaysIssue: issueNone
      }
    }
    case 'removed_availableDay': {
      tmp = state.availableDays;
      const index = tmp.indexOf(action.nextAvailableDay);
      if (index > -1) {
        tmp.splice(index, 1);
      }
      localStorage.setItem('newOfferAvailableDays', JSON.stringify(tmp));
      return {
        ...state,
        availableDays: tmp,
        availableDaysIssue: issueNone
      }
    }
    case 'changed_availableHours': {
      localStorage.setItem('newOfferAvailableHours', JSON.stringify(action.nextAvailableHours));
      return {
        ...state,
        availableHours: action.nextAvailableHours,
        availableHoursIssue: issueNone
      }
    }
    case 'added_rendezvousDay': {
      tmp = state.rendezvousDays;
      const index = tmp.indexOf(action.nextRendezvousDay);
      if (index === -1) {
        tmp.push(action.nextRendezvousDay);
      }
      localStorage.setItem('newOfferRendezvousDays', JSON.stringify(tmp));
      return {
        ...state,
        rendezvousDays: tmp,
        rendezvousDaysIssue: issueNone
      }
    }
    case 'removed_rendezvousDay': {
      tmp = state.rendezvousDays;
      const index = tmp.indexOf(action.nextRendezvousDay);
      if (index > -1) {
        tmp.splice(index, 1);
      }
      localStorage.setItem('newOfferRendezvousDays', JSON.stringify(tmp));
      return {
        ...state,
        rendezvousDays: tmp,
        rendezvousDaysIssue: issueNone
      }
    }
    case 'changed_rendezvousHours': {
      localStorage.setItem('newOfferRendezvousHours', JSON.stringify(action.nextRendezvousHours));
      return {
        ...state,
        rendezvousHours: action.nextRendezvousHours,
        rendezvousHoursIssue: issueNone
      }
    }
    case 'changed_submit': {
      return {
        ...state,
        submit: action.nextSubmit,
        submitIssue: issueNone
      }
    }
    default: {}
  }
  throw Error('Unknown action: ' + action.type);
}

export default function NewOffer({uid}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleFullTime = () => {
    dispatch({
      type: 'changed_type',
      nextType: "FullTime"
    })
  };
  const handlePartTime = () => {
    dispatch({
      type: 'changed_type',
      nextType: "PartTime"
    })
  };

  const handleAvailableHours = (value) => {
    dispatch({
      type: 'changed_availableHours',
      nextAvailableHours: value
    })
  };

  const handleAvailableMonday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "MON"
    })
  };

  const handleAvailableTuesday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "TUE"
    })
  };

  const handleAvailableWednesday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "WED"
    })
  };

  const handleAvailableThursday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "THU"
    })
  };

  const handleAvailableFriday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "FRI"
    })
  };

  const handleAvailableSaturday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "SAT"
    })
  };

  const handleAvailableSunday = (event) => {
    var dispatchType = "removed_availableDay";
    if (event.target.checked) {
      dispatchType = "added_availableDay"
    }
    dispatch({
      type: dispatchType,
      nextAvailableDay: "SUN"
    })
  };

  const handleRendezvousHours = (value) => {
    dispatch({
      type: 'changed_rendezvousHours',
      nextRendezvousHours: value
    })
  };

  const handleRendezvousMonday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "MON"
    })
  };

  const handleRendezvousTuesday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "TUE"
    })
  };

  const handleRendezvousWednesday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "WED"
    })
  };

  const handleRendezvousThursday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "THU"
    })
  };

  const handleRendezvousFriday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "FRI"
    })
  };

  const handleRendezvousSaturday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "SAT"
    })
  };

  const handleRendezvousSunday = (event) => {
    var dispatchType = "removed_rendezvousDay";
    if (event.target.checked) {
      dispatchType = "added_rendezvousDay"
    }
    dispatch({
      type: dispatchType,
      nextRendezvousDay: "SUN"
    })
  };

  const handleSubmit = () => {
    dispatch({
      type: "changed_submit",
      nextSubmit: true,
      uidNanny: uid
    })
  };

  React.useEffect(() =>
  {
    console.log("check")
    if (state.submit === true) {
      Database.setOffer({
        id: -1,
        uidNanny: uid,
        published: "?",
        type: state.type,
        availableDays: state.availableDays,
        availableHours: state.availableHours,
        rendezvousDays: state.rendezvousDays,
        rendezvousHours: state.rendezvousHours,
        requestID: 0
      })
    }
  }, [state, uid]);

  if (state.submit === true) {
    console.log(Database.get().offers)
    return (
      <Navigate to="/nanny" />
    );
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > :not(style)': { width: '45ch' },
        gap: 2
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <h1>Εργασία</h1>
      </Box>
      <Grid2
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sx: 1, mx: 1 }}
        sx = {{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid2 item size = {3}
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
          Απασχόληση:
        </Grid2>
        <Grid2 item size = {8} />
        <Grid2
          item
          size = {3} 
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
        </Grid2>
        <Grid2 item size = {8}>
          <FormControl
            error={state.typeIssue.error}
            component="fieldset"
            variant="standard"
            required
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.type === "FullTime" ? true : false}
                  onChange={handleFullTime}
                />
              }
              label="Πλήρης"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.type === "PartTime" ? true : false}
                  onChange={handlePartTime}
                />
              }
              label="Μερική"
            />
            <FormHelperText>
              {state.typeIssue.help}
            </FormHelperText>
          </FormControl>
        </Grid2>

        <Grid2
          item
          size = {3} 
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
          Ώρες:
        </Grid2>
        <Grid2 item size = {8} >
          <TimeRangeSlider value={state.availableHours} setValue={handleAvailableHours} fulltime = {state.type === "FullTime"}/>
        </Grid2>
        <Grid2
          item
          size = {3} 
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
          Ημέρες:
        </Grid2>
        <Grid2 item size = {8} />
        <Grid2
          item
          size = {3} 
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
        </Grid2>
        <Grid2 item size = {8} >
          <FormControl
            error={state.availableDays.error}
            component="fieldset"
            variant="standard"
            required
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("MON") !== -1 ? true : false}
                  onChange={handleAvailableMonday}
                />
              }
              label="Δευτέρα"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("TUE") !== -1 ? true : false}
                  onChange={handleAvailableTuesday}
                />
              }
              label="Τρίτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("WED") !== -1 ? true : false}
                  onChange={handleAvailableWednesday}
                />
              }
              label="Τετάρτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("THU") !== -1 ? true : false}
                  onChange={handleAvailableThursday}
                />
              }
              label="Πέμπτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("FRI") !== -1 ? true : false}
                  onChange={handleAvailableFriday}
                />
              }
              label="Παρασκευή"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("SAT") !== -1 ? true : false}
                  onChange={handleAvailableSaturday}
                />
              }
              label="Σάββατο"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.availableDays.indexOf("SUN") !== -1 ? true : false}
                  onChange={handleAvailableSunday}
                />
              }
              label="Κυριακή"
            />
            <FormHelperText>
              {state.typeIssue.help}
            </FormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>

      <Divider orientation="horizontal" />
    
      <Box> <h1>Ραντεβού</h1> </Box>
      <Grid2
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sx: 1, mx: 1 }}
        sx = {{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid2 item size = {3}
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
          Ώρες:
        </Grid2>
        <Grid2 item size = {8}>
          <TimeRangeSlider value={state.rendezvousHours} setValue={handleRendezvousHours} fulltime={true}/>
        </Grid2>
        <Grid2 item size = {3}
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
          Ημέρες:
        </Grid2>
        <Grid2 item size = {8}/>
        <Grid2 item size = {3}
          sx = {{
            display: 'flex',
            justifyContent: "right"
          }}
        >
        </Grid2>
        <Grid2 item size = {8}>
          <FormControl
            error={state.rendezvousDays.error}
            component="fieldset"
            variant="standard"
            required
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("MON") !== -1 ? true : false}
                  onChange={handleRendezvousMonday}
                />
              }
              label="Δευτέρα"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("TUE") !== -1 ? true : false}
                  onChange={handleRendezvousTuesday}
                />
              }
              label="Τρίτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("WED") !== -1 ? true : false}
                  onChange={handleRendezvousWednesday}
                />
              }
              label="Τετάρτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("THU") !== -1 ? true : false}
                  onChange={handleRendezvousThursday}
                />
              }
              label="Πέμπτη"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("FRI") !== -1 ? true : false}
                  onChange={handleRendezvousFriday}
                />
              }
              label="Παρασκευή"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("SAT") !== -1 ? true : false}
                  onChange={handleRendezvousSaturday}
                />
              }
              label="Σάββατο"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rendezvousDays.indexOf("SUN") !== -1 ? true : false}
                  onChange={handleRendezvousSunday}
                />
              }
              label="Κυριακή"
            />
            <FormHelperText>
              {state.typeIssue.help}
            </FormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>

      <Divider orientation="horizontal" />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ m: 1 }}
      >
        ΥΠΟΒΟΛΗ
      </Button>
    </Box>
  );
}