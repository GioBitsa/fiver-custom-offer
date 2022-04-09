import React, {Component} from "react";
import './Styles/DoctorDashboard.css';
import PatientList from "./PatientList";
import DoctorDashProfile from "./DoctorDashProfile";
import HealthPatientList from "./HealthPatientList";
import DoctorDashData from "./DoctorDashData";
import HealthProfile from "./HealthProfile";


function HealthDashboard(){
    return(
        <div className={"containerBoardLeft"}>

            <div className={"containerBoardLeftProfile"}>
                <br/><HealthProfile/>

            </div>
            <div className={"containerBoardLeftList"}>
                <HealthPatientList/>
            </div>


        </div>
    )
}
export default HealthDashboard