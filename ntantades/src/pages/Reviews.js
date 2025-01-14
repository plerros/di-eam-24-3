import { Box, Button, Container } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

import ReviewBox from "../components/ReviewBox";

import * as Database from "../components/Database";

function back_button(url_uid, uid) {
  if (url_uid === uid) {
    if (Database.getUser(uid).role === "Nanny") {
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
    if (Database.getUser(uid).role === "Family") {
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

  const offers = Database.getOffers({uidNanny:url_uid})
  const requestIDs = offers.map((item) => (item.requestID));
  const agreements = Database.getAgreements({listRequestIDs: requestIDs});
  const agreementIDs = agreements.map((item) => (item.id));
  const reviews = Database.getReviews({listAgreementIDs:agreementIDs});
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