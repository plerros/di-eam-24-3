import GrayBox from "../components/GrayBox";

import * as Database from "../components/Database"
import dayjs from "dayjs";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import OfferBox from "../components/OfferBox";

export default function RendezvousBox({id}) {
  console.log()
  const rendezvous_list = Database.getRendezvous({id:id, scheduledAfter:true});
  if (rendezvous_list.length === 0)
    return ([]);

  const rendezvous = rendezvous_list[0];

  return (
    <GrayBox title="Προγραμματισμένο Ραντεβου">
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Από:
              </TableCell>
              <TableCell align="left">
                {Database.getUser(rendezvous.uidFamily).firstName}
                {" "}
                {Database.getUser(rendezvous.uidFamily).lastName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx = {{ width: 1/4 }}>
                Ημέρα / Ώρα:
              </TableCell>
              <TableCell align="left">
                {dayjs(rendezvous.scheduled).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </GrayBox>
  );
}