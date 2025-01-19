import * as React from 'react';
import { Box, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import GrayBox from '../components/GrayBox';

import backgroundImg from '../image/loving-mother-holding-baby-6725451.jpg'

export default function BecomeNanny({setRedirect}) {

  React.useEffect(() => {
    setRedirect(["/nanny", "/"]);
  }, [setRedirect]);


  return (
    <div
      style={{
        position:"relative",
        top: 0,
        left: 0,
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "100vh"
      }}
    >
      <Container
        maxWidth="xl"
        sx = {{
          display:'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          alignItems="center"
          justifyContent="center"
          height={"70vh"}
          sx={{display:"flex"}}
        >
          <GrayBox title={"Γίνε Νταντά σε 3 βήματα:"}>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="1. Προσωπικά στοιχεία"
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="2. Επαγγελματική εμπειρία"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="3. Ολοκλήρωση λογαριασμού"
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              component={Link}
              to="/nannysignup"
            >
              ΕΓΓΡΑΦΗ
            </Button>
          </GrayBox>
        </Box>
      </Container>
    </div>
  );
}