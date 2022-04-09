import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";


const ChatFeed = (props) =>{
    console.log(props);
    const { chats, activeChat, userName, messages } = props;

    // Find current chat. 
    // const chat is equal to if a chat exists, find it
    const chat = chats && chats[activeChat];
    console.log(chat, userName, messages)

    // Check if a person has read the message
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
      <div key={`read_${index}`} className="read-receipt" style={{float: isMyMessage ? 'right' : 'left', backgroundImage: person.person.avatar && `url(${person.person.avatar})`}}
      />
    ));

    // Functional component needed to generate messages
    const renderMessages = () => {
        // Fetch messages
        // Keys are IDs of specific messages
        const keys = Object.keys(messages);
        
        // Get a specific message with its key
        return keys.map((key, index) => {
            // One specific message
            const message = messages[key];

            // Check if this is the last message that was sent
            // Check if index is 0 (return null if true or last index if false). Basically checking if there arent any other messages left.
            const lastMessageKey = index === 0 ? null : keys[index - 1];

            // Check if this is my message
            // Check is user name is the same as the sender
            const isMyMessage = userName === message.sender.username;

            return(
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                <div className="message-block">
                  {isMyMessage
                    ? <MyMessage message={message} />
                    : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
                </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                      {renderReadReceipts(message, isMyMessage)}
                    </div>
              </div>
            )
        })
    }

    renderMessages()

    if (!chat) return <div />;

    return (
        <div className="chat-feed">
        <div className="chat-title-container">
          <div className="chat-title">{chat?.title}</div>
          <div className="chat-subtitle">
            
          </div>
        </div>
        {renderMessages()}
        <div style={{ height: '100px' }} />
        <div className="message-form-container">
          <MessageForm {...props} chatId={activeChat} />
        </div>
      </div>
    )
}

export default ChatFeed;