import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import GrayBox from "../components/GrayBox";
import NannyBox from "../components/NannyBox";

import * as Database from "../components/Database"
import municipalities from '../municipalities.json'
import backgroundImg from '../image/loving-mother-holding-baby-6725451.jpg'

export default function Home({municipality, setMunicipality}) {
  const nannies = Database.getUsers({role:"Nanny"})

  if (municipality !== null) {
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
      {
        //<img src={require('../image/loving-mother-holding-baby-6725451.jpg')} alt=""/>
      }
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
              display:"flex",
            }}
          >
            <Box flexGrow="1">
              <GrayBox title={"Αναζήτηση"}>
                <Box sx= {{ display:'flex', flexDirection: 'column', gap: 2 }}>
                  <Autocomplete
                    required={true}
                    value={municipality}
                    setValue={setMunicipality}
                    onChange={(event, newValue) => {
                      setMunicipality(newValue)
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
              {nannies.map((user) => (
                <NannyBox uid={user.userID} key={user.userID}/>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}