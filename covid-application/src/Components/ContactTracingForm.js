import "./Styles/CovidForm.css";
import React, {Component, useEffect, useRef, useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "./api/axios";

const PatientContactTracing_URL = "/patientContactTracingCreateEndpoint/";


function ContactTracingForm() {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    //states for different states of the system
    const [userFocus, setUserFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const [covid_contact, setCovid_contact] = useState();
    const [self_isolate, setSelf_isolate] = useState();
    const [contact_info_covid, setContact_info_covid] = useState("");
    const [got_symptoms, setGot_symptoms] = useState();
    const [travel, setTravel] = useState();
    const [contact_info_travel, setContact_info_travel] = useState("");
    const [mask_onboarding, setMask_onboarding] = useState();


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [
        covid_contact,
        self_isolate,
        contact_info_covid,
        got_symptoms,
        travel,
        contact_info_travel,
        mask_onboarding,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patient = JSON.parse(localStorage.getItem("patient"))
        // console.log("Error");

        try {
            // Fill out form and store it in patient Daily form table
            let response = await axios.post(
                PatientContactTracing_URL,
                JSON.stringify({
                    covid_contact: covid_contact,
                    self_isolate: self_isolate,
                    contact_info_covid: contact_info_covid,
                    got_symptoms: got_symptoms,
                    travel: travel,
                    contact_info_travel: contact_info_travel,
                    mask_onboarding: mask_onboarding,
                    patient: patient.id,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );

            console.log(response?.data);

            setCovid_contact();
            setSelf_isolate();
            setContact_info_covid("");
            setGot_symptoms();
            setTravel();
            setContact_info_travel("");
            setMask_onboarding();


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
                    <b>Contact Tracing Form</b>
                </h1>
            </center>
            <div className="container">
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive">
                    {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="ctFormContainer">
                        <label>
                            <b>1.Have you been diagnosed with Covid-19, or had close contact with someone who has been
                                diagnosed with Covid-19,within the past 14 days? </b>
                        </label>
                        <br/>
                        <br/>
                        <input type="radio" name="Diagnosed" value="True"
                               onChange={(e) => setCovid_contact(e.target.value)}/> {/*onChange={(e) => setSex(e.target.value)}*/}
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" name="Diagnosed" value="False"
                               onChange={(e) => setCovid_contact(e.target.value)}/>
                        <label htmlFor="No">No</label>

                        <br/>
                        <br/>
                        <label>
                            <b>2.Have you been told by a health official to self-isolate, or been in close contact with
                                someone who has been asked to self-isolate within the past 14days? </b>
                        </label>
                        <br/>
                        <input type="radio" name="selfIsolate" value="True"
                               onChange={(e) => setSelf_isolate(e.target.value)}/>
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" name="selfIsolate" value="False"
                               onChange={(e) => setSelf_isolate(e.target.value)}/>
                        <label htmlFor="No">No</label>
                        <br/>
                        <br/>
                        <label>
                            <b>if so, Please list the<i> person's name and phone number</i> below : </b>{" "}
                        </label>
                        <br/>
                        <br/>
                        <textarea
                            name="ContactSelfIsolate"
                            rows="3"
                            cols="100"
                            autoComplete="off"
                            ref={userRef}
                            value={contact_info_covid}
                            onChange={(e) => setContact_info_covid(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <label>
                            <b>3.Are you experiencing fever, dry cough, difficulty breathing, chest pain, or shortness
                                of breath? </b>
                        </label>
                        <br/>
                        <br/>
                        <input type="radio" name="HaveSymptoms" value="True"
                               onChange={(e) => setGot_symptoms(e.target.value)}/>
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" name="HaveSymptoms" value="False"
                               onChange={(e) => setGot_symptoms(e.target.value)}/>
                        <label htmlFor="No">No</label>
                        <br/>
                        <br/>
                        <br/>
                        <label>
                            <b>4.Have you travelled, or had close contact with a person who has recently travelled
                                outside of Canada (including the US) with the past 14 days? </b>
                        </label>
                        <br/>
                        <br/>
                        <input type="radio" name="travelled" value="True" onChange={(e) => setTravel(e.target.value)}/>
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" name="travelled" value="False" onChange={(e) => setTravel(e.target.value)}/>
                        <label htmlFor="No">No</label>
                        <br/>
                        <br/>
                        <label>
                            <b>if so, Please list the <i>person's name and phone number</i> or the <i>places</i> you
                                have been below : </b> {" "}
                        </label>
                        <br/>
                        <br/>
                        <textarea
                            name="ContactTravelled"
                            rows="3"
                            cols="100"
                            autoComplete="off"
                            ref={userRef}
                            value={contact_info_travel}
                            onChange={(e) => setContact_info_travel(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <label>
                            <b>5.I agree to wear a mask when boarding, disembarking, when physical distancing is not
                                possible, or when indoors at the public place? </b>
                        </label>
                        <br/>
                        <br/>
                        <input type="radio" name="wearMask" value="True"
                               onChange={(e) => setMask_onboarding(e.target.value)}
                        />
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" name="wearMask" value="False"
                               onChange={(e) => setMask_onboarding(e.target.value)}/>
                        <label htmlFor="No">No</label>
                        <br/>
                        <br/>
                        <br/>

                        <input type="checkbox" required/>
                        <label> I affirm the accuracy of my statements on this form. </label>
                        <br/>
                        <br/>
                        <br/>

                        <center>
                            <button type="submit" className="covidFormbtn">
                                Submit
                            </button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactTracingForm;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<CovidForm />, rootElement);
