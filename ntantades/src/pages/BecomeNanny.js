import * as React from 'react';
import { Box, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function BecomeNanny({setRedirect}) {

  React.useEffect(() => {
    setRedirect(["/nanny", "/"]);
  }, [setRedirect]);


  return (
      <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Box>
        <h1>Γίνε Νταντά σε 3 βήματα:</h1>
      </Box>
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
    </Container>
    );
  }