import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import RequireNoAuth from "./Components/RequireNoAuth";
import useAuth from "./Components/hooks/useAuth";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AmpTest from "./Components/AmpTest";
import CovidForm from "./Components/CovidForm";
import UpdatedCovidForm from "./Components/UpdatedCovidForm";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import HealthDashBoard from "./Components/HealthDashBoard";
import ImmigrantDashBoard from "./Components/ImmigrantDashBoard";
import ContactDoctor from "./Components/ContactDoctor";
import DoctorMail from "./Components/DoctorMail";
import Profile from "./Components/Profile";
import AdminDashboard from "./Components/AdminDashboard";
import ContactTracingForm from "./Components/ContactTracingForm";
import chat_app from "./Components/chat_app";
import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './Components/app_components/ChatFeed.jsx';
import ChatFeed_Urgent from './Components/app_components/ChatFeed_Urgent.jsx';

import './Components/chat.css';

const loggedInUser = JSON.parse(localStorage.getItem("user"));  

function App() {
  return (
    <div>
      <Header />
      <div className="mainBody">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route path="profile" element={<Profile />} />
                <Route path="Test1" element={<AmpTest />} />
                <Route path="CovidForm" element={<CovidForm />} />
                <Route path="UpdatedCovidForm" element={<UpdatedCovidForm />} />
                <Route path="DoctorDashBoard" element={<DoctorDashboard />} />
                <Route path="ContactDoctor" element={<ContactDoctor />} />
                <Route path="DoctorMail" element={<DoctorMail />} />


                <Route comment= "MAIN CODE TO RUN CHAT APP - DO NOT TOUCH !!!!!!" path="chat_app" element={
                  <ChatEngine 
                  // DO NOT TOUCH THESE!!!!!!!!!!!
                  height = "80vh"
                  projectID = "7b218aae-0285-437f-b1d3-a068537398c4"
                  
                  // Change/uncomment the username to access other users views 
                  // Main user
                  // TODO - Change this so that the user changes dynamically
                  //userName = {loggedInUser.username}
                  userName = {(loggedInUser == null) ? "invalid_user": loggedInUser.username}
                  
                  //userName = "x"
      
                  // User password - leave it as is for now
                  userSecret = "123123"
      
      
      
      
                  // EVENT HOOKS - PROCEED WITH CAUTION
      
                  // Change header when new message is received
                  // TODO
                  
      
                  // Send notification to backend when a new message is received
                  // TODO - this is a placeholder for now
                  onNewMessage={(chatId, message) => console.log(chatId, message)}
      
                  renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}/>} />
                
                <Route comment= "MAIN CODE TO RUN CHAT APP - DO NOT TOUCH !!!!!!" path="chat_app_urgent" element={
                  <ChatEngine 
                  // DO NOT TOUCH THESE!!!!!!!!!!!
                  height = "80vh"
                  projectID = "7b218aae-0285-437f-b1d3-a068537398c4"
                  
                  // Change/uncomment the username to access other users views 
                  // Main user
                  // TODO - Change this so that the user changes dynamically
                  //userName = {loggedInUser.username}
                  userName = {(loggedInUser == null) ? "invalid_user": loggedInUser.username}
                  
                  //userName = "x"
      
                  // User password - leave it as is for now
                  userSecret = "123123"
      
      
      
      
                  // EVENT HOOKS - PROCEED WITH CAUTION
      
                  // Change header when new message is received
                  // TODO
                  
      
                  // Send notification to backend when a new message is received
                  // TODO - this is a placeholder for now
                  onNewMessage={(chatId, message) => console.log(chatId, message)}
      
                  renderChatFeed={(chatAppProps) => <ChatFeed_Urgent {...chatAppProps} />}/>} />


                  <Route path="HealthDashBoard" element={<HealthDashBoard />} />
                  <Route path="ImmigrantDashBoard" element={<ImmigrantDashBoard />} />
                <Route path="PatientDashboard" element={<PatientDashboard />} />
                  <Route path="AdminDashboard" element={<AdminDashboard />} />
                <Route path="ContactTracingForm" element={<ContactTracingForm />} />
              </Route>
              <Route path="" element={<Login />} />
              <Route element={<RequireNoAuth />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

// const Home = () => {
//   // const { auth } = useAuth();

//   return (
//     <div className="HomePage">
//       <h1>Home Page</h1>
//       <h4>
//         add <a href="/login">'/login'</a> to url to reach login page
//       </h4>
//     </div>
//   );
// };

export default App;
