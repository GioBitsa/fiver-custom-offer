import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import axios from '../api/axios';
import '../Styles/DoctorDashboard.css';

const PatientUpdate_URL = "/updateUserInfoEndpoint/";
const UrgentMessageString = ""

const MessageForm = (props) => {
    const [value, setValue] = useState('*** URGENT *** : ');
    const { chatId, creds } = props;

    const handleSubmit = async (event) => {
        
        // IMPORTANT - Prevent browser refresh
        event.preventDefault();

        const text = value.trim(); 

        // Check if textbox is empty (we do not want to send an empty message)
        if (text.length > 0) sendMessage(creds, chatId, {text});
        //const SenderUserName = message.sender.username;

        //console.log(SenderUserName);

        try {
            const user = JSON.parse(localStorage.getItem("user"))
            console.log(user.id)
            const response = await axios.put(
                PatientUpdate_URL,
                JSON.stringify({
                    hasMessage: true,
                    user: user.id
                }),
                {
                    headers: {"Content-Type": "application/json"},
                    //   withCredentials: true,
                }
            );
        } catch (err){

        }

        // Reset value of textbox after sending message
        setValue('*** URGENT *** : ');
    };

    // Check if user is typing
    const handleChange = (event) => {
        setValue(event.target.value);

        isTyping(props, chatId);
    };

    // For uploading images
    const handleUpload = (event) => {
        sendMessage(creds, chatId, {files: event.target.files, text: ""})
    };

  return (

    <form className="message-form" onSubmit={handleSubmit}>      
        <input comment="Input text for the user"
            className="message-input"
            placeholder="Send a message..."
            value={value}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />

        <form action="chat_app">
            <input type="submit" value={"Normal"}/>
        </form>
    </form>
  );
};

// Urgent toggle switch - TODO later
/*
        <text> Urgent: </text> 
            <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
        </label>
*/

export default MessageForm;