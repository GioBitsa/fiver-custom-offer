import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import DoctorStatusForm from "./DoctorStatusForm";
import './Styles/DoctorDashboard.css';
import axios from "./api/axios";
import FlagFun from "./FlagFun";

const GET_NEW_PATIENT_LIST = "/newPatientListEndpoint/";
const GET_PATIENT_BYID = "/patientByIdEndpoint/";
const PatientUpdate_URL = "/patientUpdateEndpoint/";
const PatientIsNotNew = "/patientListUpdateEndpoint/"

const newpatientlistid = [];
const newpatientinfoid = [];

const customStyles1 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    maxHeight: '400px',
  },
};

Modal.setAppElement('#root');

function NewPatientList() {

    const [patient, setPatient] = useState();
    const [form, setForm] = useState();

    const [modalIsOpen1, setIsOpen1] = React.useState(false);

    {/** Will open new patient form */}
     const openModal1 = async(patient) => {
       setIsOpen1(true);
       setPatient(patient);
     }

    {/** Will close new patient form */}
     function closeModal1() {
       setIsOpen1(false);
    }

    const [newPatientList, setNewPatientList] = useState([]);
    const [newPatientInfo, setNewPatientInfo] = useState([]);

    const loggedInDoctor = JSON.parse(localStorage.getItem("doctor"));
    const doctorid = loggedInDoctor.id;

    const onload = async () => {

        //get new patient list
        const newPatientList = await axios.get(
            GET_NEW_PATIENT_LIST + doctorid + "/",
        ).then(data => data.data);
        setNewPatientList(newPatientList);
        //add the patient's patient id to one array
        newPatientList.map(getNewPatientId);

        //function to add
        function getNewPatientId(item) {
            newpatientlistid.push(item.patient);

        }

        // console.log(newpatientlistid);
        //get the patient status info by this patient id
        for (var i = 0; i < newpatientlistid.length; i++) {
            const newPatientUserInfoId = await axios.get(
                GET_PATIENT_BYID + newpatientlistid[i] + "/",).then(data => data.data);
            newpatientinfoid.push(newPatientUserInfoId);
        }
        // console.log(newpatientinfoid);
        setNewPatientInfo(newpatientinfoid);

        // console.log(newPatientInfo);

    };
    useEffect(onload, []);
    
    const updatePatientForm = async (patient) => {
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

        const AddToPatientList = await axios.put(
            PatientIsNotNew,
            JSON.stringify({
                is_new: false,
                patient:patient[0].id,
                doctor: doctorid,
            }),
            {
                headers: {"Content-Type": "application/json"},
                //   withCredentials: true,
            }
        );

        // console.log(AddToPatientList)
        

        window.location.reload();
    }

    return (
        <div>
            <h1>New Patient List</h1>
            <div className={"patient-container"}>

                <table className={"table"}>
                     <tbody>
                    {newPatientInfo.map((array, index) => {

                        return (
                            <tr key={index}>
                                <td>{array[0]?.user_info.user.first_name}</td>
                                <td>{array[0]?.user_info.user.last_name}</td>
                                <td>{array[0]?.user_info.user.email}</td>
                                <td>{array[0]?.user_info.phone_number}</td>
                                <td>{array[0]?.user_info.phone_number}</td>
                                <td>
                                    <div className='GenerateForm'>
                                    <button 
                                        className='GenerateButton'
                                        onClick={(obj) => {
                                            openModal1(array).then(r =>{
                                            })
                                        }}>
                                            Create Patient Profile</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
            
            <Modal
              isOpen={modalIsOpen1}
              onRequestClose={closeModal1}
              contentLabel="Modal: Form Generator"
              style={customStyles1}>
                
              <div className="generatePatientForm">
                  {/*{console.log(patient)}*/}
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
                className='GenerateButton' 
                onClick={()=>{updatePatientForm(patient).then(r =>{})}}>
                    Generate Form
              </button>
              &nbsp;&nbsp;
              <button className='GenerateButton' onClick={closeModal1}>Close</button>
              </div>
              </div>
            </Modal>
        </div>
    )

}

export default NewPatientList;