import React from "react";
import {Link} from "react-router-dom";
import './Styles/Footer.css';
import { BsFillTelephoneFill , BsFillPinMapFill, BsFacebook, BsTwitter } from 'react-icons/bs';


function Footer(){
  return (
    <div className="footer">
      <div className="footerCont">
        <div className="info">
          <p className="address"><BsFillPinMapFill/> 1455 De Maisonneuve Blvd. W. Mtl</p>
          <p className="phone"><BsFillTelephoneFill/> Tel: <a href="tel:5141231234">514 123 1234</a> </p>
        </div>
        <div className="social">
          <p className="fb"><BsFacebook/> Facebook</p>
          <p className="twitter"><BsTwitter/> Twitter</p>
      <p className="copyright">© 2023 by CovidTracker</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;


