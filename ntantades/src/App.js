import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import Navbar from './components/Navbar/Navbar';
import Breadcrumb from './components/Breadcrumb';

import Home        from "./pages/Home";
import Search      from "./pages/Search";
import BecomeNanny from "./pages/BecomeNanny";
import Help        from "./pages/Help";
import Login       from "./pages/Login";
import Logout      from "./pages/Logout";

import FamilyAgreements from "./pages/Family/Agreements";
import FamilyProfile    from "./pages/Family/Profile";
import FamilyRendezvous from "./pages/Family/Rendezvous";
import FamilyRequests   from "./pages/Family/Requests";
import FamilySignUp     from "./pages/Family/SignUp";

import NannyAgreements from "./pages/Nanny/Agreements";
import NannyOffers     from "./pages/Nanny/Offers";
import NannyProfile    from "./pages/Nanny/Profile";
import NannyRendezvous from "./pages/Nanny/Rendezvous";
import NannyRequests   from "./pages/Nanny/Requests";
import NannySignUp     from "./pages/Nanny/SignUp";

import RoleSwitch from "./pages/Internal/RoleSwitch";

import NoPage from "./pages/NoPage";

const users = [
  {
    id: 1,
    type: "Nanny",
    firstName: "Benjamin",
    lastName: "Thool",
    picture: "/static/images/avatar/2.jpg"
  }
];

export default function App() {
  const storedRole = localStorage.getItem('role');
  const [role, setRole] = React.useState(storedRole);

  const handleRoleNanny = () => {
    setRole("Nanny");
    localStorage.setItem('role', "Nanny")
  }
  const handleRoleFamily = () => {
    setRole("Family");
    localStorage.setItem('role', "Family")
  }
  const handleRoleNone = () => {
    setRole();
    localStorage.removeItem('role')
  }

  return (
    <BrowserRouter>
      <Navbar
        user={users[0]}
        role={role}
      />
      <Breadcrumb/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="becomenanny" element={<BecomeNanny />} />
        <Route path="help" element={<Help />} />

        {/* write login / logout system */}
        <Route path="login" element={
          <Login
            handleRoleNanny={handleRoleNanny}
            handleRoleFamily={handleRoleFamily}
            handleRoleNone={handleRoleNone}
          />
        } />
        <Route path="logout" element={
          <Logout
            handleRoleNanny={handleRoleNanny}
            handleRoleFamily={handleRoleFamily}
            handleRoleNone={handleRoleNone}
          />
        } />

        <Route path="family">
          <Route index element = {<FamilyProfile />} />
          <Route path="agreements" element={<FamilyAgreements />} />
          <Route path="rendezvous" element={<FamilyRendezvous />} />
          <Route path="requests"   element={<FamilyRequests />} />
          <Route path="signup"     element={<FamilySignUp />} />
        </Route>

        <Route path="nanny">
          <Route index element = {<NannyProfile />} />
          <Route path="agreements" element={<NannyAgreements />} />
          <Route path="offers"     element={<NannyOffers />} />
          <Route path="rendezvous" element={<NannyRendezvous />} />
          <Route path="requests"   element={<NannyRequests />} />
          <Route path="signup"     element={<NannySignUp />} />
        </Route>

        <Route path="internal">
          <Route path="roleSwitch" element={
            <RoleSwitch
              handleRoleNanny={handleRoleNanny}
              handleRoleFamily={handleRoleFamily}
              handleRoleNone={handleRoleNone}
            />
          } />
        </Route>

        {/* 404 page not found */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

