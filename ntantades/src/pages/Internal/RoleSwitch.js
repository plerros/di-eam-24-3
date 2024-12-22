import { Button } from "@mui/material";

export default function RoleSwitch({handleUID}) {
  const handleNanny = () => {
    handleUID(1);
  };

  const handleFamily = () => {
    handleUID(2);
  };

  const handleNone = () => {
    handleUID(0);
  };

  return (
    <div>
      <h1>This is an internal Role Switch Page</h1>
      <Button onClick={handleNanny}>
        become nanny
      </Button>
      <Button onClick={handleFamily}>
        become family
      </Button>
      <Button onClick={handleNone}>
        become none
      </Button>
    </div>
  );
}