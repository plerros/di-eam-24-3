import { Link } from 'react-router-dom'

import GrayBox from "../components/GrayBox";

import * as Database from "../components/Database"
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

export default function RendezvousBox({id, uid}) {
  console.log()
  const rendezvous_list = Database.getRendezvous({id:id, scheduledAfter:true});
  if (rendezvous_list.length === 0)
    return ([]);

  const rendezvous = rendezvous_list[0];
  const family = Database.getUser(rendezvous.uidFamily);
  const offer = Database.getOffers({id:rendezvous.offerID})[0];
  const nanny = Database.getUser(offer.uidNanny);

  if (family.userID !== uid && nanny.userID !== uid)
    return ([]);

  const familyRow = (Database.getUser(uid).role === "Family") ?
  (
    []
  ) : (
    <TableRow>
      <TableCell align="right" sx = {{ width: 1/4 }}>
        Με οικογένεια:
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

  const nannyRow = (Database.getUser(uid).role === "Nanny") ?
  (
    []
  ) : (
    <TableRow>
      <TableCell align="right" sx = {{ width: 1/4 }}>
        Με νταντά:
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
  
  return (
    <GrayBox title="Προγραμματισμένο Ραντεβου">
      <TableContainer>
        <Table>
          <TableBody>
            {familyRow}
            {nannyRow}
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Στις:
              </TableCell>
              <TableCell align="left">
                {(new Date(rendezvous.scheduled)).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </GrayBox>
  );
}