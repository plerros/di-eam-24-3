import * as React from "react"
import dayjs from "dayjs"
import { Box, Button, Dialog, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Link } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import GrayBox from "./GrayBox";
import RendezvousBox from "./RendezvousBox";
import LookingForControls from "./LookingForControls"

import * as Database from "./Database";
import RequestBox from "./RequestBox";

const index2day = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN"
];

function RendezvousDialog({ onClose, open, offer, uidFamily }) {
  const [value, setValue] = React.useState(null);
  const [submit, setSubmit] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    setSubmit(true);
  }

  React.useEffect(() => {
    if (submit) {
      Database.setRendezvous({
        id: -1,
        uidFamily: uidFamily,
        offerID: offer.id,
        scheduled: value.toISOString()
      })
    }
  }, [submit, uidFamily, offer.id, value]);
  const rendezvous_list = Database.getRendezvous({uidFamily:uidFamily, scheduledAfter:true, offerID:offer.id})
  const rendezvous = (rendezvous_list.length > 0) ? rendezvous_list[0] : null;

  if (rendezvous !== null) {
    return (
      <Dialog onClose={handleClose} open={open}>
        <RendezvousBox id={rendezvous.id} uid={uidFamily}/>
      </Dialog>
    )
  }
  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle> Προγραμματισμός Ραντεβού </DialogTitle>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          
          <Stack spacing={2} sx={{ minWidth: 305 }}>
            <DateTimePicker
              value={value}
              onChange={setValue}
              referenceDate={dayjs()}
              shouldDisableTime={(value, view) => 
                view === 'hours' && (value.hour() < offer.availableHours[0] || value.hour() > offer.availableHours[1])
              }
              skipDisabled={true}
              ampm={false}
              disablePast={true}
              minutesStep={30}
              shouldDisableDate={(day) =>
                (!offer.availableDays.includes(index2day[day.day()]))
              }
            />
          </Stack>
        </LocalizationProvider>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={value === null}
        >
          ΥΠΟΒΟΛΗ
        </Button>
    </Dialog>
  )
}

function RequestDialog({ onClose, open, offer, uidFamily, lookingFor_state, lookingFor_dispatch }) {
  const [submit, setSubmit] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    setSubmit(true);
  }

  React.useEffect(() => {
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
    if (submit) {
      Database.setRequest({
        id: -1,
        uidFamily: uidFamily,
        offerID: offer.id,
        agreedDays: daysArray,
        agreedHours: lookingFor_state.hours
      })
    }
  }, [submit, uidFamily, offer.id, lookingFor_state]);

  const request_list = Database.getRequests({uidFamily:uidFamily, scheduledAfter:true, offerID:offer.id})
  const request = (request_list.length > 0) ? request_list[0] : null;

  if (request !== null) {
    return (
      <Dialog onClose={handleClose} open={open}>
        {
        <RequestBox id={request.id} uid={uidFamily}/>
        }
      </Dialog>
    )
  }

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle> Αίτημα Συνεργασίας </DialogTitle>
        <LookingForControls
          lookingFor_state={lookingFor_state}
          lookingFor_dispatch={lookingFor_dispatch}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{m:1}}
        >
          ΥΠΟΒΟΛΗ
        </Button>
    </Dialog>
  )
}

const day2name = {
  "MON": "Δευτέρα",
  "TUE": "Τρίτη",
  "WED": "Τετάρτη",
  "THU": "Πέμπτη",
  "FRI": "Παρασκευή",
  "SAT": "Σάββατο",
  "SUN": "Κυριακή"
};

function Actions (offer, uid, lookingFor_state, lookingFor_dispatch) {
  const [openRendezvous, setOpenRendezvous] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);

  const handleClickOpenRendezvous = () => {
    setOpenRendezvous(true);
  };

  const handleCloseRendezvous = () => {
    setOpenRendezvous(false);
  };

  const handleClickOpenRequest = () => {
    setOpenRequest(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };

  if (uid === 0) {
    return (
      <Box>
        <Button
          variant="contained"
          component={Link}
          to={"/familysignup"}
          sx={{ m: 1 }}
        >
          ΡΑΝΤΕΒΟΥ
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to={"/familysignup"}
          sx={{ m: 1 }}
        >
          ΣΥΝΕΡΓΑΣΙΑ
        </Button>
      </Box>
    );
  }
  const user = Database.getUser(uid);
  if (user.role === "Nanny") {
    if (offer.uidNanny === uid && offer.requestID === 0) {
      return (
        <Button
          variant="contained"
          sx={{ m: 1 }}
        >
          ΕΠΕΞΕΡΓΑΣΙΑ
        </Button>
      );
    }
    return ([]);
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpenRendezvous}
        sx={{ m: 1 }}
      >
        ΡΑΝΤΕΒΟΥ
      </Button>
      <Button
        variant="outlined"
        onClick={handleClickOpenRequest}
        sx={{ m: 1 }}
      >
        ΣΥΝΕΡΓΑΣΙΑ
      </Button>
      <RendezvousDialog
        open={openRendezvous}
        onClose={handleCloseRendezvous}
        offer={offer}
        uidFamily={uid}
      />
      <RequestDialog
        open={openRequest}
        onClose={handleCloseRequest}
        offer={offer}
        uidFamily={uid}
        lookingFor_state={lookingFor_state}
        lookingFor_dispatch={lookingFor_dispatch}
      />
    </Box>
  );
}

export default function OfferBox({id, uid, additionalActions, lookingFor_state, lookingFor_dispatch}) {
  const offer = Database.getOffers({id:id})[0];
  const published = new Date(Date.parse(offer.published));

  return (
    <GrayBox
      title = "Αγγελία"
      actions={<Box>{Actions(
        offer,
        uid,
        lookingFor_state,
        lookingFor_dispatch
      )} {additionalActions}</Box>}  
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                  Ώρες Εργασίας:
              </TableCell>
              <TableCell align="left">
                {offer.availableHours[0]}
                -
                {offer.availableHours[1]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Ημέρες Εργασίας:
              </TableCell>
              <TableCell align="left" flexDirection = "row" sx={{display:"flex", gap: 1}}>
                {
                  offer.availableDays.map((day) => (
                    <Box key={day}>
                      {day2name[day]}
                    </Box>
                  ))
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Δημοσιεύτηκε:
              </TableCell>
              <TableCell align="left">
                {published.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </GrayBox>
  );
}