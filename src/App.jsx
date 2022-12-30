import { useState } from "react";

function App() {
  const [circles, setCircles] = useState([]);

  const [undoRedoState, setUndoRedoState] = useState([]);

  function createCircle(event) {
    setCircles((prevCircles) => [
      ...prevCircles,
      { x: event.clientX, y: event.clientY, color: randomColor() },
    ]);
  }

  function undoCircle() {
    if (circles.length === 0) return;
    const newCircles = [...circles];
    const poppedCircle = newCircles.pop();
    setUndoRedoState((prevVal) => [...prevVal, poppedCircle]);
    setCircles([...newCircles]);
  }

  function redoCircle() {
    if (undoRedoState.length === 0) return;
    const redoCircles = [...undoRedoState];
    const poppedCircle = redoCircles.pop();
    setCircles((prevCircles) => [...prevCircles, poppedCircle]);
    setUndoRedoState([...redoCircles]);
  }

  function clearAllCircles() {
    setCircles([]);
    setUndoRedoState([]);
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const circleElements = circles?.map((circle, idx) => {
    return (
      <div
        key={idx}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          position: "fixed",
          left: circle.x,
          top: circle.y,
          marginLeft: "-8px",
          marginTop: "-8px",
          backgroundColor: circle.color,
        }}
      ></div>
    );
  });

  return (
    <>
      <div className="buttons">
        <button onClick={undoCircle} disabled={!circles.length}>
          Undo
        </button>
        <button onClick={redoCircle} disabled={!undoRedoState.length}>
          Redo
        </button>
        <button
          onClick={clearAllCircles}
          disabled={!circles.length && !undoRedoState.length}
        >
          Clear
        </button>
      </div>
      <div className="canvas" onClick={(event) => createCircle(event)}>
        {circleElements}
      </div>
    </>
  );
}

export default App;
