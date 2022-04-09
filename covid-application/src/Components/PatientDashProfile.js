import React from "react";
import './Styles/DoctorDashboard.css';

function DoctorDashProfile(){
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    return(
        <div className={"profile-container"}>
            <div align={"center"}>
            <img src={"https://media.discordapp.net/attachments/890659328581845002/946504518688989285/woman-smilling-in-red-top-and-red-lipstick-square-e1544061815643.png?width=647&height=616"} alt={"profile"} className={"profilepic"}/>
            </div>
            <br></br>
            <div><p align={"center"}>{loggedInUser.first_name + " " + loggedInUser.last_name}</p></div>
        </div>
    )
}
export default DoctorDashProfile