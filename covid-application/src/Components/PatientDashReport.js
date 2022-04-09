import React from "react";
import './Styles/DoctorDashboard.css';


function DoctorDashReport(){

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    return (
        <div class="container2">
                <div class="row">
                    <div class="titlebar">
                        <p align={"center"}><h5>How are you today,</h5></p>
                        <p align={"center"}><h3>{loggedInUser.first_name + " " + loggedInUser.last_name}</h3></p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="square-patient-2">
                      <div className={"profile-container-patientpage"}>
                          <img src={"https://riseandshine.childrensnational.org/wp-content/uploads/2019/10/doctor-filling-out-medical-form-feature.jpg"} alt={"doctor_patient"} className={"picture-patientpage"}/>
                          <br></br>
                          <div><p align={"center"}>Covid Form</p></div>
                          <br></br>
                          <div><p align={"center"}>Click the button below to fill out a form</p>

                          </div>
                          <div><a href="UpdatedCovidForm"><button type="button" className={"patientbuttondash"}>Click here!</button></a></div>

                      </div>                        
                    </div>



                    <div class="square-patient-2">
                      <div className={"profile-container-patientpage"}>
                          <img src={"https://www.verywellhealth.com/thmb/Krbuqh1a8jbCcqJw73CRpoZCFLY=/2123x1415/filters:no_upscale():max_bytes(150000):strip_icc()/171631860-56aae7f53df78cf772b4a4cb.jpg"} alt={"doctor_patient"} className={"picture-patientpage"}/>
                          <br></br>
                          <div><p align={"center"}>Chat with your doctor</p></div>
                          <br></br>
                          <div><p align={"center"}>Click the button below to talk to an available doctor</p></div>
                          <div><a href="chat_app"><button type="button" className={"patientbuttondash"}>Click here!</button></a></div>
                      </div>                        
                    </div>
                </div>
        </div>
    )
}
export default DoctorDashReport