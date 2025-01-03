import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';


const errorNone = {error:false, help:""};
const errorEmptyField = {error:true, help:"Yποχρεωτικό"};

export default function InputPassword({value, setValue, issue}) {
  const [interacted, setInteracted] = React.useState(false);
  const [localIssue, setLocalIssue] = React.useState(errorNone);
  const [showPassword, setShowPassword] = React.useState(false);

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
    if (interacted && value === "")
      setLocalIssue(errorEmptyField)
    else
      setLocalIssue(issue)
  }, [interacted, setLocalIssue, value, issue]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      required
      sx={{ m: 1, width: '25ch' }}
      variant="outlined"
      error={localIssue.error}
      helperText={localIssue.help}
    >
      <InputLabel htmlFor="outlined-adornment-password">κωδικός</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="my-helper-text">{localIssue.help}</FormHelperText>
    </FormControl>
  );
}