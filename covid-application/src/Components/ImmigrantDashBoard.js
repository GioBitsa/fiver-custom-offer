import React, {Component} from "react";
import './Styles/DoctorDashboard.css';
import PatientList from "./PatientList";
import DoctorDashProfile from "./DoctorDashProfile";
import ImmigrantPatientList from "./ImmigrantPatientList";
import HealthProfile from "./HealthProfile";
import ImmigrantProfile from "./ImmigrantProfile";


function ImmigrantDashboard(){
    return(
        <div className={"containerBoardLeft"}>

            <div className={"containerBoardLeftProfile"}>
                <br/><ImmigrantProfile/>
            </div>
            <div className={"containerBoardLeftList"}>
                <ImmigrantPatientList/>
            </div>

        </div>
    )
}
export default ImmigrantDashboard