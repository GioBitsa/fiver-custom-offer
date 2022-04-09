import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Styles/Signup.css";
import axios from "./api/axios";
import Modal from 'react-modal';
import App from "../App";

const GLOBALUSERIDENTITY = null;
// regez for validation of the userbname and password
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Restful API Routes
const REGISTER_URL = "/registerEndpoint/";
const USERINFO_URL = "/registerUserInfoEndpoint/";
const CREATE_DOCTOR_URL = "/doctorCreateListEndpoint/";
const CREATE_PATIENT_URL = "/patientCreateEndpoint/";
const CREATE_IMMIGRANT_OFFICER_URL = "/ImmigrationCreateEndpoint/";
const CREATE_HEALTH_OFFICIAL_URL = "/HealthOfficialCreateListEndpoint/";
const CREATE_ADMINISTRATOR_URL = "/adminCreateEndpoint/";

// Chat engine URLs
const CHAT_ENGINE_USER_URL = "https://api.chatengine.io/users/";

// custom styles for modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    position: 'fixed',
  },
};

Modal.setAppElement('#root');

function Signup() {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }
  
  const userRef = useRef(); //focus on the user input
  const errRef = useRef(); //focus on the error if there is an error

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  //states for different states of the system
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  

  // Variables for the user_info
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userIdentity, setUserIdentity] = useState("");

  // Variables for the user_info
  const [doctorProfession, setDoctorProfession] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //validating the username
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  //validating the password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  //once one of the states changes we will clear the error message becasue the user saw the error
  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd, userIdentity, phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //preventing measures against hacking

    // // if button enabled with JS hack
    // const v1 = USER_REGEX.test(username);
    // const v2 = PWD_REGEX.test(password);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    try {
      let response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: username,
          first_name: firstname,
          last_name: lastname,
          //has different value so we rename it
          email: username,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      console.log(response?.data);
      const user = response?.data?.user;

      // Response for the user_info
      response = await axios.post(
        USERINFO_URL,
        JSON.stringify({
          phone_number: phoneNumber,
          user_identity: userIdentity,
          user: user.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      const UserInfo = response?.data?.user_info;
      console.log(UserInfo)

      // New user creation on chat engine
      let chat_response = await axios.post(
        CHAT_ENGINE_USER_URL,
        JSON.stringify({
          "username": username,
          "secret": "123123",
          "email": username,
          "first_name": firstname,
          "last_name": lastname,
        }),
        {
          headers: { 'PRIVATE-KEY': '4d1ece90-711f-4ba7-8808-ba8c388a4e81' },
          //   withCredentials: true,
        }
      );

      if (userIdentity == "1") { // If the user is a doctor on signup
        response = await axios.post(
          CREATE_DOCTOR_URL,
          JSON.stringify({
            user_info: UserInfo.id,
            profession: doctorProfession,
          }),
          {
            headers: { "Content-Type": "application/json" },
            //   withCredentials: true,
          }
        );
      } else if (userIdentity == "2") { // If the user is a patient on signup
        response = await axios.post(
          CREATE_PATIENT_URL,
          JSON.stringify({
            user_info: UserInfo.id,
            current_sex: 0,
            current_age_range: 0,
            current_test_status: false,
            recent_test_date: null,
            current_test_result: false,
            current_body_temp: -1.00,
            current_weight: 100.00,
            current_self_assessment: 0,
            current_symptoms: 0,
            current_vaxination_count: 0
          }),
          {
            headers: { "Content-Type": "application/json" },
            //   withCredentials: true,
          }
        );
      } else if (userIdentity == "3") { // If the user is an immigrant officer on signup
        response = await axios.post(
          CREATE_IMMIGRANT_OFFICER_URL,
          JSON.stringify({
            user_info: UserInfo.id,
          }),
          {
            headers: { "Content-Type": "application/json" },
            //   withCredentials: true,
          }
        );
      } else if (userIdentity == "4") { // If the user is a health official on signup
        response = await axios.post(
          CREATE_HEALTH_OFFICIAL_URL,
          JSON.stringify({
            user_info: UserInfo.id,
            profession: "",
          }),
          {
            headers: { "Content-Type": "application/json" },
            //   withCredentials: true,
          }
        );
      } else if (userIdentity == "5") { // If the user is a administrator on signup
        response = await axios.post(
          CREATE_ADMINISTRATOR_URL,
          JSON.stringify({
            user_info: UserInfo.id,
            role: "1",
          }),
          {
            headers: { "Content-Type": "application/json" },
            //   withCredentials: true,
          }
        );
      }

      // ***********************************************************************
      // Testing new user signup (in app and chat)
      // Axios version
      /*var axios = require('axios');
      var data = {
        "username": username,
        "secret": "123123",
        "email": username,
      	"first_name": firstname,
	      "last_name": lastname,
      };

      var config = {
        method: 'post',
        url: 'https://api.chatengine.io/users/',
        headers:{'PRIVATE-KEY': '4d1ece90-711f-4ba7-8808-ba8c388a4e81'},
        data:data
      };

      axios(config)
      .then(function(repsonse){
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error){
        console.log(error);
      })*/

      // ***********************************************************************

      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirstname("");
      setLastname("");
      setUsername("");
      setPassword("");
      setPhoneNumber("");
      setUserIdentity("");
      setMatchPwd("");
      navigate(from, { replace: true });

      // Console Debug
      console.log(user);
      console.log(phoneNumber);
      console.log(userIdentity);
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
        // navigate(from, { replace: true });
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  //if the error message exist the error message will be displayed
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="signcontainer">
          <label htmlFor="signup">
            <b>Sign Up</b>
          </label>
        </div>

        <br />

        <div className="containerr">
          <label htmlFor="firstname">
            <b>First Name</b>
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            ref={userRef}
            autoComplete="off"
            // ties the input to the user state
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            required
          />

          <label htmlFor="lname">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            required
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={userRef}
            autoComplete="on"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            // it checks if the input is valid or not
            aria-invalid={validUsername ? "false" : "true"}
            //another element that discribes the element
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          />

          <label htmlFor="phone">
            <b>Phone Number</b>
          </label>
          <input
            type="text"
            name="phone"
            id="phoneNumber"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
          />

          <label htmlFor="psw">
            <b>Identification</b>
          </label>
          <br />
          <br />
          <select
            id="userIdentity"
            ref={userRef}
            onChange={(e) => setUserIdentity(e.target.value)}
          >
            <option value="default" selected disabled>
              - Select Identity -
            </option>
            <option value="2">Patient</option>
            <option value="1">Doctor</option>
            <option value="4">Health Official</option>
            <option value="3">Immigration Officer</option>
            <option value="5">Administrator</option>
          </select>

          <br />
          <br />

          <center>
            <label>
              <input
                className="checkmarker"
                type="checkbox"
                name="tandc"
                required
              />
              {" "}
              I agree to the{" "}
              <a className={"eulaClickable"} onClick={openModal}>End-User License Agreement</a>
            </label>
          </center>

          <br />
          <div className="signbtn">
            <button type="submit">Signup</button>
          </div>

          <div className="contLink">
            <center>
              <Link to="/login">Return To Login</Link>
            </center>
          </div>
        </div>
      </form>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal: EULA"
      style={customStyles}>
        <div>
          <p>

<h1 className="eulaTitle"><center>End-User License Agreement</center></h1>
<hr/>
Our EULA was last updated on [DATE]<br/><br/>
Please read this End-User License Agreement carefully before clicking the "I Agree" button, downloading or using [APP_NAME].<br/>
Interpretation and Definitions<br/>
Interpretation<br/>
The words of which the initial letter is capitalized have meanings defined under the following conditions.<br/>
The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.<br/><br/>
Definitions<br/>
For the purposes of this End-User License Agreement:<br/>
● "Agreement" means this End-User License Agreement that forms the entire agreement between You and the Company regarding the use of the Application. This EULA was generated by TermsFeed EULA Generator.<br/>
● "Application" means the software program provided by the Company downloaded by You through an Application Store's account to a Device, named [APP_NAME]<br/>
● "Application Store" means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) by which the Application has been downloaded to your Device.<br/>
● "Company" (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to [COMPANY_INFORMATION]<br/>
● "Content" refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.<br/>
● "Country" refers to: [COMPANY_COUNTRY]<br/>
● "Device" means any device that can access the Application such as a computer, a cellphone or a digital tablet.<br/>
● "Family Sharing / Family Group" permits You to share applications downloaded through the Application Store with other family members by allowing them to view and download each others' eligible Applications to their associated Devices.<br/>
● "Third-Party Services" means any services or content (including data, information, applications and other products services) provided by a third-party that may be displayed, included or made available by the Application.<br/>
● "You" means the individual accessing or using the Application or the company, or other legal entity on behalf of which such individual is accessing or using the Application, as applicable.<br/><br/>
Acknowledgment<br/>
By clicking the "I Agree" button, downloading or using the Application, You are agreeing to be bound by the terms and conditions of this Agreement.<br/>
If You do not agree to the terms of this Agreement,<br/>
do not click on the "I Agree" button, do not download or do not use the Application.<br/>
This Agreement is a legal document between You and the Company and it governs your use of the Application made available to You by the Company.<br/>
This Agreement is between You and the Company only and not with the Application Store. Therefore, the Company is solely responsible for the Application and its content.<br/>
Although the Application Store is not a party to this Agreement,<br/>
it has the right to enforce it against You as a third party beneficiary relating to your use of the Application. Since the Application can be accessed and used by other users via, for example,<br/>
Family Sharing / Family Group or volume purchasing, the use of the Application by those users is expressly subject to this Agreement.<br/>
The Application is licensed, not sold, to You by the Company for use strictly in accordance with the terms of this Agreement.<br/><br/>
License<br/>
Scope of License<br/>
The Company grants You a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application strictly in accordance with the terms of this Agreement.<br/>
You may only use the Application on a Device that You own or control and as permitted by the Application Store's terms and conditions. The license that is granted to You by the Company is solely for your personal,<br/>
non-commercial purposes strictly in accordance with the terms of this Agreement. License Restrictions You agree not to, and You will not permit others to:<br/>
● License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application or make the Application available to any third party.<br/>
● Remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of the Company or its affiliates, partners, suppliers or the licensors of the Application.<br/>
Intellectual Property The Application, including without limitation all copyrights, patents, trademarks,<br/>
trade secrets and other intellectual property rights are, and shall remain, the sole and exclusive property of the Company. The Company shall not be obligated to indemnify or defend You with respect to any third party claim arising out of or relating to the Application.<br/>
To the extent the Company is required to provide indemnification by applicable law, the Company, not the Application Store, shall be solely responsible for the investigation, defense,<br/>
settlement and discharge of any claim that the Application or your use of it infringes any third party intellectual property rights.<br/>
Modifications to the Application The Company reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to You. Updates to the Application The Company may from time to time provide enhancements or<br/>
improvements to the features/functionality of the Application, which may include patches, bug fixes, updates, upgrades and other modifications. Updates may modify or delete certain features and/or functionalities of the Application.<br/>
You agree that the Company has no obligation to (i) provide any Updates, or (ii) continue to provide or enable any particular features and/or functionalities of the Application to You. You further agree that all updates or any other modifications will be<br/>
(i) deemed to constitute an integral part of the Application, and<br/>
(ii) subject to the terms and conditions of this Agreement.<br/>
Maintenance and Support The Company does not provide any maintenance or support for the download and use of the Application.<br/>
To the extent that any maintenance or support is required by applicable law, the Company, not the Application Store, shall be obligated to furnish any such maintenance or support.<br/>
Third-Party Services The Application may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services.<br/>
You acknowledge and agree that the Company shall not be responsible for any Third-party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof.<br/>
The Company does not assume and shall not have any liability or responsibility to You or any other person or entity for any Third-party Services. You must comply with applicable Third parties' Terms of agreement when using the Application.<br/>
Third-party Services and links thereto are provided solely as a convenience to You and You access and use them entirely at your own risk and subject to such third parties' Terms and conditions. Term and Termination This Agreement shall remain in effect until terminated by You or the Company.<br/>
The Company may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice. This Agreement will terminate immediately, without prior notice from the Company, in the event that you fail to comply with any provision of this Agreement.<br/>
You may also terminate this Agreement by deleting the Application and all copies thereof from your Device or from your computer. Upon termination of this Agreement, You shall cease all use of the Application and delete all copies of the Application from your Device.<br/>
Termination of this Agreement will not limit any of the Company's rights or remedies at law or in equity in case of breach by You (during the term of this Agreement) of any of your obligations under the present Agreement.<br/>
Indemnification You agree to indemnify and hold the Company and its parents, subsidiaries, affiliates, officers, employees, agents, partners and licensors (if any) harmless from any claim or demand, including reasonable attorneys' fees, due to or arising out of your:<br/>
(a) use of the Application;<br/>
(b) violation of this Agreement or any law or regulation; or<br/>
(c) violation of any right of a third party. No Warranties The Application is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.<br/>
To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Application,<br/>
including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.<br/>
Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Application will meet your requirements, achieve any intended results, be compatible or work with any other software, applications,<br/>
systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.<br/>
Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied:<br/>
(i) as to the operation or availability of the Application, or the information, content, and materials or products included thereon;<br/>
(ii) that the Application will be uninterrupted or error-free;<br/>
(iii) as to the accuracy, reliability, or currency of any information or content provided through the Application; or<br/>
(iv) that the Application, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.<br/>
Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You.<br/>
But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law. To the extent any warranty exists under law that cannot be disclaimed, the Company, not the Application Store, shall be solely responsible for such warranty.<br/>
Limitation of Liability Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Agreement and your exclusive remedy for all of the foregoing shall be limited<br/>
to the amount actually paid by You for the Application or through the Application or 100 USD if You haven't purchased anything through the Application.<br/>
To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption,<br/>
for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Application, third-party software and/or third-party hardware used with the Application, or otherwise in connection with any provision of this Agreement),<br/>
even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.<br/>
Some states/jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to You.<br/>
You expressly understand and agree that the Application Store, its subsidiaries and affiliates, and its licensors shall not be liable to You under any theory of liability for any direct, indirect, incidental, special consequential or exemplary damages that may be incurred by You, including any loss of data, whether or not the Application Store or<br/>
its representatives have been advised of or should have been aware of the possibility of any such losses arising.<br/>
Severability and Waiver Severability If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.<br/>
Waiver Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Agreement shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor<br/>
shall the waiver of a breach constitute a waiver of any subsequent breach. Product Claims The Company does not make any warranties concerning the Application.<br/>
To the extent You have any claim arising from or relating to your use of the Application, the Company, not the Application Store, is responsible for addressing any such claims, which may include, but not limited to:<br/>
(i) any product liability claims;<br/>
(ii) any claim that the Application fails to conform to any applicable legal or regulatory requirement; and<br/>
(iii) any claim arising under consumer protection,<br/>
or similar legislation. United States Legal Compliance You represent and warrant that<br/>
(i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and<br/>
(ii) You are not listed on any United States government list of prohibited or restricted parties. Changes to this Agreement The Company reserves the right, at its sole discretion,<br/>
to modify or replace this Agreement at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at the sole discretion of the Company.<br/>
By continuing to access or use the Application after any revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, You are no longer authorized to use the Application.<br/>
Governing Law The laws of the Country, excluding its conflicts of law rules, shall govern this Agreement and your use of the Application. Your use of the Application may also be subject to other local, state, national, or international laws.<br/>
Entire Agreement The Agreement constitutes the entire agreement between You and the Company regarding your use of the Application and supersedes all prior and contemporaneous written or oral agreements between You and the Company.<br/>
You may be subject to additional terms and conditions that apply when You use or purchase other Company's services, which the Company will provide to You at the time of such use or purchase.<br/>
Contact Us If you have any questions about this Agreement, You can contact Us:<br/>
● By visiting this page on our website: [WEBSITE_CONTACT_PAGE_URL]<br/>
● By sending us an email: [WEBSITE_CONTACT_EMAIL]<br/>
          </p>
          <div className="alignEulaButton">
            <div className="eulaButton">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Signup;
