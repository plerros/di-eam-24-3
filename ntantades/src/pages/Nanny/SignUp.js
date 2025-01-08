import * as React from 'react';
import Box from '@mui/material/Box';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import InputSelect from '../../components/InputSelect.js'
import { Button } from '@mui/material';

import municipalities from '../../municipalities.json'

const issueNone = {error:false, help:""};
const issueRequired = {error:true, help:"Υποχρεωτικό"};

const initialState = {
  progressPage      : 1,

  email             : localStorage.getItem('signupEmail'),
  emailIssue        : issueNone,

  password          : "",
  passwordIssue     : issueNone,

  firstName         : localStorage.getItem('signupfirstName'),
  firstNameIssue    : issueNone,

  lastName         : localStorage.getItem('signuplastName'),
  lastNameIssue    : issueNone,

  age               : localStorage.getItem('signupAge'),
  ageIssue          : issueNone,

  gender            : localStorage.getItem('signupGender'),
  genderIssue       : issueNone,

  phone             : localStorage.getItem('signupPhone'),
  phoneIssue        : issueNone,

  municipality      : localStorage.getItem('signupMunicipality'),
  municipalityIssue : issueNone,

  homeAddress       : localStorage.getItem('signupHomeAddress'),
  homeAddressIssue  : issueNone,

  postalCode        : localStorage.getItem('signupPostalCode'),
  postalCodeIssue   : issueNone
}


function reducer(state, action) {
  const isNumeric = (str) => /^[0-9]+$/gi.test(str);
  switch (action.type) {
    case 'changed_email': {
      localStorage.setItem('signupEmail', action.nextEmail);
      return {
        ...state,
        email: action.nextEmail
      }
    }
    case 'changed_password': {
      return {
        ...state,
        password: action.nextPassword
      }
    }
    case 'changed_firstName': {
      return {
        ...state,
        firstName: action.nextFirstName
      }
    }
    case 'changed_lastName': {
      return {
        ...state,
        lastName: action.nextLastName
      }
    }
    case 'changed_age': {
      if ((isNumeric(action.nextAge) && action.nextAge < 100) || (action.nextAge === "")) {
        localStorage.setItem('signupAge', action.nextAge);
        return {
          ...state,
          age: action.nextAge
        }
      }
      return {
        ...state
      }
    }
    case 'changed_gender': {
      return {
        ...state,
        gender: action.nextGender
      }
    }
    case 'changed_phone': {
      return {
        ...state,
        phone: action.nextPhone
      }
    }
    case 'changed_municipality': {
      return {
        ...state,
        municipality: action.nextMunicipality
      }
    }
    case 'changed_homeAddress': {
      return {
        ...state,
        homeAddress: action.nextHomeAddress
      }
    }
    case 'changed_postalCode': {
      return {
        ...state,
        postalCode: action.nextPostalCode
      }
    }
    case 'incremented_progressPage': {
      switch (state.progressPage) {
        case 1: {
          if (state.email === "" || state.password === "") {
            return {
              ...state,
              emailIssue: (state.email === "") ? issueRequired : issueNone,
              passwordIssue: (state.password === "") ? issueRequired : issueNone
            }
          }
          break;
        }
        case 2: {
          if (
            (state.firstName === "")
            || (state.lastName === "")
            || (state.age === "")
            || (state.gender === "")
            || (state.phone === "")
            || (state.municipality === "")
            || (state.homeAddress === "")
            || (state.postalCode === "")
          ) {
            return {
              ...state,
              firstNameIssue: (state.name === "") ? issueRequired : issueNone,
              lastNameIssue: (state.name === "") ? issueRequired : issueNone,
              ageIssue: (state.age === "") ? issueRequired : issueNone,
              genderIssue: (state.gender === "") ? issueRequired : issueNone,
              phoneIssue: (state.phone === "") ? issueRequired : issueNone,
              municipalityIssue: (state.municipality === "") ? issueRequired : issueNone,
              homeAddressIssue: (state.homeAddress === "") ? issueRequired : issueNone,
              postalCodeIssue: (state.postalCode === "") ? issueRequired : issueNone
            }
          }
          break;
        }
        default: {}
      }
      return {
        ...state,
        progressPage: state.progressPage+1
      };
    }
    default: {}
  }
  throw Error('Unknown action: ' + action.type);
}

function formInputs(state, dispatch) {

  const handleEmail = (value) => {
    dispatch({
      type: 'changed_email',
      nextEmail: value
    })
  }

  const handlePassword = (value) => {
    dispatch({
      type: 'changed_password',
      nextPassword: value
    })
  }

  const handleFirstName = (value) => {
    dispatch({
      type: 'changed_firstName',
      nextFirstName: value
    })
  }
  const handleLastName = (value) => {
    dispatch({
      type: 'changed_lastName',
      nextLastName: value
    })
  }

  const handleAge = (value) => {
    dispatch({
      type: 'changed_age',
      nextAge: value
    })
  };

  const handleGender = (value) => {
    dispatch({
      type: 'changed_gender',
      nextGender: value
    })
  }

  const handlePhone = (value) => {
    dispatch({
      type: 'changed_phone',
      nextPhone: value
    })
  };

  const handleMunicipality = (value) => {
    dispatch({
      type: 'changed_municipality',
      nextMunicipality: value
    })
  }

  const handleHomeAddress = (value) => {
    dispatch({
      type: 'changed_homeAddress',
      nextHomeAddress: value
    })
  }

  const handlePostalCode = (value) => {
    dispatch({
      type: 'changed_postalCode',
      nextPostalCode: value
    })
  };

  if (state.progressPage === 1) {
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
        <InputText
          label={"e-mail"}
          required={true}
          value={state.email}
          setValue={handleEmail}
          issue={state.emailIssue}
        />
        <InputPassword
          value={state.password}
          setValue={handlePassword}
          issue={state.passwordIssue}
        />
      </Box>
    );
  }
  else if (state.progressPage === 2) {
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
        <InputText
          label={"Όνομα"}
          required={true}
          value={state.firstName}
          setValue={handleFirstName}
          issue={state.firstNameIssue}
        />
        <InputText
          label={"Επίθετο"}
          required={true}
          value={state.lastName}
          setValue={handleLastName}
          issue={state.lastNameIssue}
        />
        <InputText
          label={"Ηλικία"}
          required={true}
          value={state.age}
          setValue={handleAge}
          issue={state.ageIssue}
        />
        <InputSelect
          label={"Φύλο"}
          required={true}
          value={state.gender}
          setValue={handleGender}
          issue={state.genderIssue}
          options={["Άνδρας", "Γυναίκα", "Άλλο"]}
        />
        <InputText
          label={"Κινητό"}
          required={true}
          value={state.phone}
          setValue={handlePhone}
          issue={state.phoneIssue}
        />
        <InputSelect
          label={"Δήμος"}
          required={true}
          value={state.municipality}
          setValue={handleMunicipality}
          issue={state.municipalityIssue}
          options={municipalities}
        />
        <InputText
          label={"Διεύθυνση"}
          required={true}
          value={state.homeAddress}
          setValue={handleHomeAddress}
          issue={state.homeAddressIssue}
        />
        <InputText
          label={"Ταχυδρομικός Κώδικας"}
          required={true}
          value={state.postalCode}
          setValue={handlePostalCode}
          issue={state.postalCodeIssue}
        />
      </Box>
    );
  }
}

export default function SignUp() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const iterateProgressPage = () => {
    dispatch({ type: 'incremented_progressPage' })
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
      {formInputs(state, dispatch)}
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
          onClick={() => iterateProgressPage()}
        >
          ΕΠΌΜΕΝΟ
        </Button>
      </Box>
    </Box>
  );
}