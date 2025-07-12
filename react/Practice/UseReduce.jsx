import React, { useReducer } from "react";

const UseReduce = () => {
  const calculation = (state, action) => {
    switch (action.type) {
      case "add":
        return state + 1;
      case "sub":
        return state - 1;
      case "reset":
        return 0;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(calculation, 0);

  return (
    <div className="container mt-5 bg-light p-5">
      <h1 className="text-center">{state}</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary me-2"
          onClick={() => dispatch({ type: "add" })}
        >
          +
        </button>
        <button
          className="btn btn-warning me-2"
          onClick={() => dispatch({ type: "reset" })}
        >
          RESET
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => dispatch({ type: "sub" })}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default UseReduce;
