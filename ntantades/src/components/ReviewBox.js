import { Avatar, Box, Rating } from "@mui/material";
import * as Database from "./Database";
import GrayBox from "./GrayBox";

export default function Reviews({id}) {
  const review = Database.getReviews({id:id})[0];
  const agreement = Database.getAgreements({id:review.agreementID})[0];
  const request = Database.getRequests({id:agreement.requestID})[0];
  const reviewer = Database.getUser(request.uidFamily);
  
  return (
    <GrayBox>
      <Box
        sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box>
          <Avatar alt={reviewer.firstName} src={reviewer.picture} />
        </Box>
        <Box>
          {reviewer.firstName}
          {" "}
          {reviewer.lastName}
        </Box>
      </Box>
      <Box
        sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Rating name="half-rating-read" value={review.stars} precision={0.5} readOnly />
        {review.title}
      </Box>
      <Box>
        {review.text}
      </Box>
    </GrayBox>
  );
}