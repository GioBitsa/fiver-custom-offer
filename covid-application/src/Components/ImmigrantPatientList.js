import React, {useEffect, useState} from "react";
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";
import Modal from "react-modal";
import FlagFun from "./FlagFun";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        transform: "translate(-50%, -50%)",
        marginBottom: "0%",
        overflow: "scroll",
    },
};

function ImmigrantPatientList() {
    const [patients, setInfo] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [test, setTest] = React.useState(false);

    function openModal(item) {
        setIsOpen(true);
        setTest(item.current_test_result);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(async () => {
        setInfo((await axios.get("/admin_for_frontend/patients")).data);
    }, [])
    return (
        <div>
            <h1>Patient List</h1>
            <div className={"patient-container"}>

                <table className={"table"}>
                    <thead>
                    <tr>
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Phone Number</th>
                        <th> Email Address</th>
                    </tr>
                    </thead>
                    <tbody>{
                        patients.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.user_info.user.first_name}</td>
                                    <td>{item.user_info.user.last_name}</td>
                                    <td>{item.user_info.phone_number}</td>
                                    <td>{item.user_info.user.username}</td>
                                    <td><FlagFun patient={item}/></td>
                                    <div className="endOfList">
                                        <td>
                                            <button type="button" className={"patientbutton"} onClick={() => {
                                                openModal(item)
                                            }}>Check Test Result
                                            </button>
                                        </td>
                                    </div>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}
            >
                <div className="generatePatientHistory">

                        <div>
                            Most recent test results: {test? 'Positive':'Negative'}
                        </div>
                        <br/>
                        <div className="GenerateForm">
                            <button className="GenerateButton" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                        <br/>


                </div>
            </Modal>
        </div>
    )
}

export default ImmigrantPatientList