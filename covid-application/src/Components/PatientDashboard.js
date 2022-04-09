import React, {Component} from "react";
import './Styles/DoctorDashboard.css';
import PatientMenu from "./PatientMenu";
import PatientDashProfile from "./PatientDashProfile";
import DoctorDashData from "./DoctorDashData";
import PatientDashReport from "./PatientDashReport";
import DoctorDashProfile from "./DoctorDashProfile";
import PatientDashDoctorProfile from "./PatientDashDoctorProfile";

function DoctorDashboard(){
    return(
        <div className={"container1"}>
            <div>
                <br/><PatientDashProfile/>
                <br/>
                <div><PatientDashDoctorProfile/></div><br/>
            </div>
			
			<div>
                <br/><PatientDashReport/>
            </div>
           
            <div>
                <PatientMenu/>
            </div>


        </div>
    )
}
export default DoctorDashboard