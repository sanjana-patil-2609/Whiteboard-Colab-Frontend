import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ClientRoom = ({ socket, setUsers, setUserNo, userNo }) => {
  const imgRef = useRef(null);
  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);
  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);
  return (
    <div className="block h-[95%] my-5 w-[95%] mx-8 min-w-[700px] overflow-auto">
      <div className="block text-center text-2xl pb-2">React Drawing App{` (Online Users: ${userNo})`}</div>
      <div className="block">
        <div
          className="overflow-auto no-scrollbar border border-black px-0 mx-auto mt-3 bg-red-50"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;