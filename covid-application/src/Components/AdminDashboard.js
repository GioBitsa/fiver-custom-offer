import React, { Component } from "react";
import './Styles/AdminDashboard.css';
import AdminInfo from "./AdminData";
import AdminDoctor from "./AdminDoctor";
import AdminPatient from "./AdminPatient";
import AdminImmigrationOfficers from "./AdminImmigrationOfficers";

function AdminDashboard() {
    return (
        <div>
            <div className={"barTwo"}>
                <span className={"ilblock"}>Administrator XXX's AdministratorDashboard</span>
            </div>
            <div className={"content"}>
                <AdminInfo />
                <div className={"content-center"}>
                    <AdminPatient />
                    <AdminDoctor />
                </div>
                <AdminImmigrationOfficers />
            </div>
        </div>

    )
}
export default AdminDashboard