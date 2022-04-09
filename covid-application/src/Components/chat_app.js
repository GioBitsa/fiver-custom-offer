import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './app_components/ChatFeed.jsx';

import './chat.css';

function App() {
    return (
        <ChatEngine 

            // DO NOT TOUCH THESE!!!!!!!!!!!
            height = "100vh"
            projectID = "7b218aae-0285-437f-b1d3-a068537398c4"
            

            // Change/uncomment the username to access other users views
            // Main user
            userName = "Massimo"
            
            // User1
            //userName = "user1"

            // User password
            userSecret = "123123"




            // EVENT HOOKS - PROCEED WITH CAUTION

            // Change header when new message is received
            // TODO
            

            // Send notification to backend when a new message is received
            // TODO - this is a placeholder for now
            onNewMessage={(chatId, message) => console.log(chatId, message)}

            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;

