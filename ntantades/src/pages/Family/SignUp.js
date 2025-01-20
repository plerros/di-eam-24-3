import * as React from 'react';
import Box from '@mui/material/Box';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import InputSelect from '../../components/InputSelect.js';
import InputFile from '../../components/InputFile.js'
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Step, StepLabel, Stepper } from '@mui/material';

import municipalities from '../../municipalities.json'
import { Navigate } from 'react-router-dom';

import * as Database from "../../components/Database.js"
import InputParagraph from '../../components/InputParagraph.js';
import InputAutocomplete from '../../components/InputAutocomplete.js';

const issueNone = {error:false, help:""};
const issueRequired = {error:true, help:"Υποχρεωτικό"};

function LSgetItemSafe(item)
{
  const result = localStorage.getItem(item);
  return (result === null) ? "" : result;
}

const initialState = {
  progressPage      : 1,

  email             : LSgetItemSafe('signupEmail'),
  emailIssue        : issueNone,

  password          : "",
  passwordIssue     : issueNone,

  firstName         : LSgetItemSafe('signupFirstName'),
  firstNameIssue    : issueNone,

  lastName          : LSgetItemSafe('signupLastName'),
  lastNameIssue     : issueNone,

  age               : LSgetItemSafe('signupAge'),
  ageIssue          : issueNone,

  gender            : LSgetItemSafe('signupGender'),
  genderIssue       : issueNone,

  phone             : LSgetItemSafe('signupPhone'),
  phoneIssue        : issueNone,

  municipality      : LSgetItemSafe('signupMunicipality'),
  municipalityIssue : issueNone,

  homeAddress       : LSgetItemSafe('signupHomeAddress'),
  homeAddressIssue  : issueNone,

  postalCode        : LSgetItemSafe('signupPostalCode'),
  postalCodeIssue   : issueNone,

  childBirthCertificate      : "",
  childBirthCertificateIssue : issueNone,

  description          : LSgetItemSafe('signupDescription'),
  descriptionIssue     : issueNone,

  agreement            : false,
  agreementIssue       : issueNone
}

function reducer(state, action) {
  const isNumeric = (str) => /^[0-9]+$/gi.test(str);
  switch (action.type) {
    case 'changed_email': {
      localStorage.setItem('signupEmail', action.nextEmail);
      return {
        ...state,
        email: action.nextEmail,
        passwordIssue: issueNone
      }
    }
    case 'changed_password': {
      return {
        ...state,
        password: action.nextPassword,
        passwordIssue: issueNone
      }
    }
    case 'changed_firstName': {
      localStorage.setItem('signupFirstName', action.nextFirstName);
      return {
        ...state,
        firstName: action.nextFirstName,
        firstNameIssue: issueNone
      }
    }
    case 'changed_lastName': {
      localStorage.setItem('signupLastName', action.nextLastName);
      return {
        ...state,
        lastName: action.nextLastName,
        lastNameIssue: issueNone
      }
    }
    case 'changed_age': {
      if ((isNumeric(action.nextAge) && action.nextAge < 100) || (action.nextAge === "")) {
        localStorage.setItem('signupAge', action.nextAge);
        return {
          ...state,
          age: action.nextAge,
          ageIssue: issueNone
        }
      }
      return {
        ...state
      }
    }
    case 'changed_gender': {
      localStorage.setItem('signupGender', action.nextGender);
      return {
        ...state,
        gender: action.nextGender,
        genderIssue: issueNone
      }
    }
    case 'changed_phone': {
      localStorage.setItem('signupPhone', action.nextPhone);
      return {
        ...state,
        phone: action.nextPhone,
        phoneIssue: issueNone
      }
    }
    case 'changed_municipality': {
      const value = (action.nextMunicipality === null) ? "" : action.nextMunicipality;
      localStorage.setItem('signupMunicipality', value);
      return {
        ...state,
        municipality: value,
        municipalityIssue: issueNone
      }
    }
    case 'changed_homeAddress': {
      localStorage.setItem('signupHomeAddress', action.nextHomeAddress);
      return {
        ...state,
        homeAddress: action.nextHomeAddress,
        homeAddressIssue: issueNone
      }
    }
    case 'changed_postalCode': {
      localStorage.setItem('signupPostalCode', action.nextPostalCode);
      return {
        ...state,
        postalCode: action.nextPostalCode,
        postalCodeIssue: issueNone
      }
    }
    case 'changed_childBirthCertificate': {
      localStorage.setItem('childBirthCertificate', action.nextChildBirthCertificate);
      return {
        ...state,
        childBirthCertificate: action.nextChildBirthCertificate,
        childBirthCertificateIssue: issueNone
      }
    }

    case 'changed_description': {
      localStorage.setItem('signupMunicipality', action.nextDescription);
      return {
        ...state,
        description: action.nextDescription,
        descriptionIssue: issueNone
      }
    }

    case 'changed_agreement': {
      localStorage.setItem('childBirthCertificate', action.nextAgreement);
      return {
        ...state,
        agreement: action.nextAgreement,
        agreementIssue: issueNone
      }
    }
    case 'incremented_progressPage': {
      switch (state.progressPage) {
        case 1: {
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
              firstNameIssue: (state.firstName === "") ? issueRequired : issueNone,
              lastNameIssue: (state.lastName === "") ? issueRequired : issueNone,
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
        case 2: {
          if (state.childBirthCertificate === "") {
            return {
              ...state,
              childBirthCertificateIssue: (state.childBirthCertificate === "") ? issueRequired : issueNone,
            }
          }
          break;
        }
        case 3: {
          if (
            (state.email === "")
            || (state.password === "")
            || (state.agreement === false)
          ) {
            return {
              ...state,
              emailIssue: (state.email === "") ? issueRequired : issueNone,
              passwordIssue: (state.password === "") ? issueRequired : issueNone,
              agreementIssue: (state.agreement === false) ? issueRequired : issueNone
            }
          }

          Database.setUser({
            userID:       -1,
            email:        state.email,
            password:     state.password,
            firstName:    state.firstName,
            lastName:     state.lastName,
            age:          state.age,
            phone:        state.phone,
            municipality: state.municipality,
            homeAddress:  state.homeAddress,
            postalCode:   state.postalCode,
            description:  state.description,
            role:         "Family"
          })

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

  const handleChildBirthCertificate = (value) => {
    dispatch({
      type: 'changed_childBirthCertificate',
      nextChildBirthCertificate: value
    })
  }

  const handleDescription = (value) => {
    dispatch({
      type: 'changed_description',
      nextDescription: value
    })
  }

  const handleAgreement = () => {
    dispatch({
      type: 'changed_agreement',
      nextAgreement: !(state.agreement)
    })
  }

   if (state.progressPage === 1) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '25ch'} 
        }}
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
        <InputAutocomplete
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
  else if (state.progressPage === 2) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '25ch'} 
        }}
      >
        <InputFile
          label={"Πιστοποιητικό γέννησης βρέφους"}
          required={true}
          value={state.childBirthCertificate}
          setValue={handleChildBirthCertificate}
          issue={state.childBirthCertificateIssue}
        />
      </Box>
    );
  }
  else if (state.progressPage === 3) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '25ch'} 
        }}
      >
        <InputParagraph
          label={"Περιγραφή προφίλ"}
          required={false}
          value={state.description}
          setValue={handleDescription}
          issue={state.descriptionIssue}
        />
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
        <FormControl
          error={state.agreementIssue.error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={state.agreement}
                onChange={handleAgreement}
                required
              />
            }
            label="Αποδέχομαι τους όρους χρήσης"
          />
          <FormHelperText>
            {state.agreementIssue.help}
          </FormHelperText>
        </FormControl>
      </Box>
    );
  }
}

export default function SignUp({uid, setUID}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const iterateProgressPage = () => {
    dispatch({ type: 'incremented_progressPage' })
  }

  React.useEffect(() => {
    if (state.progressPage < 4)
      return;

    if (uid === 0)
      setUID(Database.get().users.length - 1);
    // Technically wrong, but works with single user.

    

  }, [uid, setUID, state.progressPage]);

  if (uid !== 0) {
    return (
      <Navigate to="/redirect"/>
    );
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
      <Stepper activeStep={state.progressPage - 1}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Step key={1}>
            <StepLabel>{"Προσωπικά στοιχεία"}</StepLabel>
        </Step>
        <Step key={2}>
            <StepLabel>{"Στοιχεία βρέφους"}</StepLabel>
        </Step>
        <Step key={3}>
            <StepLabel>{"Ολοκλήρωση λογαριασμού"}</StepLabel>
        </Step>
      </Stepper>
      {formInputs(state, dispatch)}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
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