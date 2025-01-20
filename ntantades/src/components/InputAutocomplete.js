import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from '@mui/material';

const errorNone = {error:false, help:""};
const errorEmptyField = {error:true, help:"Yποχρεωτικό"};

function valueEmpty (value) {
  if (value === null)
      return true;
  
  if (value === "")
      return true;
}

export default function InputAutocomplete({label, required, value, setValue, issue, options}) {
  const [interacted, setInteracted] = React.useState(false);
  const [localIssue, setLocalIssue] = React.useState(errorNone);

  // If the user interacts with this input component, remember it.
  React.useEffect(() => {
    if (!interacted && !valueEmpty(value))
      setInteracted(true);
  }, [interacted, setInteracted, value]);

  /*
   * If the user interacted with this component and it's now empty,
   * remind them to fill in the form.
   */
  React.useEffect(() => {
    if (interacted && valueEmpty(value) && required)
      setLocalIssue(errorEmptyField)
    else
      setLocalIssue(issue)
  }, [interacted, setLocalIssue, value, issue, required]);

  return (
    <Autocomplete
      required={required}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      disablePortal
      options={options}
      renderInput={(params) =>
        <TextField {...params}
          label={label}
          error={localIssue.error}
          helperText={localIssue.help}
        />
      }
    />
  );
  return (
    <TextField
      error={localIssue.error}
      helperText={localIssue.help}
      required={required}
      id="outlined-basic"
      select
      label={label}
      variant="outlined"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}