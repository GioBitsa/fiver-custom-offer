import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Styles/Login.css";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { UserStatusContext } from "./Context/UserStatusContext";
import { UserContext } from "./Context/AppContext";
import { log } from "react-modal/lib/helpers/ariaAppHider";

const LOGIN_URL = "/loginEndpoint/";
const GET_USER_INFO = "/userInfoEndpoint/";
const GET_PATIENT = "/patientEndpoint/";
const GET_DOCTOR = "/doctorEndpoint/";
const GET_IMMIGRANT_OFFICER = "/immigrantOfficerEndpoint/";
const GET_HEALTH_OFFICIAL = "/HealthOfficialEndpoint/";
const GET_ADMINISTRATOR = "/adminEndpoint/";

const Login = () => {
  // const { setAuth } = useAuth();

  // const [LoggedInUserInfo, setLoggedInUserInfo] = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useContext(UserStatusContext);

  const navigate = useNavigate();
  const location = useLocation();
  let from = null;

  var user_Identity;
  




  //setting the focus on components or on the error
  const userRef = useRef();
  const errRef = useRef();

  // const [user, setUser] = useState();

  const [username, setUsername] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn === true && LoggedInUserInfo.name !== null) {
  //     // setAllSet(true);
  //     localStorage.setItem("userInfo", JSON.stringify(LoggedInUserInfo));
  //     localStorage.setItem("userStatus", JSON.stringify(isLoggedIn));
  //   }
  // }, [LoggedInUserInfo, isLoggedIn]);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      let response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // const uname = response.data.user.username;
      // const firstname = response.data.user.first_name;
      // const lastname = response.data.user.last_name;
      // const email = response.data.user.email;
      // const token = response.data.token;

      // const newUser = {
      //   username: uname,
      //   firstname: firstname,
      //   lastname: lastname,
      //   email: email,
      //   token: token
      // }
      // console.log(JSON.stringify(newUser));
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const token = response?.data?.token;
      // const roles = response?.data?.roles;
      const user = response?.data?.user;
      // setAuth({ user, token });
      // setLoggedInUserInfo(user);
      // setIsLoggedIn(true);

      // set the state of the user
      // setUser(response.data);
      // store the user in localStorages
      // localStorage.setItem("user", response.data.user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userStatus", true);

      console.log(response.data);

      // Response for the user_info
      response = await axios.get(
        GET_USER_INFO + user.id + "/",
      );
      const user_info = response.data[0]
      console.log(response.data);
      localStorage.setItem("user_info", JSON.stringify(user_info))

      // Response for the patient
      response = await axios.get(
        GET_PATIENT + user_info.id + "/",
      );
      const patient = response.data[0]
      console.log(response.data);
      localStorage.setItem("patient", JSON.stringify(patient))

      // Response for the doctor
      response = await axios.get(
        GET_DOCTOR + user_info.id + "/",
      );
      const doctor = response.data[0]
      console.log(response.data);
      localStorage.setItem("doctor", JSON.stringify(doctor))

      // Response for the immigrant officer
      response = await axios.get(
        GET_IMMIGRANT_OFFICER + user_info.id + "/",
      );
      const immigrant_officer = response.data[0]
      console.log(response.data);
      localStorage.setItem("immigrant officer", JSON.stringify(immigrant_officer))

      // Response for the health official
      response = await axios.get(
        GET_HEALTH_OFFICIAL + user_info.id + "/",
      );
      const health_official = response.data[0]
      console.log(response.data);
      localStorage.setItem("health official", JSON.stringify(health_official))

      // Response for the health official
      response = await axios.get(
        GET_ADMINISTRATOR + user_info.id + "/",
      );
      const administrator = response.data[0]
      console.log(response.data);
      localStorage.setItem("administrator", JSON.stringify(administrator))

      if (localStorage.getItem("user_info")) {
        user_Identity = JSON.parse(localStorage.getItem("user_info")).user_identity;
        console.log(user_Identity);
      } else {
        console.log("Identity Null");
        user_Identity = null;
      }

      if (user_Identity == '1') {
        from = location.state?.from?.pathname || "/DoctorDashboard";
        
        
      } else if (user_Identity == '2') {
        from = location.state?.from?.pathname || "/PatientDashboard";
        
      } else if (user_Identity == '3') {
        from = location.state?.from?.pathname || "/ImmigrantDashBoard";
        
      } else if (user_Identity == '4') {
        from = location.state?.from?.pathname || "/HealthDashBoard";
        
      } else if (user_Identity == '5') {
        from = location.state?.from?.pathname || "/AdminDashboard";
        
      } else {
        from = location.state?.from?.pathname || "/profile";
      }

      // setUsername("");
      // setPwd("");
      if (from) {
        navigate(from, { replace: true });
        refreshPage()
      }
      // setSuccess(true);
      // return response;
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }

  };


  function refreshPage() {
    window.location.reload();
  }

  return (
    // <>
    //   {success ? (
    //     <section className="container">
    //       <h1>You are logged in!</h1>
    //       <br />
    //       <h2>Hello </h2>
    //       <p>
    //         <a href="/">Go to Home</a>
    //       </p>
    //     </section>
    //   ) : (
    <section className="LogIN">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="logcontainer">
          <label htmlFor="login">
            <b>Log In</b>
          </label>
        </div>

        <br />

        <div className="signup_container">
          <label htmlFor="login">
            <b>
              New to this site? <Link to="/signup"> Sign up</Link>
            </b>
          </label>
        </div>

        <div className="containerr">
          <label htmlFor="username">
            <b>Email</b>
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            //this is crucial to clear the form upon submitting
            value={username}
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            required
          />

          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>

          <br />
          <div className="logbtn">
            <button type="submit">Login</button>
          </div>


          <div className="contLink">
            <center>
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
            </center>
          </div>
        </div>
      </form>
    </section>
    // )}
    // </>
  );
};

export default Login;

//     // <div className="LogIN">
//     //   <form action="action_page.php" method="post">
//     //     <div className="logcontainer">
//     //       <label for="login">
//     //         <b>Log In</b>
//     //       </label>
//     //     </div>

//     //     <br />

//     //     <div className="signup_container">
//     //       <label for="login">
//     //         <b>
//     //           New to this site? <Link to="/signup"> Sign up</Link>
//     //         </b>
//     //       </label>
//     //     </div>

//     //     <div className="container">
//     //       <label for="uname">
//     //         <b>Email</b>
//     //       </label>
//     //       <input type="text" name="uname" required />
//     //       <label for="psw">
//     //         <b>Password</b>
//     //       </label>
//     //       <input type="password" name="psw" required />

//     //       <label>
//     //         <input type="checkbox" checked="checked" name="remember" /> Remember
//     //         me
//     //       </label>

//     //       <br />
//     //       <div className="logbtn">
//     //         <button type="submit">Login</button>
//     //       </div>
//     //       <div className="contLink">
//     //         <center>
//     //           <span className="psw">
//     //             Forgot <a href="#">password?</a>
//     //           </span>
//     //         </center>
//     //       </div>
//     //     </div>
//     //   </form>
//     // </div>
//   );
// }

// export default Login;
