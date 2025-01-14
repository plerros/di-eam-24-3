import { Box, Button } from "@mui/material";
import {Link} from 'react-router-dom'

import getUser from "./getUser";

import Database from "../data.json"

const day2name = {
  "MON": "Δευτέρα",
  "TUE": "Τρίτη",
  "WED": "Τετάρτη",
  "THU": "Πέμπτη",
  "FRI": "Παρασκευή",
  "SAT": "Σάββατο",
  "SUN": "Κυριακή"
};

function actions (offer_uid, uid) {
  if (uid === 0) {
    return (
      <Box      >
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
  const user = getUser(uid);
  if (user.role === "Nanny") {
    if (offer_uid === uid) {
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
  const offer = Database.offers.filter(item => item.id === id)[0];

  return (
    <Box sx = {{
      display: 'flex',
      bgcolor: '#F0F0F0',
      borderRadius: 1,
      flexDirection: 'column',
      p: 2,
      gap: 2
    }}>
      <Box sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box flexGrow={1}>
          <h1>Αγγελία</h1>
        </Box>
        {actions(offer.uidNanny, uid)}
      </Box>
      <Box sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box>Ώρες Εργασίας:</Box>
        <Box>
          {offer.availableHours[0]}
          -
          {offer.availableHours[1]}
        </Box>
      </Box>
      <Box sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box>Ημέρες Εργασίας:</Box>
        {
          offer.availableDays.map((day) => (
            <Box key={day}>
              {day2name[day]}
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}