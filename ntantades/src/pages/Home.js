import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Autocomplete, Box, Container, TextField, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GrayBox from "../components/GrayBox";
import NannyBox from "../components/NannyBox";

import * as Database from "../components/Database"
import municipalities from '../municipalities.json'
import backgroundImg from '../image/loving-mother-holding-baby-6725451.jpg'

export default function Home({lookingFor_state, lookingFor_dispatch}) {
  const nannies = Database.getUsers({role:"Nanny"})

  const ratedNannies = nannies.map(
    (user) => 
    (
      {
        nanny:user,
        stars:Database.getStars(user.userID)
      }
    )
  )

  const sortedNannies = ratedNannies.sort(
    (a, b) => {
      return (b.stars - a.stars);
    }
  )

  const filteredNannies = sortedNannies.slice(0,8);

  if (lookingFor_state.municipality !== null) {
    return (
      <Navigate to="/search" />
    );
  }
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
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box
          sx= {{
            display:'flex', flexDirection: 'row', gap: 2
          }}
        >
          <Box
            width={1/2}
            alignItems="center"
            justifyContent="center"
            height={"70vh"}
            sx={{
              display:"flex"
            }}
          >
            <Box flexGrow="1" sx={{backgroundColor:"#000000"}}>
              <GrayBox
                title={<Box sx={{display: "flex"}}>Διακοπές / Eξοδος / Δουλειά ?</Box>}
                subtitle={"Βρές τώρα ποιός θα φροντίζει το βρέφος ή νήπιο σου όσο λείπεις"}
                actions={
                  <Tooltip
                    title={<h1>Για βρέφη και νήπια απο 2 μηνών εώς 3 ετών</h1>}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      display:"flex",
                      m:2
                    }}
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                }
              >
                <Box sx= {{ display:'flex', flexDirection: 'column', gap: 2 }}>
                  <Autocomplete
                    required={true}
                    value={lookingFor_state.municipality}
                    onChange={(event, newValue) => {
                      lookingFor_dispatch({
                        type: 'changed_municipality',
                        nextMunicipality: newValue
                      })
                    }}
                    issue={{error:false, help:""}}
                    disablePortal
                    options={municipalities}
                    renderInput={(params) => <TextField {...params} label="Δήμος" />}
                  />
                </Box>
              </GrayBox>
            </Box>
          </Box>          <Box
            width={1/2}
            alignItems="center"
            justifyContent="center"
            height={"70vh"}
            sx={{
              display:"flex",
            }}
          >
            <Box flexGrow="1" sx= {{ display:'flex', flexDirection: 'column', gap: 2 }}>
              {filteredNannies.map((ratedNanny) => (
                <NannyBox uid={ratedNanny.nanny.userID} key={ratedNanny.nanny.userID}/>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}