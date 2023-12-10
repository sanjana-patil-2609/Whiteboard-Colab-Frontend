import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Canvas from './Canvas';

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState('#000000');
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState('pencil');

  useEffect(() => {
    socket.on('message', (data) => {
      toast.info(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on('users', (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1),
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1),
    );
  };

  return (
    <div className="block h-[95%] my-5 w-[95%] mx-8
    min-w-[700px] overflow-auto">
      <div className="block text-center text-2xl pb-2">React Drawing App {` (Online Users: ${userNo})`}</div>
      <div className="flex justify-center items-center text-center py-2">
        <div className="flex mr-5">
          <div className="color-picker flex items-center justify-center">
            Color Picker :
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="pencil"
              value="pencil"
              checked={tool === 'pencil'}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label mx-1" htmlFor="pencil">
              Pencil
            </label>
          </div>
          <div className="flex">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="line"
              value="line"
              checked={tool === 'line'}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label mx-1" htmlFor="line">
              Line
            </label>
          </div>
          <div className="flex">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="rect"
              value="rect"
              checked={tool === 'rect'}
              onChange={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label mx-1" htmlFor="rect">
              Rectangle
            </label>
          </div>
        </div>

        <div className="flex ml-5">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md transition duration-300 mr-2"
            disabled={elements.length === 0}
            onClick={undo}
          >Undo</button>
          <button
            className="border border-blue-500 text-blue-500 rounded-md transition duration-300 py-1 px-2"
            onClick={redo}
            disabled={history.length === 0}
          >Redo</button>
          <button
            className=" bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md transition duration-300 ml-2"
            onClick={clearCanvas}
          >Clear Canvas</button>
        </div>
      </div>
      <div className="block">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;
