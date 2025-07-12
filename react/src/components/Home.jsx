import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

    const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    toast.warning("Count changed", {
      autoClose: 2000,
      position: "top-right",
    });
  }, [count])
  return (
    <div>
      Welkommen Sie!
      <Banner/>
      <div className="container">
          <h1>Hallo Alles</h1>
          <div className="card d-flex justify-content-center align-items-center mb-3">
            <div>
              <h4 className="ms-3">Number is: {count}</h4>
              <button onClick={handleIncrement}>Increment</button>
              <button onClick={handleDecrement}>Decrement</button>
            </div>
            <p>
              Guten Tag! aus <code>Deutschland</code>
            </p>
          </div>
          <Button>IDK</Button>
        </div>
    </div>
  )
}

export default Home