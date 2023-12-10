import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HOMEPAGE_IMG_LINK, IMG_ALT } from "../helper/Constants.js";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinRoomWindow, setJoinRoomWindow] = useState(false);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId: roomId,
      userId: uuid(),
      userName: name,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 static">
      <div className="md:w-1/3 max-w-sm">
        <img src={HOMEPAGE_IMG_LINK} alt={IMG_ALT} />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Email Address"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-600 rounded-l mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder={`${joinRoomWindow ? 'Enter Room Code' : 'Generate Room Code'}`}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          {
            joinRoomWindow ? null : <button
              className="w-64 mt-auto text-white px-2 py-[6.5px] rounded-r bg-blue-500 hover:bg-blue-600 transition duration-300"
              onClick={() => setRoomId(uuid())}>Generate Code</button>
          }
        </div>
        <div className=" flex justify-between">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={(e) => {
              joinRoomWindow ? handleJoinSubmit(e) : handleCreateSubmit(e)
            }}
          >
            {joinRoomWindow ? 'Join Room' : 'Create Room'}
          </button>
          {!joinRoomWindow ? <CopyToClipboard
            text={roomId}
            onCopy={() => toast("Room Id Copied To Clipboard!")}
          >
            <button
              className="mt-4 bg-slate-600 hover:bg-slate-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="button"
            >
              Copy Room Code
            </button>
          </CopyToClipboard> : null}
        </div>
        <p className="mb-0 mt-2 pt-1 text-sm font-semibold flex">
          {joinRoomWindow ? 'Don\'t have a Room Code?' : 'Already have a Room Code?'}
          <a
            href="#!"
            className="text-emerald-700	 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 pl-2"
            onClick={() => setJoinRoomWindow(!joinRoomWindow)}
          >{joinRoomWindow ? 'Create Room' : 'Join Room'}</a>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default JoinCreateRoom;