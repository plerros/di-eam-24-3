import * as React from "react"

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Link } from 'react-router-dom'

import * as Database from "./Database";
import GrayBox from "./GrayBox";

const day2name = {
  "MON": "Δευτέρα",
  "TUE": "Τρίτη",
  "WED": "Τετάρτη",
  "THU": "Πέμπτη",
  "FRI": "Παρασκευή",
  "SAT": "Σάββατο",
  "SUN": "Κυριακή"
};

function actions (offer, uid) {
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
        sx={{ m: 1 }}
      >
        ΡΑΝΤΕΒΟΥ
      </Button>
      <Button
        variant="outlined"
        sx={{ m: 1 }}
      >
        ΣΥΝΕΡΓΑΣΙΑ
      </Button>
    </Box>
  );
}

export default function OfferBox({id, uid}) {
  const offer = Database.getOffers({id:id})[0];
  const published = new Date(Date.parse(offer.published));

  return (
    <GrayBox
      title = "Αγγελία"
      actions={actions(offer, uid)}
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