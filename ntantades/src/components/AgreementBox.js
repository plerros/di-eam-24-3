import * as React from "react"
import { Navigate } from 'react-router-dom'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

import GrayBox from "./GrayBox";

import * as Database from "./Database"
import RequestBox from "./RequestBox";


export default function AgreementBox({id, uid, title, subtitle}) {
  const [accept, setAccept] = React.useState(false);
  const handleAccept = () => {
    setAccept(true);
  }

  const agreements_list = (id === null) ? [] : Database.getAgreements({id:id});
  const agreement       = (agreements_list.length === 0) ? null : agreements_list[0];
  const requests_list   = (agreement === null) ? [] : Database.getRequests({id:agreement.requestID});
  const request         = (requests_list.length === 0) ? null : requests_list[0];
  const family          = (request === null) ? null : Database.getUser(request.uidFamily);
  const offers_list     = (request === null) ? null : Database.getOffers({id:request.offerID});
  const offer           = (offers_list.length === 0) ? null : offers_list[0];
  const nanny           = (offer === null) ? null : Database.getUser(offer.uidNanny);

  
  React.useEffect(() => {
    if (accept && offer !== null && request != null)
      Database.setAgreement({id:id, accept:true})
  }, [accept, offer, request, id]);

  if (requests_list.length === 0)
    return ([]);
  if (family.userID !== uid && nanny.userID !== uid)
    return ([]);

  const user = Database.getUser(uid);


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
    <Box>
      <RequestBox id={request.id} uid={uid} title={(title === undefined) ? "Συμφωνητικό" : title} subtitle={subtitle} actions={nannyActions}/>
      <GrayBox>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right" sx = {{ width: 1/4 }}>
                  Απο:
                </TableCell>
                <TableCell align="left">
                  {(new Date(agreement.begin)).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" sx = {{ width: 1/4 }}>
                  Εως:
                </TableCell>
                <TableCell align="left">
                  {(new Date(agreement.end)).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" sx = {{ width: 1/4 }}>
                  Συμφωνητικό:
                </TableCell>
                <TableCell align="left">
                  {(agreement.accepted) ? "Η νταντά αποδέχθηκε" : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GrayBox>
    </Box>
    
  );
}