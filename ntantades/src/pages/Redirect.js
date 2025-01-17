import * as React from 'react';
import { Navigate } from "react-router-dom";

export default function Redirect({redirect, setRedirect}) {
  React.useEffect(() => {
    if (redirect[0] !== "/") {
      setRedirect(["/", redirect[0]]);
    }
  }, [redirect, setRedirect]);

  if (redirect[1] === "/")
    return([]);

  return (
      <Navigate to={redirect[1]} />
  );
}