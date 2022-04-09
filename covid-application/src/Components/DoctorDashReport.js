import React from "react";
import './Styles/DoctorDashboard.css';
import {useEffect, useRef, useState} from "react";
import axios from "./api/axios";
import {
    ResponsiveContainer,
    BarChart,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    PieChart,
    Pie, 
    LineChart, 
    Line
} from "recharts";

const GET_PATIENT_LIST = "/patientListEndpoint/"
const GET_PATIENT_BYID ="/patientByIdEndpoint/"
const GET_USERINFO_BYID ="/userInfoByIdEndpoint/"
const GET_USER_BYID="/userByIdEndpoint/"
const patientlistid=[];
const patientinfoid=[];
const patienttestinfo=[];


const patientuserinfonum=[];
const patientuserinfoform=[];
const patientuserid=[];
const patientinfo=[];
const patientUserName=[];
const patientDose=[];
const patientTest=[];
const patientWeight=[];

let numberZeroDose=0;
let numberOneDose=0;
let numberTwoDose=0;
let numberThreeDose=0;

let positive=0;
let negative=0;
let unknown=0;

let weight=0.0;


function DoctorDashReport(){

    const [patientList, setPatientList] = useState([]);
    const [patientInfo,setPatientInfo]=useState([]);
    const [patientDoses,setPatientDoses]=useState([]);
    const [patientTestResult,setPatientTest]=useState([]);
    const [patientWeightResult,setPatientWeight]=useState([]);
    const loggedInDoctor = JSON.parse(localStorage.getItem("doctor"));
    const doctorid = loggedInDoctor.id;

    useEffect(async () => {

        // Response for the patientList
        const patientList = await axios.get(
            GET_PATIENT_LIST + doctorid + "/",
        ).then(data => data.data);
        setPatientList(patientList);
        //add the patient's patient id to one array
        patientList.map(getPatientId);
        //function to add
            function getPatientId(item){
        patientlistid.push(item.patient);

    }
    //console.log(patientlistid);
            //get the patient status info by this patient id
    for(var i=0; i <patientlistid.length;i++){
         const patientUserInfoId= await axios.get(
             GET_PATIENT_BYID+patientlistid[i]+"/",).then(data =>data.data);
         patientinfoid.push(patientUserInfoId);
         patienttestinfo.push(patientUserInfoId);
    }

    // console.log(patientinfoid);

        //put patient's user info in one array
        patientinfoid.map(getPatientUserInfoId);
        //function to add
        function getPatientUserInfoId(array){
        array.map(nestedArray);
    }
    function nestedArray(item){
            //.push(item.user_info);
            if(item.current_vaxination_count===0){
                numberZeroDose++;
            }else if(item.current_vaxination_count===1){
                numberOneDose++;
            }else if(item.current_vaxination_count===2){
                numberTwoDose++;
            }else if(item.current_vaxination_count===3){
                numberThreeDose++;
            }

    }
        patientDose.push(numberZeroDose);
        patientDose.push(numberOneDose);
        patientDose.push(numberTwoDose);
        patientDose.push(numberThreeDose);
        // console.log(patientDose);
        setPatientDoses(patientDose);
        // console.log(patientDoses);

        patienttestinfo.map(getPatientUserInfoId2);
        function getPatientUserInfoId2(array){
            array.map(nestedArray2);}

        function nestedArray2(item){
        
                    if(item.current_test_result===true){
                        positive++;
                    }else if(item.current_test_result===false){
                        negative++;
                    }else if(item.current_test_result===null){
                        unknown++;
                    }
            }
            
            patientTest.push(positive);
            patientTest.push(negative);
            patientTest.push(unknown);
            //console.log(patientTest)
            setPatientTest(patientTest);
            //console.log(patientTest)

        patienttestinfo.map(getPatientUserInfoId3);
        function getPatientUserInfoId3(array){
        array.map(nestedArray3);}

        function nestedArray3(item){
            patientWeight.push(item.current_weight);
        }

        
        setPatientWeight(patientWeight);
        //console.log(patientWeight);
    },[])
    // console.log(patientTestResult);
    // console.log(numberZeroDose);
    // console.log(patientDose)
    // console.log(patientTest);
    // console.log(patientWeight);

    const dataBarchart = [
        {
          "name": "No dose",
          "Patients": patientDoses[0]
        },
        {
          "name": "1 dose",
          "Patients": patientDoses[1]
        },
        {
          "name": "2 dose",
          "Patients": patientDoses[2]
        },
        {
          "name": "3 dose",
          "Patients": patientDoses[3]
        }
      ]


    const dataPiechart = [
    {
        "name": "postive",
        "value": patientTestResult[0],
        fill: '#57c0e8'
    },
    {
        "name": "negative",
        "value": patientTestResult[1],
        fill: "#FF6565"
    },
    {
        "name": "null",
        "value":  patientTestResult[2],
        fill: "#FFDA83"
    },

    ]

    const dataLinechart = [
        {
          name: 'March 11',
          Weight: patientWeightResult[0],
        },
        {
          name: 'March 12',
          Weight: patientWeightResult[1],
        },
        {
          name: 'March 13',
          Weight: patientWeightResult[2],
        },
        {
          name: 'March 14',
          Weight: patientWeightResult[3],
        },
        {
          name: 'March 15',
          Weight: patientWeightResult[4],
        },
        {
          name: 'March 16',
          Weight: patientWeightResult[5],
        },
        {
          name: 'March 17',
          Weight: patientWeightResult[6],
        },
    ];

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    return (
        <div class="container1">
            <div>
                <div class="row">
                    <div class="titlebardoctor">
                        <p align={"center"}><h3>Doctor {loggedInUser.first_name}</h3></p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="square-graphs-1">
                        <h5 align="center" >Returning Patients by dose</h5>
                        <ResponsiveContainer width="90%" height="90%">
                            <BarChart width={730} height={250} data={dataBarchart}>
                                <CartesianGrid strokeDasharray="3 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Patients" fill="#82ca9d" />
                            </BarChart>
                            
                        </ResponsiveContainer>
                    </div>
                    <div class="square-graphs-2">
                        <h5 align="center">Patient's Test Results</h5>
                        <ResponsiveContainer width="90%" height="90%">
                            <PieChart width={730} height={250}>
                                <Pie data={dataPiechart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <br/>

                <div class="row">
                    <div class="long-graphs">
                        <h5 align="center">Average Weight</h5>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart
                                width={500}
                                height={300}
                                data={dataLinechart}
                                margin={{top: 40, right: 40, bottom: 5}}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]}/>
                                <Tooltip />
                                <Line type="monotone" dataKey="Weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <br/>
            </div>
        </div>
    )
}
export default DoctorDashReport
