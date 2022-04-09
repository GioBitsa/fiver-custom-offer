import React from "react";
import axios from "./api/axios";
import {useEffect, useRef, useState} from "react";


function AdminDoctors() {
    const [doctors, setInfo] = useState([]);
    const [no_patients, setNoPatients] = useState([]);
    console.log(doctors);
    doctors.forEach(doctor =>
        no_patients.forEach(patient =>{
                if (patient['doctor__user_info_id'] == doctor.user_info.id) 
                    doctor['no_patients'] = patient.no_patients;
                }
            )
        );
    console.log(no_patients);
    console.log(doctors);
    let doctor = function () {
        return doctors.map((item, i) =>
            <tr key={i}>
                <td><img src="./use1.png" alt="" /></td>
                <td>{item.user_info.user.first_name}</td>
                <td>{item.no_patients}</td>
                <td>{item.profession}</td>
                <td>{item.user_info.user.email}</td>
            </tr>
        )
    }
    useEffect(async () => { 
        setInfo((await axios.get("/admin_for_frontend/doctors")).data );
        setNoPatients((await axios.get("/admin_for_frontend/patients_by_doctor")).data );
    },[])
    return (
        <div className="d100">
            <h1 className={"content_center_h1"}>Doctor List</h1>
            <br />
            <table className={"doctorTable"}>
                <thead> 
                    <tr>
                        <th>Profile Pic</th>
                        <th>Doctor Name</th>
                        <th>Number of Patients</th>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {doctor()}
                </tbody>
            </table>
        </div>
    )
 }
export default AdminDoctors
 