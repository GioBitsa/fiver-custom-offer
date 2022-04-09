import React from 'react';
import Modal from 'react-modal';
import { hide } from 'react-modal/lib/helpers/ariaAppHider';
import "./Styles/AmpTest.css";

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    height: '400px',
    width:'400px',
    overflow: 'hidden',
    paddingTop: '70px',
  },
};

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

const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    maxHeight: '270px',
  },
};

const customStyles3 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      transform: 'translate(-50%, -50%)',
      marginBottom: '0%',
    },
  };

Modal.setAppElement('#root');

function DoctorStatusForm() {
  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [modalIsOpen3, setIsOpen3] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }
  
    {/** Will open new patient form */}
  function openModal1() {
    setIsOpen1(true);
  }

    {/** Will close new patient form */}
  function closeModal1() {
    setIsOpen1(false);
  }
  
    {/** Will open updated patient form */}
  function openModal2() {
    setIsOpen2(true);
  }

    {/** Will close updated patient form */}
  function closeModal2() {
    setIsOpen2(false);
  }
  
    {/** Will open contact tracing form */}
  function openModal3() {
    setIsOpen3(true);
  }

    {/** Will close contact tracing form */}
  function closeModal3() {
    setIsOpen3(false);
  }

  return (
    <div>
        <div className='GenerateForm'>
        <button className='GenerateButton' onClick={openModal1}>Create Patient Profile</button>
        </div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal: Form Generator"
        style={customStylesModal}>

        <div className="generatePatientForm">
            <div className="centerButtons">
                <button className='GenerateButton2' onClick={openModal1}>Create Patient Profile Form</button>
            </div>
            <br/>
            <div className="centerButtons">
                <button className='GenerateButton2' onClick={openModal2}>Update Patient Form</button>
            </div>
            <br/>
            <div className="centerButtons">
                <button className='GenerateButton2' onClick={openModal3}>Send Contact Tracing Form</button>
            </div>
            <br/>
            <div className="centerButtons">
              <button className='GenerateButton' onClick={closeModal}>Close</button>
            </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        contentLabel="Modal: Form Generator"
        style={customStyles1}>

        <div className="generatePatientForm">
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
        <button className='GenerateButton' onClick={closeModal1}>Generate</button>
        &nbsp;&nbsp;
        <button className='GenerateButton' onClick={closeModal1}>Close</button>
        </div>
        </div>
      </Modal>


      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        contentLabel="Modal: Form Generator"
        style={customStyles2}>

        <div className="generatePatientForm">
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
        <button className='GenerateButton' onClick={closeModal2}>Generate</button>
        &nbsp;&nbsp;
        <button className='GenerateButton' onClick={closeModal2}>Close</button>
        </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        contentLabel="Modal: Form Generator"
        style={customStyles3}>

        <div className="generatePatientForm">
            <h4>The Patient will be asked to write down emails of those they suspect might be at risk.</h4>
            
        <div className='GenerateForm'>
        <button className='GenerateButton' onClick={closeModal3}>Close</button>
        </div>
        </div>
      </Modal>

    </div>
  );
}


export default DoctorStatusForm;