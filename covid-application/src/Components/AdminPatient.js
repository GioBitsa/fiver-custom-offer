import React from "react";
import axios from "./api/axios";
import './Styles/AdminPatient.css';
import { useEffect, useRef, useState } from "react";

function AdminPatients() {
    const [patients, setInfo] = useState([]);
    let patient = function () {
        return patients.map((item, i) =>
            <div className={"contentList"} key={i}>
                <span className={"contentList_sp1"}>{item.user_info.user.username}</span>
                <span className={"contentList_sp2"}>{item.is_prioritized ? '🚩' : ''}</span>
                <span className={"ilblock contentListBtn"}>Check Status</span>
            </div>
        );
    }
    useEffect(async () => {
        setInfo((await axios.get("/admin_for_frontend/patients")).data);
    }, [])
    return (
        <div className="d100">
            <h1 className={"content_center_h1"}>Patient List</h1>
            <br />
            {patient()}
        </div>
    )
}

export default AdminPatients
