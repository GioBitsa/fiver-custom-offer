import React from 'react';
import Modal from 'react-modal';
import { hide } from 'react-modal/lib/helpers/ariaAppHider';
import "./Styles/AppointmentTime.css";

const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    marginBottom: '0%',
    height: '400px',
    width: '400px',
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

function AppointmentTime() {

  return (
    <div>
      <div className='GenerateForm'>
        <button className='GenerateButton'>Edit Time</button>
      </div>

    </div>
  );
}


export default AppointmentTime;