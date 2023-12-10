import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";

import "./App.css";
import Room from "./components/Room";
import ClientRoom from "./components/ClientRoom";
import JoinCreateRoom from "./components/JoinCreateRoom";
import Chat from "./components/Chat";
import { UUID, connectionOptions, server } from "./helper/HelperFunctions";

const socket = io(server, connectionOptions);

const App = () => {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);

  return (
    <div className="home">
      <ToastContainer />
      {roomJoined ? (
        <>
          <Chat socket={socket} user={user} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </>
      ) : (
        <JoinCreateRoom
          uuid={UUID}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;