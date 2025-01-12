import { Box, Button, Container } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

import ReviewBox from "../components/ReviewBox";
import getUser from "../components/getUser";

import Database from "../data.json";

function back_button(url_uid, uid) {
  if (url_uid === uid) {
    if (getUser(uid).role === "Nanny") {
      return (
        <Box sx={{ p: 1 }}>
          <Button
            component={Link}
            to={"/nanny"}
            sx = {{ bgcolor: '#F0F0F0' }}
          >
            ΠΡΟΦΙΛ
          </Button>
        </Box>
      );
    }
    if (getUser(uid).role === "Family") {
      return (
        <Box sx={{ p: 1 }}>
          <Button
            component={Link}
            to={"/family"}
            sx = {{ bgcolor: '#F0F0F0' }}
          >
            ΠΡΟΦΙΛ
          </Button>
        </Box>
      );
    }

  }
  return (
    <Box sx={{ p: 1 }}>
      <Button
        component={Link}
        to={"/users/" + url_uid}
        sx = {{ bgcolor: '#F0F0F0' }}
      >
        ΠΡΟΦΙΛ
      </Button>
    </Box>
  );
}

function review_list (reviews) {
  if (reviews.length === 0) {
    return (
      <Box
        sx = {{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        Δεν υπάρχουν αξιολογήσεις
      </Box>
    )
  }
  return (
    reviews.map((review) => (
      <ReviewBox key={review.id} id={review.id}/>
    ))
  );
}

export default function Reviews({uid}) {
  var { url_uid } = useParams();
  url_uid = 1*url_uid;

  var offers = Database.offers.filter(item => item.uidNanny === url_uid);
  const requestIDs = [];
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].requestID !== 0)
      requestIDs.push(offers[i].requestID)
  }

  var agreements = Database.agreements.filter(item => requestIDs.includes(item.requestID));
  var agreementIDs = [];
  for (let i = 0; i < agreements.length; i++) {
    if (agreements[i].id !== 0)
      agreementIDs.push(agreements[i].id)
  }

  var reviews = Database.reviews.filter(item => agreementIDs.includes(item.agreementID));

  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column'
      }}
    >
      {back_button(url_uid, uid)}
      {review_list(reviews)}
    </Container>
  );
}