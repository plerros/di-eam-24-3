import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';

import Navbar from './components/Navbar/Navbar';
import Breadcrumb from './components/Breadcrumb';

import Home        from "./pages/Home";
import Search      from "./pages/Search";
import BecomeNanny from "./pages/BecomeNanny";
import Help        from "./pages/Help";
import Login       from "./pages/Login";
import Logout      from "./pages/Logout";
import Users        from "./pages/Users";
import Reviews     from "./pages/Reviews";

import FamilyAgreements from "./pages/Family/Agreements";
import FamilyProfile    from "./pages/Family/Profile";
import FamilyRendezvous from "./pages/Family/Rendezvous";
import FamilyRequests   from "./pages/Family/Requests";
import FamilySignUp     from "./pages/Family/SignUp";

import NannyAgreements from "./pages/Nanny/Agreements";
import NannyNewOffer   from "./pages/Nanny/NewOffer"; 
import NannyOffers     from "./pages/Nanny/Offers";
import NannyProfile    from "./pages/Nanny/Profile";
import NannyRendezvous from "./pages/Nanny/Rendezvous";
import NannyRequests   from "./pages/Nanny/Requests";
import NannySignUp     from "./pages/Nanny/SignUp";

import RoleSwitch from "./pages/Internal/RoleSwitch";
import Playground from './pages/Internal/Playground';

import Redirect from "./pages/Redirect";
import NoPage from "./pages/NoPage";

import * as Database from "./components/Database";

const PrivateFamily = ({uid}) => {
  const user = Database.getUser(uid);
  return (user.role === "Family") ? <Outlet /> : <Navigate to="/nopage" />;
}

const PrivateNanny = ({uid}) => {
  const user = Database.getUser(uid);
  return (user.role === "Nanny") ? <Outlet /> : <Navigate to="/nopage" />;
}

export default function App() {
  const storedUID = parseInt(localStorage.getItem('uid'));
  const [uid, setUID] = React.useState(storedUID ? storedUID : 0);
  const handleUID = (uid) => {
    setUID(uid);
    localStorage.setItem('uid', uid);
  }

  const [redirect, setRedirect] = React.useState(["/", "/"]);
  const [searchMunicipality, setSearchMunicipality] = React.useState(null);

  Database.json_to_localstorage();
  return (
    <BrowserRouter>
      <Navbar
        uid={uid}
      />
      <Breadcrumb/>
      <Routes>
        <Route index element={<Home municipality={searchMunicipality} setMunicipality={setSearchMunicipality} />} />
        <Route path="search" element={<Search  municipality={searchMunicipality} setMunicipality={setSearchMunicipality} />} />
        <Route path="becomenanny" element={<BecomeNanny setRedirect={setRedirect}/>} />
        <Route path="help" element={<Help />} />
        <Route path="redirect" element={<Redirect redirect={redirect} setRedirect={setRedirect} />} />

        {/* write login / logout system */}
        <Route path="login" element={
          <Login uid = {uid} handleUID={handleUID} />
        } />
        <Route path="logout" element={
          <Logout handleUID={handleUID} />
        } />

        <Route path="familysignup" element={<FamilySignUp uid={uid} setUID={setUID}/>} />
        <Route path="nannysignup"  element={<NannySignUp uid={uid} setUID={setUID}/>} />

        <Route path="users/:url_uid" element={<Users uid={uid} redirect={redirect} setRedirect={setRedirect}/>}/>
        <Route path="users/:url_uid/reviews" element={<Reviews uid={uid}/>}/>

        <Route path="family" element={<PrivateFamily uid={uid}/>}>
          <Route index element = {<FamilyProfile uid={uid} />} />
          <Route path="agreements" element={<FamilyAgreements />} />
          <Route path="rendezvous" element={<FamilyRendezvous />} />
          <Route path="requests"   element={<FamilyRequests />} />
        </Route>

        <Route path="nanny" element={<PrivateNanny uid={uid} />}>
          <Route index element = {<NannyProfile uid={uid} />} />
          <Route path="agreements" element={<NannyAgreements />} />
          <Route path="newoffer"   element={<NannyNewOffer uid={uid} />} />
          <Route path="offers"     element={<NannyOffers uid={uid} />} />
          <Route path="rendezvous" element={<NannyRendezvous uid={uid}/>} />
          <Route path="requests"   element={<NannyRequests />} />
        </Route>

        <Route path="internal">
          <Route path="playground" element={<Playground uid={uid} />}/>
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

