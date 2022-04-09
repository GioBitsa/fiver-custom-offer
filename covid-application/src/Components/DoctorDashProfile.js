import React from "react";
import './Styles/DoctorDashboard.css';

function DoctorDashProfile(){
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    return(
        <div className={"profile-container"}>
            <div align={"center"}>
            <img src={"https://pyxis.nymag.com/v1/imgs/576/191/a6fade5a35bff53d16c14a2af53f3c6852-31-dr-mike.rsquare.w700.jpg"} alt={"profile"} className={"profilepic2"}/>
            </div>
            <br></br>
            <div><p align={"center"}>Doctor: {loggedInUser.username} <br></br> </p></div>
            <div><p align={"center"}>This will contain information about <br></br> the doctor such as hobbies</p></div>

        </div>
    )
}
export default DoctorDashProfile