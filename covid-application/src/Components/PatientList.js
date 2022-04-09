import React, {Component, useEffect, useRef, useState} from "react";
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {set} from "date-fns";
import Modal from "react-modal";
import {BsFlagFill} from "react-icons/bs"
import {BsFlag} from "react-icons/bs"
import FlagFun from "./FlagFun";
import {de} from "date-fns/locale"
import "./Styles/DoctorDashboard.css";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {setDate} from "date-fns/esm";

const GET_PATIENT_LIST = "/patientListEndpoint/";
const GET_PATIENT_BYID = "/patientByIdEndpoint/";
const PatientFormOriginal_URL = "/patientDailyFormCreateEndpoint/";
const PatientFormUpdated_URL = "/patientDailyFormEndpoint/";
const PatientUpdate_URL = "/patientUpdateEndpoint/";
const PatientHistory_URL = "/patientStatusHistoryEndpoint/";
const CREATE_APPOINTMENT = "/newappointmentEndpoint/";
const PatientStatusHistory_URL = "/patientStatusHistoryByPatientEndpoint/";
const patientlistid = [];
const patientinfoid = [];
const emptyStatus = [];


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        transform: "translate(-50%, -50%)",
        marginBottom: "0%",
        overflow: "hidden",
        minWidth: "20vw",
    },
};

const customStyles2 = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        transform: "translate(-50%, -50%)",
        marginBottom: "0%",
        maxHeight: '300px',
    },
};

const customStyles3 = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        transform: "translate(-50%, -50%)",
        marginBottom: "0%",
        minHeight: '400px',
    },
};

Modal.setAppElement("#root");

function PatientList() {
    const [flag, setFlag] = useState(true);
    const [patientList, setPatientList] = useState([]);
    const [patientInfo, setPatientInfo] = useState([]);
    const [currentpatient, setCurrentPatient] = useState();
    const [patient, setPatient] = useState();
    const loggedInDoctor = JSON.parse(localStorage.getItem("doctor"));
    const doctorid = loggedInDoctor.id;
    const [value, setDateValue] = useState("");
    const [appt_info, setApptInfo] = useState("");
    const [statusHistory, setStatusHistory] = useState([]);
    const [status, setStatus] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = async (patient) => {
        setIsOpen(true);
        setPatient(patient);
        const status = await axios.get(PatientStatusHistory_URL + patient[0].id + "/"
        ).then(data => data.data);
        console.log(status);
        setStatusHistory(status);
        console.log(statusHistory);
    }

    const closeModal = async () => {
        setIsOpen(false);
        setStatusHistory(emptyStatus);
    }

    const [historyModalIsOpen, setHistoryIsOpen] = React.useState(false);

    const openHistoryModal = async (status) => {
        console.log(status.patient_form.body_temp)
        setHistoryIsOpen(true);
        setStatus(status);
        console.log(status);
    }

    const closeHistoryModal = async () => {
        setHistoryIsOpen(false);
        setStatusHistory(emptyStatus);
    }

    const [appointModalIsOpen, setAppointIsOpen] = React.useState(false);
    const [pid, setPid] = React.useState([]);

    const openAppointModal = async (patient) => {
        setAppointIsOpen(true);
        setPid(patient[0].id);
        // console.log(patient);
        console.log(pid);
    }

    const closeAppointModal = async () => {
        setAppointIsOpen(false);
        setStatusHistory(emptyStatus);
    }

    const [updateFormModalIsOpen, setUpdateFormIsOpen] = React.useState(false);

    const openUpdateFormModal = async (patient) => {
        setUpdateFormIsOpen(true);
        setPatient(patient);
    }

    function closeUpdateFormModal() {
        setUpdateFormIsOpen(false);
    }

    const [updatedForm1ModalIsOpen, setUpdatedForm1IsOpen] = React.useState(false);

    const openUpdatedForm1Modal = async (patient) => {
        setUpdatedForm1IsOpen(true);
        setPatient(patient);
    }

    function closeUpdatedForm1Modal() {
        setUpdatedForm1IsOpen(false);
    }

    const [updatedForm2ModalIsOpen, setUpdatedForm2IsOpen] = React.useState(false);

    const openUpdatedForm2Modal = async (patient) => {
        setUpdatedForm2IsOpen(true);
        setPatient(patient);
    }

    function closeUpdatedForm2Modal() {
        setUpdatedForm2IsOpen(false);
    }


    const onload = async () => {

        // Response for the patientList
        const patientList = await axios.get(
            GET_PATIENT_LIST + doctorid + "/",
        ).then(data => data.data);
        setPatientList(patientList);
        //add the patient's patient id to one array
        patientList.map(getPatientId);

        //function to add
        function getPatientId(item) {
            patientlistid.push(item.patient);

        }

        //console.log(patientlistid);
        //get the patient status info by this patient id
        for (var i = 0; i < patientlistid.length; i++) {
            const patientUserInfoId = await axios.get(GET_PATIENT_BYID + patientlistid[i] + "/")
                .then(data => data.data);
            patientUserInfoId[0].isFlag = await axios.get(`/admin_for_frontend/get_priority?id=${patientUserInfoId[0].user_info.id}`)
                .then((data) => data.data.response);
            patientinfoid.push(patientUserInfoId);
        }
        setPatientInfo(patientinfoid);


    };
    useEffect(onload, []);

    // console.log("patientInfo", patientInfo);

    function setPatientTableStyle(obj, array) {
        localStorage.setItem(array[0].user_info.user.email, new Date().getDate())
        var childs = obj.currentTarget.parentElement.parentElement.children;
        for (let index = 0; index < childs.length; index++) {
            const element = childs[index];
            element.style.backgroundColor = "#838383"
        }
    }


    function initPatientColor(obj) {
        if (localStorage.getItem(obj[0].user_info.user.email) == new Date().getDate()) {
            return {"backgroundColor": "#838383"};
        } else {
            return {};
        }
    }

    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";
    const [form, setForm] = useState();


    const updatePatientForm1 = async (patient) => {
        // console.log(patient)
        const user_info = patient[0].user_info
        // console.log(patient[0].user_info)
        let response = await axios.put(
            PatientUpdate_URL,
            JSON.stringify({
                form_number: 1,
                user_info: user_info.id,
            }),
            {
                headers: {"Content-Type": "application/json"},
                //   withCredentials: true,
            }
        );
        setForm();

        // console.log(patient.form_number);
        window.location.reload();
    }

    const updatePatientForm2 = async (patient) => {
        // console.log(patient)
        const user_info = patient[0].user_info
        // console.log(patient[0].user_info)
        let response = await axios.put(
            PatientUpdate_URL,
            JSON.stringify({
                form_number: 2,
                user_info: user_info.id,
            }),
            {
                headers: {"Content-Type": "application/json"},
                //   withCredentials: true,
            }
        );
        setForm();

        // console.log(patient.form_number);
        window.location.reload();
    }

    //MAKE APPOINTMENT VARIABLES//
    const [selected, setSelected] = React.useState();
    const [date_picker_value, setDatePickerValue] = useState(new Date());
    const dateValue = new Date();
    //const min_date= date_picker_value; 
    const step = 30;

    //////////////////////////////
    const createAppointment = async (e) => {
        e.preventDefault();
        // console.log('HEY IM HERE')
        try {
            let response = await axios.post(
                CREATE_APPOINTMENT,
                JSON.stringify({
                    appointment_day_and_time: date_picker_value,
                    short_note: document.getElementById('appt_info').value,
                    doctor: doctorid,
                    patient: pid,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                }
            );
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }


    return (

        <div>
            <h1>Patient List</h1>
            <div className={"patient-container"}>
                <table className={"table"}>
                    <tbody>
                    {patientInfo.filter(s => s[0].isFlag).map((array, index) => {
                        // console.log({ array })
                        return (
                            <tr key={index}>
                                <td id="patient_id"
                                    style={initPatientColor(array)}>{array[0]?.id}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.first_name}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.last_name}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.email}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.phone_number}</td>

                                <td>
                                    <FlagFun patient={array[0].user_info}/>
                                </td>
                                <td style={initPatientColor(array)}>
                                    <button
                                        type="button"
                                        className={"patientbutton"}
                                        onClick={(obj) => {
                                            setPatientTableStyle(obj, array)
                                            openModal(array).then(r => {
                                            });
                                            // console.log("CURRENT PATIENT", currentpatient);
                                        }}>
                                        Check Status History
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                    {patientInfo.filter(s => !s[0].isFlag).map((array, index) => {
                        return (
                            <tr key={index}>
                                <td id="patient_id"
                                    style={initPatientColor(array)}>{array[0]?.id}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.first_name}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.last_name}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.user.email}</td>
                                <td
                                    style={initPatientColor(array)}>{array[0]?.user_info.phone_number}</td>

                                <td>
                                    <FlagFun patient={array[0].user_info}/>
                                </td>
                                <td style={initPatientColor(array)}>
                                    <button
                                        type="button"
                                        className={"patientbutton"}
                                        onClick={(obj) => {
                                            setPatientTableStyle(obj, array)
                                            openModal(array).then(r => {
                                            })
                                        }}>
                                        Check Status History
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}
            >
                <div>

                    {console.log(statusHistory)}
                    <form>
                        <center>Patient's Status History</center>
                        <div className={"scrollComp"}>

                            {statusHistory.map((status, index) => {
                                return (
                                    <ul className={"listStyle"}>

                                        {/**This will display Q's for patient */}

                                        <li>
                                            <button
                                            type="button"
                                            className={"historybutton"}
                                            onClick={() => openHistoryModal(statusHistory[index])}
                                        >
                                            {statusHistory[index].current_date}
                                        </button>
                                    </li>
                                </ul>
                            )

                        })}
                    </div>

                        <br/>
                        <div className="GenerateForm">
                            <button
                                type="button"
                                className={"GenerateButton"}
                                onClick={() => openAppointModal(patient).then(r => {
                                })}
                            >
                                Make Appointment
                            </button>
                        </div>
                        <br/>
                        <div className="GenerateForm">
                            <button
                                type="button"
                                className={"GenerateButton"}
                                onClick={() => {
                                    openUpdateFormModal(patient).then(r => {
                                    })
                                }}
                            >
                                Update Patient's Form
                            </button>
                        </div>
                        <br/>
                        <div className="GenerateForm">
                            <button type="button" className="GenerateButton" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                        <br/>
                        <div className="GenerateForm"></div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={historyModalIsOpen}
                onRequestClose={closeHistoryModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}
            >
                <div className="generateForm">
                    <form>
                        <div>
                            <label>Age:</label>
                            {historyModalIsOpen ? (status.patient_form.age_range === 0 ? "Under 18" : (status.patient_form.age_range === 1 ?
                                "18-35" : (status.patient_form.age_range === 2 ? "36-55" : (status.patient_form.age_range === 3 ? "56-75" : "Over 75")))) : ""}
                        </div>
                        <div>
                            <label>Body Temperature:</label>
                            {historyModalIsOpen ? status.patient_form.body_temp : ""}
                        </div>
                        <div>
                            <label>Comments:</label>
                            {historyModalIsOpen ? status.patient_form.comments : ""}
                        </div>
                        <div>
                            <label>Recent Test Date:</label>
                            {historyModalIsOpen ? (status.patient_form.recent_test_date === 0 ? "yes" : status.patient_form.recent_test_result) : ""}
                        </div>
                        <div>
                            <label>Recent Test Result:</label>
                            {historyModalIsOpen ? (status.patient_form.recent_test_result === undefined ? "No results yet" : status.patient_form.recent_test_result) : ""}
                        </div>
                        <div>
                            <label>Self Assessment Level:</label>
                            {historyModalIsOpen ? status.patient_form.self_assessment : ""}
                        </div>
                        <div>
                            <label>Sex:</label>
                            {historyModalIsOpen ? (status.patient_form.sex === 1 ? "Male" : (status.patient_form.sex === 2 ? "Female" : "Other")) : ""}
                        </div>
                        <div>
                            <label>Symptom:</label>
                            {historyModalIsOpen ? status.patient_form.symptoms : ""}

                        </div>
                        <div>
                            <label>Test Status:</label>
                            {historyModalIsOpen ? (status.patient_form.test_status ? "Tested" : "Didn't test yet") : ""}

                        </div>
                        <div>
                            <label>Test Results:</label>
                            {historyModalIsOpen ? (status.patient_form.test_result ? "Positive" : "Negative") : ""}

                        </div>
                        <div>
                            <label>Numbers of vaccine taken:</label>
                            {historyModalIsOpen ? status.patient_form.vaxination_count : ""}

                        </div>
                        <div>
                            <label>Patient's weight:</label>
                            {historyModalIsOpen ? status.patient_form.weight : ""}

                        </div>
                        <br/>
                        <div className="GenerateForm">
                            <button type="button" className="GenerateButton" onClick={closeHistoryModal}>
                                Close
                            </button>
                        </div>
                        <br/>
                        <div className="GenerateForm"></div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={appointModalIsOpen}
                onRequestClose={closeAppointModal}
                contentLabel="Modal: Form Generator"
                style={customStyles}
            >
                <div className="generatePatientHistory">
                    <form>
                        <div>
                            {/**This will display Q's for patient */}
                            <form>
                                <DateTimePickerComponent
                                    value={selected}
                                    change={e => {
                                        if (e.isInteracted) {
                                            // console.log('e.value', e.value);
                                            setDatePickerValue(prev => e.value);
                                        }
                                    }}
                                    step={step}
                                >
                                </DateTimePickerComponent>
                                <label>
                                    Appointment information:
                                    <input type="text" name="appt_info" id="appt_info"/>
                                </label>

                                <button type="submit" onClick={createAppointment}>Submit</button>
                            </form>
                        </div>
                        <br/>
                        <div className="GenerateForm">
                            <button type="button" className="GenerateButton" onClick={closeAppointModal}>
                                Close
                            </button>
                        </div>
                        <br/>
                        <div className="GenerateForm"></div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={updateFormModalIsOpen}
                onRequestClose={closeUpdateFormModal}
                contentLabel="Modal: Form Selection"
                style={customStyles2}
            >
                <div className="generatePatientHistory">
                    <form>
                        <div>
                            View then select the appropriate form for this patient
                        </div>
                        <br/>
                        <div className="SelectForm">
                            <div className={"GenerateButtonSelect"}>
                                <button
                                    type="button"
                                    className={"GenerateButton"}
                                    onClick={() => {
                                        openUpdatedForm1Modal(patient).then(r => {
                                        })
                                    }}>
                                    View Updated Form
                                </button>
                            </div>
                            &nbsp;
                            <div className={"GenerateButtonSelect"}>
                                <button
                                    type="button"
                                    className={"GenerateButton"}
                                    onClick={() => {
                                        openUpdatedForm2Modal(patient).then(r => {
                                        })
                                    }}>
                                    View Original Form
                                </button>
                            </div>
                            &nbsp;
                            <div className={"GenerateButtonSelect"}>
                                <button className="GenerateButton" onClick={closeUpdateFormModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                        <br/>
                        <div className="GenerateForm"></div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={updatedForm1ModalIsOpen}
                onRequestClose={closeUpdatedForm1Modal}
                contentLabel="Modal: Updated Form"
                style={customStyles2}>

                <div className="patientUpdateForm">
                    {/* {console.log(patient)} */}
                    <h4>The Patient will be asked the following questions.</h4>
                    <div>
                        1. Have you taken a covid test today?
                    </div>
                    <div>
                        2. What was your last covid test result?
                    </div>
                    <div>
                        3. What is your body temperature? (°F)
                    </div>
                    <div>
                        4. How do you feel today? bad(1) - good(5)
                    </div>
                    <div>
                        5. What are your symptoms?
                    </div>
                    <div>
                        6. Comments,concerns or questions you may have for your doctor?
                    </div>
                    <br/>
                    <div className='GenerateForm'>

                        <button
                            type="submit"
                            className={"GenerateButton"}
                            onClick={() => {
                                updatePatientForm2(patient).then(r => {
                                })
                            }}> Select
                        </button>
                        &nbsp;&nbsp;
                        <button type="button" className='GenerateButton' onClick={closeUpdatedForm1Modal}>Close</button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={updatedForm2ModalIsOpen}
                onRequestClose={closeUpdatedForm2Modal}
                contentLabel="Modal: Updated Form"
                style={customStyles3}>

                {/*{console.log(patient)}*/}
                <div className="patientUpdateForm">
                    <h4>The Patient will be asked the following questions.</h4>
                    <div>
                        1. Gender
                    </div>
                    <div>
                        2. What is your age range?
                    </div>
                    <div>
                        3. What is your weight?
                    </div>
                    <div>
                        4. Have you taken a covid test today?
                    </div>
                    <div>
                        5. How many days has it been since you last got tested?
                    </div>
                    <div>
                        6. What was your last covid test result?
                    </div>
                    <div>
                        7. What is your body temperature? (°F)
                    </div>
                    <div>
                        8. How do you feel today? bad(1) - good(5)
                    </div>
                    <div>
                        9. What are your symptoms?
                    </div>
                    <div>
                        10. How many covid vaccine shots have you received?
                    </div>
                    <div>
                        11. Comments,concerns or questions you may have for your doctor?
                    </div>
                    <br/>
                    <div className='GenerateForm'>
                        <button
                            type="submit"
                            className={"GenerateButton"}
                            onClick={() => {
                                updatePatientForm1(patient).then(r => {
                                })
                            }}
                        > Select
                        </button>
                        &nbsp;&nbsp;
                        <button type="button" className='GenerateButton' onClick={closeUpdatedForm2Modal}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PatientList;
