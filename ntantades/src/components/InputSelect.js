import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const errorNone = {error:false, help:""};
const errorEmptyField = {error:true, help:"Yποχρεωτικό"};

export default function InputText({label, required, value, setValue, issue, options}) {
  const [interacted, setInteracted] = React.useState(false);
  const [localIssue, setLocalIssue] = React.useState(errorNone);

  // If the user interacts with this input component, remember it.
  React.useEffect(() => {
    if (!interacted && value !== "")
      setInteracted(true);
  }, [interacted, setInteracted, value]);

  /*
   * If the user interacted with this component and it's now empty,
   * remind them to fill in the form.
   */
  React.useEffect(() => {
    if (interacted && value === "" && required)
      setLocalIssue(errorEmptyField)
    else
      setLocalIssue(issue)
  }, [interacted, setLocalIssue, value, issue, required]);

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