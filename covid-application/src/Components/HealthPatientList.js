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
        overflow: "auto",
    },
};

const PatientUpdate_URL = "/patientUpdateEndpoint/";
const PatientContactForm_URL = "/patientContactTracing/";


function HealthPatientList() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [test, setTest] = React.useState(false);
    const [contactTracing, setContactTracing] = useState(false);
    const [quarantineStatus, setQuarantine] = useState(false);
    const [patientContactForm, setPatientContactForm] = useState([]);
    const [isFilledContact, setFilledContact] = useState(false);

    // "id": 4,
    //     "covid_contact": true,
    //     "self_isolate": false,
    //     "contact_info_covid": "qwer",
    //     "got_symptoms": true,
    //     "travel": false,
    //     "contact_info_travel": "qwer",
    //     "mask_onboarding": true,
    //     "patient": 1

    const openModal = async (item) => {
        setIsOpen(true);
        setTest(item.current_test_result);


        const patientContact = await axios.get(
            PatientContactForm_URL + item.id + "/",
        ).then(data => data.data);
        console.log(patientContact.length);
        if (patientContact.length !== 0) {

            setPatientContactForm(patientContact);
            console.log(patientContactForm);
            setFilledContact(true);
        } else {
            console.log("empty");
            setFilledContact(false);
        }


    }

    function closeModal() {
        setIsOpen(false);
    }

    function printForm() {

        return (
            <div>
                <b>1.Have you been diagnosed with Covid-19, or had close contact with someone who has been diagnosed
                    with Covid-19,within the past 14 days?
                </b>
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].covid_contact ? "Yes" : "No"}
                </div>
                <br/>
                <b>2.Have you been told by a health official to self-isolate, or been in close contact with someone who
                    has been asked to self-isolate within the past 14days? </b>
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].self_isolate ? "Yes" : "No"}</div>
                <b>if so, Please list the<i> person's name and phone number</i> below : </b>{" "}
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].contact_info_covid}</div>
                <br/>
                <b>3.Are you experiencing fever, dry cough, difficulty breathing, chest pain, or shortness
                    of breath? </b>
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].got_symptoms ? "Yes" : "No"}</div>
                <br/>
                <b>4.Have you travelled, or had close contact with a person who has recently travelled
                    outside of Canada (including the US) with the past 14 days? </b>
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].travel ? "Yes" : "No"}</div>
                <br/>
                <b>if so, Please list the <i>person's name and phone number</i> or the <i>places</i> you
                    have been below : </b>
                <br/>
                <div>{patientContactForm[patientContactForm.length - 1].contact_info_travel}</div>
                <br/>
                <b>5.I agree to wear a mask when boarding, disembarking, when physical distancing is not
                    possible, or when indoors at the public place? </b>
                <br/>
                <div>
                    <div>{patientContactForm[patientContactForm.length - 1].mask_onboarding ? "Yes" : "No"}</div>
                </div>

            </div>


        )

    }

    //set the quarantine function
    const quarantine = async (item) => {
        console.log(item)
        const user_info = item.user_info
        console.log(item.user_info.id)
        let response = await axios.put(
            PatientUpdate_URL,
            JSON.stringify({
                is_quarantine: !item.is_quarantine,
                user_info: user_info.id,
            }),
            {
                headers: {"Content-Type": "application/json"},
                //   withCredentials: true,
            }
        );
        setQuarantine();

        console.log(item.is_quarantine);
        window.location.reload();
    }


    //request contact tracing function
    const contact = async (item) => {
        console.log(item)
        const user_info = item.user_info
        console.log(item.user_info.id)
        let response = await axios.put(
            PatientUpdate_URL,
            JSON.stringify({
                is_contact_tracing: !item.is_contact_tracing,
                user_info: user_info.id,
            }),
            {
                headers: {"Content-Type": "application/json"},
                //   withCredentials: true,
            }
        );
        setContactTracing();

        console.log(item.is_contact_tracing);
        window.location.reload();
    }

    const [patients, setInfo] = useState([]);

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
                                    <td>
                                        <button type="button" className={"patientbutton"} onClick={() => {
                                            quarantine(item).then(r => {
                                            })
                                        }}>{item.is_quarantine ? 'Requested' : 'Request Quarantine'}
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className={"patientbutton"} onClick={() => {
                                            contact(item).then(r => {
                                            })
                                        }}> {item.is_contact_tracing ? 'Requested' : 'Contact Tracing'}
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className={"patientbutton"} onClick={() => {
                                            openModal(item).then(r => {
                                            })
                                        }}>Test Result
                                        </button>
                                    </td>

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
                <div className="GenerateForm">

                    <form>

                        <label>
                            Most recent test results:
                        </label>
                        <br/>
                        {test ? 'Positive' : 'Negative'}

                        <br/>
                        <br/>
                        <label>

                        Contact Tracing form result:
                    </label>
                    <br/>
                    {isFilledContact ? printForm() : "This patient hasn't fill any contact tracing form yet."}


                        <br/>
                        <div className="GenerateForm">
                            <button className="GenerateButton" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                        <br/>


                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default HealthPatientList