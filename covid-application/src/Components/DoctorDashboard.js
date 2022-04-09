import React, {Component} from "react";
import './Styles/DoctorDashboard.css';
import PatientList from "./PatientList";
import NewPatientList from "./NewPatientList";
import DoctorDashProfile from "./DoctorDashProfile";
import DoctorDashData from "./DoctorDashData";
import DoctorDashReport from "./DoctorDashReport";
import Appointment from "./Appointment";


function DoctorDashboard(){
    return(
        <div className={"container1"}>
            <div>
                <br/><DoctorDashProfile/>
                <div><DoctorDashData/></div><br/>
            </div>
			
			<div>
                <br/><DoctorDashReport/>
            </div>
           
            <div>
                <Appointment/>
                <NewPatientList/>
                <PatientList/>
            </div>

        </div>
    )
}
export default DoctorDashboard