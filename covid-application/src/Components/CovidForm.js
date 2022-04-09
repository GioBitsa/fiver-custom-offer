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

function CovidForm() {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    //states for different states of the system
    const [userFocus, setUserFocus] = useState(false);

    const [sex, setSex] = useState();
    const [ageRange, setAgeRange] = useState();
    const [testStatus, setTestStatus] = useState();
    const [testResult, setTestResult] = useState();
    const [selfAssessment, setSelfAssessment] = useState();
    const [weight, setPatientWeight] = useState("");
    const [recent_test_date, setRecent_test_date] = useState();
    const [bodyTemperature, setBodyTemperature] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [vaccineShots, setVaccineShots] = useState();
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
        weight,
        recent_test_date,
        bodyTemperature,
        symptoms,
        vaccineShots,
        patientComments,
        sex,
        ageRange,
        testStatus,
        testResult,
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
            //please don't delete this
            let response = await axios.put(
                PatientUpdateForm_URL + currentForm.patient_form.id + "/",
                JSON.stringify({
                    sex: sex,
                    age_range: ageRange,
                    test_status: testStatus,
                    recent_test_date: recent_test_date,
                    test_result: testResult,
                    body_temp: bodyTemperature,
                    weight: weight,
                    self_assessment: selfAssessment,
                    symptoms: symptoms,
                    vaxination_count: vaccineShots,
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
                    current_sex: sex,
                    current_age_range: ageRange,
                    current_test_status: testStatus,
                    recent_test_date: recent_test_date,
                    current_test_result: testResult,
                    current_body_temp: bodyTemperature,
                    current_weight: weight,
                    current_self_assessment: selfAssessment,
                    current_symptoms: symptoms,
                    current_vaxination_count: vaccineShots,
                    user_info: user_info.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );

            setSuccess(true);
            setSex();
            setAgeRange();
            setTestStatus();
            setTestResult();
            setSelfAssessment();
            setPatientWeight("");
            setRecent_test_date();
            setBodyTemperature("");
            setSymptoms("");
            setVaccineShots();
            setPatientComments("");
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
                    sex: sex,
                    age_range: ageRange,
                    test_status: testStatus,
                    recent_test_date: recent_test_date,
                    test_result: testResult,
                    body_temp: bodyTemperature,
                    weight: weight,
                    self_assessment: selfAssessment,
                    symptoms: symptoms,
                    vaxination_count: vaccineShots,
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
                    current_sex: sex,
                    current_age_range: ageRange,
                    current_test_status: testStatus,
                    recent_test_date: recent_test_date,
                    current_test_result: testResult,
                    current_body_temp: bodyTemperature,
                    current_weight: weight,
                    current_self_assessment: selfAssessment,
                    current_symptoms: symptoms,
                    current_vaxination_count: vaccineShots,
                    user_info: user_info.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );
            setSuccess(true);
            setSex();
            setAgeRange();
            setTestStatus();
            setTestResult();
            setSelfAssessment();
            setPatientWeight("");
            setRecent_test_date();
            setBodyTemperature("");
            setSymptoms("");
            setVaccineShots();
            setPatientComments("");
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
                    <b>New Patient Profile Report</b>
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
                        <b>1. Gender: </b>
                    </label>
                    <input type="radio" id="male" name="gender" onChange={(e) => setSex(e.target.value)} value="0"/>
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" onChange={(e) => setSex(e.target.value)} value="1"/>
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="other" name="gender" onChange={(e) => setSex(e.target.value)} value="2"/>
                    <label htmlFor="other">Other</label>


                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>2. What is your age range ? </b>
                    </label>
                    <br/>
                    <select
                        id="ageRange"
                        ref={userRef}
                        onChange={(e) => setAgeRange(e.target.value)}
                    >
                        <option value="default" selected disabled>
                            - Select Age Range -
                        </option>
                        <option value="0">Under 18</option>
                        <option value="1">18 - 35</option>
                        <option value="2">36 - 55</option>
                        <option value="3">56 - 75</option>
                        <option value="4">Over 75</option>
                    </select>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>3. What is your weight?</b>
                    </label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        style={{width: "100px"}}
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setPatientWeight(e.target.value)}
                        value={weight}
                        required
                    />
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>4. Have you taken a covid test today? </b>{" "}
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
                        <b>5. How many days has it been since you last got tested ? </b>
                        <input
                            name="recent_test_date"
                            type="number"
                            autoComplete="off"
                            ref={userRef}
                            onChange={(e) => setRecent_test_date(e.target.value)}
                            value={recent_test_date}
                            required
                        />
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>6. What was your last covid test result? </b>{" "}
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
                        <b>7. What is your body temperature ? (°F) </b>
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
                        <b>8. How do you feel today ? </b> bad(1) - good(5){" "}
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
                        <b>9. What are your symptoms ? </b>{" "}
                    </label>
                    <br/>
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
                        <b>10. How many covid vaccine shots have you received ? </b>
                        <input name="numOfShots" type="number" onChange={(e) => setVaccineShots(e.target.value)}
                               value={vaccineShots}/>
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <b>
                            11. Comments,concerns or questions you may have for your doctor ?{" "}
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

export default CovidForm;

