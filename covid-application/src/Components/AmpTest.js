import React from 'react';
import Modal from 'react-modal';
import { hide } from 'react-modal/lib/helpers/ariaAppHider';
import "./Styles/AmpTest.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    overflow: 'scroll',
  },
};

Modal.setAppElement('#root');

function AmpTest() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
        <br/>
        <div className='GenerateForm'>
        <button className='GenerateButton' onClick={openModal}>Create Patient Profile</button>
        </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal: Form Generator"
        style={customStyles}>
        <div className="generatePatientForm">
        <form>
        <div>
          {/**This will display Q's for patient */}
        <label>
          What is your weight? [number]
          <input name="q1" type="checkbox"/>
        </label>
        <br/>
        <label>
          Have you taken a covid test today? [yes/no]
          <input name="q2" type="checkbox"/>
        </label>
        <br/>
        <label>
          How many days has it been since you last got tested? [number]
          <input name="q3" type="checkbox"/>
        </label>
        <br/>
        <label>
          What was your last covid test result? [Positive/Negative]
          <input name="q4" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your body temperature? [number]
          <input name="q5" type="checkbox"/>
        </label>
        <br/>
        <label>
          How do you feel? [Likert Scale]
          <input name="q6" type="checkbox"/>
        </label>
        <br/>
        <label>
          Select all that apply: What are your symptoms? [Pulldown]
          {/* Fever, Cough, Trouble breathing, Feeling tired, Shaking chills, Muscle aches, Headache, Sore throat, Runny/stuffy nose, No smell or taste */}
          <input name="q7" type="checkbox"/>
        </label>
        <br/>
        <label>
          How many covid vaccine shots have you received? [Pulldown]
          <input name="q8" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your age range? [Pulldown]
          <input name="q9" type="checkbox"/>
        </label>
        <br/>
        <label>
          What is your sex? [M/F]
          <input name="q10" type="checkbox"/>
        </label>
        <br/>
        <label>
          Comments, concerns or questions you may have for your doctor? [Textarea]
          <input name="q11" type="checkbox"/>
        </label>
        </div>
        <br/>
        <div className='GenerateForm'>
        <button className='GenerateButton' onClick={closeModal}>Generate</button>
        &nbsp;&nbsp;
        <button className='GenerateButton' onClick={closeModal}>Close</button>
        </div>
        <br/>
        <div className='GenerateForm'>
        </div>
      </form>
        </div>
      </Modal>
    </div>
  );
}


export default AmpTest;