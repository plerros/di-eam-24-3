import * as React from "react"
import { Link, Navigate } from 'react-router-dom'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

import GrayBox from "./GrayBox";

import * as Database from "./Database"

const day2name = {
  "MON": "Δευτέρα",
  "TUE": "Τρίτη",
  "WED": "Τετάρτη",
  "THU": "Πέμπτη",
  "FRI": "Παρασκευή",
  "SAT": "Σάββατο",
  "SUN": "Κυριακή"
};

export default function RequestBox({id, uid, title, subtitle}) {
  const [accept, setAccept] = React.useState(false);
  const handleAccept = () => {
    setAccept(true);
  }

  const request_list = (id === null) ? [] : Database.getRequests({id:id});
  const request = (request_list.length === 0) ? null : request_list[0];
  const family  = (request_list.length === 0) ? null : Database.getUser(request.uidFamily);
  const offer   = (request_list.length === 0) ? null : Database.getOffers({id:request.offerID})[0];
  const nanny   = (request_list.length === 0) ? null : Database.getUser(offer.uidNanny);

  React.useEffect(() => {
    if (accept && offer !== null && request != null)
      Database.setOffer({id:offer.id, requestID:request.id})
  }, [accept, offer, request]);

  if (request_list.length === 0)
    return ([]);
  if (family.userID !== uid && nanny.userID !== uid)
    return ([]);

  const user = Database.getUser(uid);

  const familyRow = (user.role === "Family") ?
  (
    []
  ) : (
    <TableRow>
      <TableCell align="right" sx = {{ width: 1/4 }}>
        Με Οικογένεια:
      </TableCell>
      <TableCell align="left"
        component={Link}
        to={"/users/"+family.userID}
      >
        {family.firstName}
        {" "}
        {family.lastName}
      </TableCell>
    </TableRow>
  )

  const nannyRow = (user.role === "Nanny") ?
  (
    []
  ) : (
    <TableRow>
      <TableCell align="right" sx = {{ width: 1/4 }}>
        Με Νταντά:
      </TableCell>
      <TableCell align="left"
        component={Link}
        to={"/users/"+nanny.userID}
      >
        {nanny.firstName}
        {" "}
        {nanny.lastName}
      </TableCell>
    </TableRow>
  )

  const nannyActions = (
    user.role === "Nanny"
    && offer.requestID === 0
  ) ? ( 
    <Box
    >
      <Button
        variant='contained'
        value={accept}
        onClick={handleAccept}
        sx={{
          m:1,
          gap:1
        }}
      >
        ΑΠΟΔΟΧΗ
        <CheckIcon/>
      </Button>
    </Box>
  ) : (
    []
  )

  if (accept) {
    return (
      <Navigate to="/nanny" />
    );
  }

  return (
    <GrayBox title={(title === undefined) ? "Συνεργασία" : title} subtitle={subtitle} actions={nannyActions}>
      <TableContainer>
        <Table>
          <TableBody>
            {familyRow}
            {nannyRow}
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Ημέρες:
              </TableCell>
              <TableCell align="left">
                {
                  request.agreedDays.map((day) => (
                    <Box key={day}>
                      {day2name[day]}
                    </Box>
                  ))
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Ώρες:
              </TableCell>
              <TableCell align="left">
                {request.agreedHours[0]}
                -
                {request.agreedHours[1]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Συνεργασία:
              </TableCell>
              <TableCell align="left">
                {(offer.requestID === 0) ? "Εκκρεμεί" : "Η νταντά αποδέχθηκε"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </GrayBox>
  );
}