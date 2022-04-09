import React from "react";
import axios from "./api/axios";
import {useEffect, useRef, useState} from "react";


function AdminData() {
    const [info, setInfo] = useState(0);
    useEffect(async () => { 
        setInfo((await axios.get("/admin_for_frontend/people_num_count")).data );
    },[])
    return (
        <div className={"ilblock content-left"}>
                <div className={"content_left_f"}>
                    <div className={"content-left-img"}></div>
                    <div className={"content-left-img-name"}>Linda Roxanne</div>
                    <div className={"content-left-c3"}>Administrator</div>
                    <div className={"content-left-c4"} >this will contain information about Linda</div>
                    <br />
                    <div className={"leftCard"}>
                        <div className={"leftCard_d1"}>Number of Patients:</div>
                        <div className={"leftCard_d2"}>{info.patient}</div>
                    </div>
                    
                    <div className={"leftCard"}>
                        <div className={"leftCard_d1"}>Unread Emails:</div>
                        <div className={"leftCard_d2"}>0</div>
                    </div>
                    
                    <div className={"leftCard"}>
                        <div className={"leftCard_d1"}>Number of Coctors:</div>
                        <div className={"leftCard_d2"}>{info.doctor}</div>
                    </div>
                    
                    <div className={"leftCard"}>
                        <div className={"leftCard_d1"}>Number of Immigrattion Officers:</div>
                        <div className={"leftCard_d2"}>{info.immigrationOfficer}</div>
                    </div>
                </div>
            </div>
    )
    }
export default AdminData




