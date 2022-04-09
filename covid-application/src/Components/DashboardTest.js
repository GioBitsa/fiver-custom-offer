import React from "react";
import "./Styles/DashboardTest.css";

function DashboardTest(){

  return (
    <div>
      <form>
        <div className="generatePatientForm">
        <label>
          Have you taken a covid test today? [yes/no]
          <input name="q1" type="checkbox"/>
        </label>
        <br/>
        <label>
          How many days has it been since you last got tested? [number]
          <input name="q2" type="checkbox"/>
        </label>
        <br/>
        <label>
          What was your last covid test result? [Positive/Negative]
          <input name="q3" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your body temperature? [number]
          <input name="q4" type="checkbox"/>
        </label>
        <br/>
        <label>
          How do you feel? [Likert Scale]
          <input name="q5" type="checkbox"/>
        </label>
        <br/>
        <label>
          Select all that apply: What are your symptoms? [Pulldown]
          {/* Fever, Cough, Trouble breathing, Feeling tired, Shaking chills, Muscle aches, Headache, Sore throat, Runny/stuffy nose, No smell or taste */}
          <input name="q6" type="checkbox"/>
        </label>
        <br/>
        <label>
          How many covid vaccine shots have you received? [Pulldown]
          {/* Fever, Cough, Trouble breathing, Feeling tired, Shaking chills, Muscle aches, Headache, Sore throat, Runny/stuffy nose, No smell or taste */}
          <input name="q7" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your age range [Pulldown]
          {/* Fever, Cough, Trouble breathing, Feeling tired, Shaking chills, Muscle aches, Headache, Sore throat, Runny/stuffy nose, No smell or taste */}
          <input name="q8" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your sex? [M/F]
          {/* Fever, Cough, Trouble breathing, Feeling tired, Shaking chills, Muscle aches, Headache, Sore throat, Runny/stuffy nose, No smell or taste */}
          <input name="q9" type="checkbox"/>
        </label>
        <br/>
        <label>
          Comments, concerns or questions you may have for your doctor? [Textarea]
          <input name="q10" type="checkbox"/>
        </label>

        </div>
      </form>
    </div>
  );
}
{/** This will be the actual component for the form generator */ }

export default DashboardTest;
