import * as React from 'react';
import { Container } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import ProfileBox from '../components/ProfileBox';
import OfferBox from "../components/OfferBox";

import * as Database from "../components/Database"

export default function Users({uid, redirect, setRedirect, lookingFor_state, lookingFor_dispatch}) {
  const { url_uid } = useParams();

  var offers = Database.getOffers({uidNanny:url_uid*1, requestID:0});
  if (offers === null)
    offers = []

  const location = useLocation();

  React.useEffect(() => {
    setRedirect([location.pathname, "/"]);
  }, [setRedirect, location.pathname]);

  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <ProfileBox uid={1*url_uid} />
      {
        offers.map((offer) => (
          <OfferBox key={offer.id} id={offer.id} uid={uid} lookingFor_state={lookingFor_state} lookingFor_dispatch={lookingFor_dispatch}/>
        ))
      }
    </Container>
  );
}