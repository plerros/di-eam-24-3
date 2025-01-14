import * as React from 'react';
import { Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import InputText from '../components/InputText';
import InputPassword from '../components/InputPassword';

import * as Database from "../components/Database"

export default function Login({uid, handleUID}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submit, setSubmit] = React.useState(false)
  const [issue, setIssue] = React.useState({error: false, help:""});
  
  const handleSubmit = () => {
    setSubmit(true);
  };

  // If the input changes, reset the error.
  React.useEffect(() => {
    setIssue({error: false, help:""});
  }, [email, password]);

  React.useEffect(() => {
    if (submit) {
      // Find the user based on credentials
      var user = Database.getUsers({email:email, password:password})[0];
      if (user === null || typeof user === 'undefined')
        user = Database.getUser(0);
    
      if (user.userID !== 0) {
        handleUID(user.userID)
      }
      else {
        // if the UID is the special user 0, throw an appropriate error
        if (email === "" && password === "")
          setIssue({error:true, help:"Υποχρεωτικό"})
        else
          setIssue({error:true, help:"λάθος e-mail / κωδικός"})
      }
      setSubmit(false)
    }
  }, [email, password, submit, handleUID]);
  
  /* Already logged in */
  if (uid !== 0) {
    const user = Database.getUser(uid);
    if (user.role === "Nanny") {
      return (
        <Navigate to="/nanny" />
      );
    }
    if (user.role === "Family") {
      return (
        <Navigate to="/family" />
      );
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > :not(style)': { m: 1, width: '25ch'} 
      }}
      noValidate
      autoComplete="off"
    >
      <item>
        <h1>Είσοδος</h1>
      </item>
      <InputText
        label={"e-mail"}
        required={true}
        value={email}
        setValue={setEmail}
        issue={issue}
      />
      <InputPassword
        value={password}
        setValue={setPassword}
        issue={issue}/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          ΕΙΣΟΔΟΣ
        </Button>
      </Box>
    </Box>
  );
}