import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Header.css";
import Navlink from "./Navlink";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiVirusFill } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";
import { Nav, NavItem, NavLink } from "reactstrap";
import Profile from "./Profile";
import el from "date-fns/esm/locale/el/index.js";
import RequireAuth from "./RequireAuth";

// Test variables
const hasMessage = true
const hasCTForm = false


function refreshPage() {
  window.location.reload(false);
}

function Header() {
  var user_Identity;
  if (localStorage.getItem("user_info")) {
    user_Identity = JSON.parse(localStorage.getItem("user_info")).user_identity;
  } else {
    user_Identity = null;
  }

  if (user_Identity == '1') {
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
      
            <Navlink name="Profile" href="#" navlinks='profile'/>
            <Navlink name="Doctor Dashboard" href="#" navlinks='doctordashBoard'/>
            <Navlink name= {hasMessage ? "Messages (new)" : "Messages"} href="#" navlinks='chat_app'/>
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  } else if (user_Identity == '2') {
    const is_contact_tracing = JSON.parse(localStorage.getItem("patient")).is_contact_tracing;
    const form_number = JSON.parse(localStorage.getItem("patient")).form_number;
    function isContactTracing() {
      if (is_contact_tracing) {
        return <Navlink name="Contact Tracing" href="#" navlinks='ContactTracingForm'/>;
      } else {
        return null;
      }
    } 
    function formNumberCheck(form_number) {
      if (form_number == 1) {
        return <Navlink name="Status Form" href="#" navlinks='CovidForm'/>;
      } else if (form_number == 2) {
        return <Navlink name="Update Status Form" href="#" navlinks='UpdatedCovidForm'/>;
      } else {
        return null;
      }
    }
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
            <Navlink name="Profile" href="#" navlinks='profile'/>
            <Navlink name="Patient Dashboard" href="#" navlinks='patientdashboard'/>
            <Navlink name= {hasMessage ? "Messages (new)" : "Messages"} href="#" navlinks='chat_app'/>
            {isContactTracing()}
            {formNumberCheck(form_number)}     
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  } else if (user_Identity == '3') {
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
            <Navlink name="Profile" href="#" navlinks='profile'/>
            <Navlink name="Immigrant Officer Dashboard" href="#" navlinks='ImmigrantDashBoard'/>
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  }else if (user_Identity == '4') {
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
            <Navlink name="Profile" href="#" navlinks='profile'/>
            <Navlink name="Health Official Dashboard" href="#" navlinks='HealthDashBoard'/>
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  } else if (user_Identity == '5') {
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
            <Navlink name="Profile" href="#" navlinks='profile'/>
            <Navlink name="Administrator Dashboard" href="#" navlinks='AdminDashboard'/>
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  } else if (user_Identity == null) {
    return (
      <div className="header">
        <div className="centerHead">
          <div className="logo">
            <h1>
              <span className="logo">
                <RiVirusFill />
              </span>{" "}
              Covid Tracker
            </h1>
          </div>
        </div>
        <div className="navibar">
          <Nav pills>
      
            <Navlink name="Login" href="#" navlinks='login'/>
          </Nav>
        </div>
      </div>
    );
    refreshPage();
  }
  refreshPage();
}

export default Header;
