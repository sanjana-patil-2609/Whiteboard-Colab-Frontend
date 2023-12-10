import React, { useEffect, useState } from 'react';

const Chat = ({ socket, user }) => {
  const [message, setMessage] = useState('');
  const [isChatWindowOpen, setIsChatWidowOpen] = useState(true);
  const [messages, setMessages] = useState(new Set());

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit('sendMessage', { userName: user.userName, roomCode: user.roomId, message: message }, (id) => {
      setMessage('');
      setMessages(prevMessages => new Set(prevMessages).add({ userName: user.userName, roomCode: user.roomId, message: message, id }))
    })
  }

  useEffect(() => {
    socket.on('receive_message', message => {
      setMessages(prevMessages => new Set(prevMessages).add(message));
    });
  }, [socket]);

  const openChatWindow = () => {
    setIsChatWidowOpen(openChatWindow => !openChatWindow)
  }

  console.log(messages)
  return (
    <div>
      {
        isChatWindowOpen ?
          (
            <div id="chat-container" className="fixed bottom-9 right-4 w-96">
              <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                  <p className="text-lg font-semibold">Room</p>
                  <button id="close-chat"
                    className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                    onClick={openChatWindow}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                  {
                    Array.from(messages).map((item, index) => (
                      item.userName === user.userName ?
                        (
                          <div className="mb-2 text-right" key={index}>
                            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block max-w-[287px] overflow break-words text-left">{item.message}</p>
                          </div>
                        ) : (
                          <div className="mb-2" key={index}>
                            <span className="text-xs text-slate-400 pl-1">{item.userName}</span>
                            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 max-w-[287px] overflow break-words text-left block w-fit">{item.message}</p>
                          </div>
                        ))
                    )
                  }
                </div>
                <div className="p-4 border-t flex">
                  <input
                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                    onClick={(e) => sendMessage(e)}
                  >Send</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="fixed bottom-4 right-6 mb-4 mr-4">
              <button id="open-chat" className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                onClick={openChatWindow}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Chat with users
              </button>
            </div>
          )
      }
    </div>
  )
}

export default Chat;