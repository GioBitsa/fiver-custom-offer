import React from "react";
import './Styles/DoctorDashboard.css';

function DoctorDashData(){
    return(
        <div className="container3">
            <br/>
            <div className={"data-block"}>
                <p align={"center"}>Number of Patients:</p>
                <p align={"center"}>27</p>
            </div>
            <br/>
            <div className={"data-block"}>
                <p align={"center"}>New Patients:</p>
                <p align={"center"}>2</p>
            </div>
            <br/>
            <div className={"data-block"}>
                <p align={"center"}>Critical Patients:</p>
                <p align={"center"}>2</p>
            </div>

        </div>
    )
}

export default DoctorDashData;