import React from "react";
import PropTypes from "prop-types";
import "./Styles/Navlink.css";
import { NavItem, NavLink } from 'reactstrap';




function Navlink(props){

  // onClick function for the Nav Links
const action = () => {
  
  // redirect link
  const is_deployed = true; // Toggle whether the feature is deployed or not
  if (is_deployed) {
    window.location.href = 'https://agreeable-grass-04cb36610.1.azurestaticapps.net/' + props.navlinks;
  } else {
    window.location.href = 'http://localhost:3000/' + props.navlinks;
  }
}

  return (
    <NavItem>
      <div className="linkbg">
        <NavLink  href={props.href} disabled={props.disabled} active={props.active} onClick={action}>
            {props.name}
        </NavLink>
      </div>
    </NavItem>
   
  );
}

export default Navlink;
