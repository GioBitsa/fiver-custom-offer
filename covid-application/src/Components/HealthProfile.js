import React from "react";
import './Styles/DoctorDashboard.css';

function HealthProfile(){
    return(
        <div className={"profile-container"}>
            <div align={"center"}>
            <img src={"https://static01.nyt.com/images/2020/02/25/science/25VIRUS-CDC/25VIRUS-CDC-mediumSquareAt3X.jpg"} alt={"profile"} className={"profilepic2"}/>
            </div>
            <br></br>
            <div><p align={"center"}>Health official Micheal Gate <br></br> </p></div>
            <div><p align={"center"}>This will contain information about <br></br> the health official Micheal such as hobbies</p></div>

        </div>
    )
}
export default HealthProfile