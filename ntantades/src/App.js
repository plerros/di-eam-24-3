import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';

import getUser from './components/getUser';
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
import Playground from './pages/Internal/Playground';

import NoPage from "./pages/NoPage";

//import Database from "./data.json";

const PrivateFamily = ({uid}) => {
  const user = getUser(uid);
  return (user.role === "Family") ? <Outlet /> : <Navigate to="/nopage" />;
}

const PrivateNanny = ({uid}) => {
  const user = getUser(uid);
  return (user.role === "Nanny") ? <Outlet /> : <Navigate to="/nopage" />;
}

export default function App() {
  const storedUID = parseInt(localStorage.getItem('uid'));
  const [uid, setUID] = React.useState(storedUID);
  const handleUID = (uid) => {
    setUID(uid);
    localStorage.setItem('uid', uid);
  }

  return (
    <BrowserRouter>
      <Navbar
        uid={uid}
      />
      <Breadcrumb/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="becomenanny" element={<BecomeNanny />} />
        <Route path="help" element={<Help />} />

        {/* write login / logout system */}
        <Route path="login" element={
          <Login handleUID={handleUID} />
        } />
        <Route path="logout" element={
          <Logout handleUID={handleUID} />
        } />

        <Route path="family/signup" element={<FamilySignUp />} />
        <Route path="nanny/signup"  element={<NannySignUp />} />

        <Route path="family" element={<PrivateFamily uid={uid}/>}>
          <Route index element = {<FamilyProfile />} />
          <Route path="agreements" element={<FamilyAgreements />} />
          <Route path="rendezvous" element={<FamilyRendezvous />} />
          <Route path="requests"   element={<FamilyRequests />} />
        </Route>

        <Route path="nanny" element={<PrivateNanny uid={uid} />}>
          <Route index element = {<NannyProfile />} />
          <Route path="agreements" element={<NannyAgreements />} />
          <Route path="offers"     element={<NannyOffers />} />
          <Route path="rendezvous" element={<NannyRendezvous />} />
          <Route path="requests"   element={<NannyRequests />} />
        </Route>

        <Route path="internal">
          <Route path="playground" element={<Playground />}/>
          <Route path="roleSwitch" element={
            <RoleSwitch handleUID={handleUID} />
          } />
        </Route>

        {/* 404 page not found */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

