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

const issueNone = {error:false, help:""};

function LSgetItemSafe(item, defaultVal)
{
  const result = localStorage.getItem(item);
  return (result === null) ? defaultVal : result;
}

function LSgetParseSafe(item, defaultVal)
{
  const result = JSON.parse(localStorage.getItem(item));
  return (result === null) ? defaultVal : result;
}

const initialize_lookingFor = {
  municipality      : LSgetItemSafe('lookingForMunicipality', null),
  municipalityIssue : issueNone,

  fullTime          : LSgetItemSafe('lookingForFullTime', true),
  fullTimeIssue     : issueNone,

  partTime          : LSgetItemSafe('lookingForPartTime', false),
  partTimeIssue     : issueNone,

  hours             : LSgetParseSafe('lookingForHours', [9,17]),
  hoursIssue        : issueNone,

  monday            : LSgetItemSafe('lookingForMonday', true),
  mondayIssue       : issueNone,

  tuesday           : LSgetItemSafe('lookingForTuesday', true),
  tuesdayIssue      : issueNone,

  wednesday         : LSgetItemSafe('lookingForWednesday', true),
  wednesdayIssue    : issueNone,

  thursday          : LSgetItemSafe('lookingForThursday', true),
  thursdayIssue     : issueNone,

  friday            : LSgetItemSafe('lookingForFriday', true),
  fridayIssue       : issueNone,

  saturday          : LSgetItemSafe('lookingForSaturday', true),
  saturdayIssue     : issueNone,

  sunday            : LSgetItemSafe('lookingForSunday', false),
  sundayIssue       : issueNone,
}

function reduce_lookingFor(state, action) {
  switch (action.type) {
    case 'changed_municipality': {
      localStorage.setItem('lookingForMunicipality', action.nextMunicipality);
      return {
        ...state,
        municipality: action.nextMunicipality,
        municipalityIssue: issueNone
      }
    }
    case 'toggled_fullTime': {
      const value = !(state.fullTime)
      if (state.fullTime === true) {
        localStorage.setItem('lookingForPartTime', true);
        localStorage.setItem('lookingForFullTime', value);
        return {
          ...state,
          partTime: true,
          partTimeIssue: issueNone,
          fullTime: value,
          fullTimeIssue: issueNone
        }
      }
      return {
        ...state,
        fullTime: value,
        fullTimeIssue: issueNone
      }
    }
    case 'toggled_partTime': {
      const value = !(state.partTime)
      if (state.partTime === true) {
        localStorage.setItem('lookingForFullTime', true);
        localStorage.setItem('lookingForPartTime', value);
        return {
          ...state,
          fullTime: true,
          fullTimeIssue: issueNone,
          partTime: value,
          partTimeIssue: issueNone
        }
      }
      return {
        ...state,
        partTime: value,
        partTimeIssue: issueNone
      }
    }
    case 'changed_hours': {
      localStorage.setItem('lookingForHours', JSON.stringify(action.nextHours));
      return {
        ...state,
        hours: action.nextHours,
        hoursIssue: issueNone
      }
    }
    case 'toggled_monday': {
      const value = !(state.monday);
      localStorage.setItem('lookingForMonday', value);
      return {
        ...state,
        monday: value,
        mondayIssue: issueNone
      }
    }
    case 'toggled_tuesday': {
      const value = !(state.tuesday);
      localStorage.setItem('lookingForTuesday', value);
      return {
        ...state,
        tuesday: value,
        tuesdayIssue: issueNone
      }
    }
    case 'toggled_wednesday': {
      const value = !(state.wednesday);
      localStorage.setItem('lookingForWednesday', value);
      return {
        ...state,
        wednesday: value,
        wednesdayIssue: issueNone
      }
    }
    case 'toggled_thursday': {
      const value = !(state.thursday);
      localStorage.setItem('lookingForThursday', value);
      return {
        ...state,
        thursday: value,
        thursdayIssue: issueNone
      }
    }
    case 'toggled_friday': {
      const value = !(state.friday);
      localStorage.setItem('lookingForFriday', value);
      return {
        ...state,
        friday: value,
        fridayIssue: issueNone
      }
    }
    case 'toggled_saturday': {
      const value = !(state.saturday);
      localStorage.setItem('lookingForSaturday', value);
      return {
        ...state,
        saturday: value,
        saturdayIssue: issueNone
      }
    }
    case 'toggled_sunday': {
      const value = !(state.sunday);
      localStorage.setItem('lookingForSunday', value);
      return {
        ...state,
        sunday: value,
        sundayIssue: issueNone
      }
    }
    default: {}
  }
  throw Error('Unknown action: ' + action.type);
}

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
  const [lookingFor_state, lookingFor_dispatch] = React.useReducer(reduce_lookingFor, initialize_lookingFor);

  Database.json_to_localstorage();
  return (
    <BrowserRouter>
      <Navbar
        uid={uid}
      />
      <Breadcrumb/>
      <Routes>
        <Route index element={<Home lookingFor_state={lookingFor_state} lookingFor_dispatch={lookingFor_dispatch} />} />
        <Route path="search" element={<Search  lookingFor_state={lookingFor_state} lookingFor_dispatch={lookingFor_dispatch}/>} />
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

        <Route
          path="users/:url_uid"
          element={
            <Users
              uid={uid}
              redirect={redirect}
              setRedirect={setRedirect}
              lookingFor_state={lookingFor_state}
              lookingFor_dispatch={lookingFor_dispatch} 
            />
          }
        />
        <Route path="users/:url_uid/reviews" element={<Reviews uid={uid}/>}/>

        <Route path="family" element={<PrivateFamily uid={uid}/>}>
          <Route index element = {<FamilyProfile uid={uid} />} />
          <Route path="agreements" element={<FamilyAgreements uid={uid} />} />
          <Route path="rendezvous" element={<FamilyRendezvous uid={uid} />} />
          <Route path="requests"   element={<FamilyRequests uid={uid} />} />
        </Route>

        <Route path="nanny" element={<PrivateNanny uid={uid} />}>
          <Route index element = {<NannyProfile uid={uid} />} />
          <Route path="agreements" element={<NannyAgreements />} />
          <Route path="newoffer"   element={<NannyNewOffer uid={uid} />} />
          <Route path="offers"     element={<NannyOffers uid={uid} />} />
          <Route path="rendezvous" element={<NannyRendezvous uid={uid}/>} />
          <Route path="requests"   element={<NannyRequests uid={uid}/>} />
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

