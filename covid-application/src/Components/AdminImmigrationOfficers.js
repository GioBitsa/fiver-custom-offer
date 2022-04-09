import React from "react";
import axios from "./api/axios";
import './Styles/AdminImmigrationOfficers.css';
import { useEffect, useRef, useState } from "react";


function AdminImmigrationOfficers() {
    const [info, setInfo] = useState([]);
    let officers = function () {
        return info.map((item, i) =>
            <div className={"rightDoctor"} key={i}>
                <div className={"content_right_d1"}></div>
                <div>lmmigrant Officer {item.user_info.user.username}</div>
                <div>this will contain information about Linda</div>
            </div>
        )
    }
    useEffect(async () => {
        setInfo((await axios.get("/admin_for_frontend/immigration_officers")).data);
    }, [])
    return (
        <div className={"content-right"}>
            {officers()}
        </div>
    )
}
export default AdminImmigrationOfficers
