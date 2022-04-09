import React, {useEffect, useState} from "react";
import './Styles/DoctorDashboard.css';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Bar
} from "recharts";
import axios from "./api/axios";

const GET_PATIENT_BYID = "/patientByIdEndpoint/";
const PatientTodayForm_URL = "/lastPatientStatusHistoryByPatientEndpoint/";
const PatientAppointment_URL = "/appointmentsByPatientEndpoint/"

function PatientMenu() {
    const patient = JSON.parse(localStorage.getItem("patient"));
    const patientid = patient.id;

    const [existForm, setExist] = useState(false);
    const [currentForm, setToday] = useState([]);
    const [existAppointment, setExistAppointment] = useState(false);
    const [appointment, setAppointment] = useState([]);
    const [time, setTime] = useState("");

    const onload = async () => {
        const todayForm = await axios.get(PatientTodayForm_URL + patientid + "/",
        ).then(data => data.data);
        if (todayForm.id == null) {
            setExist(false);

        } else {
            setExist(true);
            setToday(todayForm);
        }

        const appoint = await axios.get(PatientAppointment_URL + patientid + "/",
        ).then(data => data.data);
        console.log(appoint);
        if (appoint[0].id === null) {
            setExistAppointment(false);
        } else {
            setExistAppointment(true);
            setAppointment(appoint[0]);
            console.log(appoint[0]);
            console.log(appointment.appointment_day_and_time);
            setTime(appoint[0].appointment_day_and_time);


        }


    }

    console.log(existForm ? 'Yes' : 'No');
    useEffect(onload, []);
    console.log(currentForm.patient_form);


    console.log(patient);
    const dataBarchart = [
        {
            "name": "1",
            "Temperature": 35
        },
        {
            "name": "2",
            "Temperature": 37
        },
        {
            "name": "3",
            "Temperature": 38
        },
        {
            "name": "4",
            "Temperature": 38
        },
        {
            "name": "5",
            "Temperature": 40
        },
        {
            "name": "6",
            "Temperature": 37
        },
        {
            "name": "7",
            "Temperature": 38
        },
        {
            "name": "8",
            "Temperature": 39
        },
        {
            "name": "9",
            "Temperature": 37
        },
        {
            "name": "10",
            "Temperature": 36
        }
    ]

    return (
        <div class="container1">
            <div>

                <div class="row">
                    <div class="square-graphs-right">
                        <h5>Body Temperature</h5>
                        <ResponsiveContainer width="90%" height="90%">
                            <BarChart width={730} height={250} data={dataBarchart}>
                                <CartesianGrid strokeDasharray="3 5"/>
                                <YAxis domain={[34, 40]}/>
                                <Tooltip/>
                                <Bar dataKey="Temperature" fill="#82ca9d"/>
                            </BarChart>

                        </ResponsiveContainer>
                    </div>

                </div>

                <br/>

                <div class="row">
                    <div class="patient-menu-right-1">
                        <p align={"middle"}><h3>01</h3></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>{existForm ? "You already fill the status form today, great!" : "You haven't filled your status form today yet"}</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="patient-menu-right-1">
                        <p align={"middle"}><h2>02</h2></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>{patient.is_quarantine ? "You are under a period of quarantine, please stay at home and be safe." : "You are not under quarantine, remember to keep social distance"}</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="patient-menu-right-1">
                        <p align={"middle"}><h2>03</h2></p>
                    </div>
                    <div class="patient-menu-right-2">
                        <h5>{patient.is_contact_tracing ? "Please fill the contact tracing form!" : "You don't need to report contact tracing"}</h5>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="patient-menu-right-1">
                        <p align={"middle"}><h2>04</h2></p>
                    </div>
                    <div className="patient-menu-right-2">
                        <h5>{existAppointment ? "Your following appointment at:" + " " + time : "You don't have any appointment"}</h5>
                        {console.log(time)}
                    </div>
                </div>
                <br/>

            </div>
        </div>
    )
}

export default PatientMenu