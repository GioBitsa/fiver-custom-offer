import "./Styles/CovidForm.css";
import React, {Component, useEffect, useRef, useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "./api/axios";

const PatientForm_URL = "/patientDailyFormCreateEndpoint/";
const PatientHistory_URL = "/patientStatusHistoryCreateEndpoint/";
const PatientUpdate_URL = "/patientUpdateEndpoint/";
const PatientTodayForm_URL = "/lastPatientStatusHistoryByPatientEndpoint/";
const PatientUpdateForm_URL = "/patientDailyFormUpdateEndpoint/";

function UpdatedCovidForm() {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    //states for different states of the system
    const [userFocus, setUserFocus] = useState(false);


    const [testStatus, setTestStatus] = useState();
    const [testResult, setTestResult] = useState();
    const [selfAssessment, setSelfAssessment] = useState();
    const [bodyTemperature, setBodyTemperature] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [patientComments, setPatientComments] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [existForm, setExist] = useState(false);
    const [currentForm, setToday] = useState([]);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [
        bodyTemperature,
        symptoms,
        patientComments,
        testResult,
        testStatus,
        selfAssessment,
    ]);
    const onload = async () => {
        //check the form date
        const patient = JSON.parse(localStorage.getItem("patient"));
        const patientId = patient.id;
        const todayForm = await axios.get(PatientTodayForm_URL + patientId + "/",
        ).then(data => data.data);
        console.log(todayForm.id);

        if (todayForm.id == null) {
            setExist(false);

        } else {
            setExist(true);
            setToday(todayForm);
        }


    }
    console.log(existForm ? 'Yes' : 'No');
    useEffect(onload, []);
    console.log(currentForm.patient_form);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.put(
                PatientUpdateForm_URL + currentForm.patient_form.id + "/",
                JSON.stringify({
                    test_result: testResult,
                    test_status: testStatus,
                    body_temp: bodyTemperature,
                    self_assessment: selfAssessment,
                    symptoms: symptoms,
                    comments: patientComments,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );

            // Update the patient in Patient table
            const user_info = JSON.parse(localStorage.getItem("user_info"))
            console.log(user_info.id)
            response = await axios.put(
                PatientUpdate_URL,
                JSON.stringify({
                    current_test_status: testStatus,
                    current_test_result: testResult,
                    current_body_temp: bodyTemperature,
                    current_self_assessment: selfAssessment,
                    current_symptoms: symptoms,
                    user_info: user_info.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );
            setSuccess(true);
            setTestStatus();
            setTestResult();
            setSelfAssessment();
            setBodyTemperature("");
            setSymptoms("");
            setErrMsg("");
            setSuccess(false);

            navigate(from, {replace: true});

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Error");

        try {
            // Fill out form and store it in patient Daily form table
            let response = await axios.post(
                PatientForm_URL,
                JSON.stringify({
                    test_result: testResult,
                    test_status: testStatus,
                    body_temp: bodyTemperature,
                    self_assessment: selfAssessment,
                    symptoms: symptoms,
                    comments: patientComments,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );

            console.log(response?.data);

            const patient_form = response?.data
            const patient = JSON.parse(localStorage.getItem("patient"))
            console.log(patient.id)

            // Store Form in Patient History table
            response = await axios.post(
                PatientHistory_URL,
                JSON.stringify({
                    patient: patient.id,
                    patient_form: patient_form.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );

            // Update the patient in Patient table
            const user_info = JSON.parse(localStorage.getItem("user_info"))
            console.log(user_info.id)
            response = await axios.put(
                PatientUpdate_URL,
                JSON.stringify({
                    current_test_status: testStatus,
                    current_test_result: testResult,
                    current_body_temp: bodyTemperature,
                    current_self_assessment: selfAssessment,
                    current_symptoms: symptoms,
                    user_info: user_info.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response));
            setSuccess(true);
            setTestStatus();
            setTestResult();
            setSelfAssessment();
            setBodyTemperature("");
            setSymptoms("");
            setErrMsg("");
            setSuccess(false);

            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="formContainer">
            <center>
                <h1>
                    <b>Covid Daily Report</b>
                </h1>
            </center>
            <div className="container">
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive">
                    {errMsg}
                </p>
                <form onSubmit={existForm ? handleUpdate : handleSubmit}>
                    <label>
                        <b>1. Have you taken a covid test today? </b>{" "}
                    </label>
                    <input type="radio" id="yes" name="istested" onChange={(e) => setTestStatus(e.target.value)}
                           value="True"/>
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" id="no" name="istested" onChange={(e) => setTestStatus(e.target.value)}
                           value="False"/>
                    <label htmlFor="no">No</label>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>2. What was your last covid test result? </b>{" "}
                    </label>
                    <input type="radio" id="positive" name="preTestResult"
                           onChange={(e) => setTestResult(e.target.value)} value="True"/>
                    <label htmlFor="other">Positive</label>
                    <input type="radio" id="negative" name="preTestResult"
                           onChange={(e) => setTestResult(e.target.value)} value="False"/>
                    <label htmlFor="other">Negative</label>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>3. What is your body temperature ? (°F) </b>
                        <input
                            id="dailyTemperature"
                            name="dailyTemperature"
                            type="text"
                            style={{width: "100px"}}
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setBodyTemperature(e.target.value)}
                            value={bodyTemperature}
                            required
                        />
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>4. How do you feel today ? </b> bad(1) - good(5){" "}
                    </label>
                    <br/>
                    <br/>
                    <ul className="likert">
                        <li>
                            <input type="radio" name="likert" id="Very_Bad"
                                   onChange={(e) => setSelfAssessment(e.target.value)} value="0"/>
                            <label>
                                <b>1</b>
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="likert" id="Bad"
                                   onChange={(e) => setSelfAssessment(e.target.value)} value="1"/>
                            <label>
                                <b>2</b>
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="likert" id="Ok"
                                   onChange={(e) => setSelfAssessment(e.target.value)} value="2"/>
                            <label>
                                <b>3</b>
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="likert" id="Good"
                                   onChange={(e) => setSelfAssessment(e.target.value)} value="3"/>
                            <label>
                                <b>4</b>
                            </label>
                        </li>
                        <li>
                            <input type="radio" name="likert" id="Very_Good"
                                   onChange={(e) => setSelfAssessment(e.target.value)} value="4"/>
                            <label>
                                <b>5</b>
                            </label>
                        </li>
                    </ul>
                    <label>
                        <b>5. What are your symptoms ? </b>{" "}
                    </label>
                    <br/>
                    <textarea
                        id="symptomsBox"
                        name="symptomsBox"
                        rows="3"
                        cols="100"
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setSymptoms(e.target.value)}
                        value={symptoms}
                        required
                    />
                    <br/>
                    <br/>
                    <label>
                        <b>
                            6. Comments,concerns or questions you may have for your doctor ?{" "}
                        </b>
                    </label>
                    <br/>
                    <textarea id="commentBox" name="commentBox" rows="4" cols="100"
                              autoComplete="off"
                              ref={userRef}
                              onChange={(e) => setPatientComments(e.target.value)}
                              value={patientComments}
                              required/>
                    <br/>
                    <br/>
                    <center>
                        <button type="submit" className="covidFormbtn">
                            {existForm ? "Update" : "Submit"}
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default UpdatedCovidForm;
