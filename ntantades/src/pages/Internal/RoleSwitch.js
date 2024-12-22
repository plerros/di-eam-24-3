import { Button } from "@mui/material";

export default function RoleSwitch({handleRoleNanny, handleRoleFamily, handleRoleNone}) {
  return (
    <div>
      <h1>This is an internal Role Switch Page</h1>
      <Button onClick={handleRoleNanny}>
        become nanny
      </Button>
      <Button onClick={handleRoleFamily}>
        become family
      </Button>
      <Button onClick={handleRoleNone}>
        become none
      </Button>
    </div>
  );
}