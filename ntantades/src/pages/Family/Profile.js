import { Container } from "@mui/material";
import ProfileBox from "../../components/ProfileBox"

export default function Profile({uid}) {
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <ProfileBox uid={uid}/>
    </Container>
  );
}