import React, {Component, useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";
import AppointmentTime from "./AppointmentTime";


const GET_APPOINTMENTS_BY_DR = "/appointmentsByDoctorEndpoint/"
const GET_PATIENT_BY_ID = "/patientByIdEndpoint/"
const pName = [];
const pLName = [];

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [patientnames, setPatientName] = useState([]);
    const [patientL, setPatientL] = useState([]);
    const loggedInDoctor = JSON.parse(localStorage.getItem("doctor"));
    const doctorid = loggedInDoctor.id;

    const onload = async () => {

        const appointments = await axios.get(
            GET_APPOINTMENTS_BY_DR + doctorid + "/",
        ).then(data => data.data);
        setAppointments(appointments);
        console.log(appointments);

        for (var i = 0; i < appointments.length; i++) {
            const patientN = await axios.get(
                GET_PATIENT_BY_ID + appointments[i].patient + "/",
            ).then(data => data.data);
            console.log(patientN[0].user_info.user.first_name);
            console.log(patientN[0].user_info.user.last_name);
            pName.push(patientN[0].user_info.user.first_name);
            pLName.push(patientN[0].user_info.user.last_name);
        }
        setPatientName(pName);
        setPatientL(pLName);
        console.log(patientnames);
    }
    useEffect(onload, []);


    return (
        <div>
            <h1>Upcoming appointments</h1>
            <div className={"patient-container"}>
                <table className={"table"}>
                    <thread>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Time</th>
                            <th>Notes</th>
                        </tr>
                    </thread>
                    <tbody>
                    {appointments.map((dict, index) => {
                        return (

                            <tr key={dict}>

                                <td>{patientnames[index]}</td>
                                <td>{patientL[index]}</td>
                                <td>{dict.appointment_day_and_time}</td>
                                <td>{dict.short_note}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Appointment;