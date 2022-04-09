import React, {Component} from "react";
import './Styles/DoctorDashboard.css';
import DoctorDashProfile from "./DoctorDashProfile";
import PatientDashDoctorProfile from "./PatientDashDoctorProfile";

function ContactDoctorDashboard(){
    return(
        <div className={"container1"}>
            <div>
                <br/><PatientDashDoctorProfile/>
            </div>

            <div class="row">
                <div class="titlebarcontactdoctor">
                    <p align={"center"}><h3>Contact your doctor</h3></p>
                </div>

                <div></div>

                <div class="contactDoctorField">
                    <input type="textarea" id="Subject" placeholder="Subject" class="subjecttextbox"></input>

                    <div><br/></div>

                    <input type="textarea" id="Subject of email" placeholder="Subject of email" class="textbox"></input>

                    <div><br/></div>

                    <div class="contactDoctorCenter">
                        <text> Urgent: </text> 
                        <label class="switch">
                            <input type="checkbox"/>
                            <span class="slider round"></span>
                        </label>
                    </div>

                    <div><br/></div>

                    <button class="sendButton"> Send </button>
                </div>                
            </div>
        </div>
    )
}
export default ContactDoctorDashboard