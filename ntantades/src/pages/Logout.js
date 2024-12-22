import { Navigate } from "react-router-dom";

export default function Logout({handleUID}) {
  handleUID(0);
  return (
      <Navigate to="/" />
    );
  }