import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import About from "./components/About";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PracticeNPM from "./components/PracticeNPM";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import UserDetail from "./components/UserDetail";
import ProductState from "./context/ProductState";
import Product from "./components/Product";
import News from "./components/News";
import NewsState from "./context/NewsState";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Products1 from "../Practice/components/Products1";
import UseReduce from "../Practice/UseReduce";
import CartItems from "../Practice/components/CartItems";

function App() {
  const [mode, setMode] = useState("light");
  const [btnText, setBtnText] = useState("Enable Dark");
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({
      type: type,
      msg: msg,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // toast got called 2 times
  // const toggleMode = () => {
  //   mode === "light"
  //     ? (setMode("dark"),
  //       setBtnText("Enable Light"),
  //       showAlert("secondary", "Dark Mode enable"),
  //       toast.info("Dark Mode enabled", {autoClose: 2000,}))
  //     : (setMode("light"),
  //       setBtnText("Enable Dark"),
  //       showAlert("success", "Light Mode enable"));
  //       toast.success("Light Mode enabled", {autoClose: 2000,});
  // };

  // iife
  const toggleMode = () => {
    mode === "light"
      ? (() => {
          setMode("dark");
          setBtnText("Enable Light");
          showAlert("secondary", "Dark Mode enabled");
          toast.info("Dark Mode enabled", { autoClose: 2000 });
        })()
      : (() => {
          setMode("light");
          setBtnText("Enable Dark");
          showAlert("success", "Light Mode enabled");
          toast.success("Light Mode enabled", { autoClose: 2000 });
        })();
  };

  return (
    <>
      <ProductState>
        <NewsState>
          <Router>
            <Navbar mode={mode} btnText={btnText} toggle={toggleMode}></Navbar>
            <Alert alert={alert} showAlert={showAlert}></Alert>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/practiceNPM" element={<PracticeNPM />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/users/:id/:name" element={<UserDetail />} />
              <Route path="/users" element={<User />} />
              <Route path="/products" element={<Product />} />
              <Route path="/news" element={<News />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/addproducts" element={<AddProduct />} />
              <Route path="/products1" element={<Products1 />} />
              <Route path="/usereducer" element={<UseReduce />} />
              <Route path="/cartItems" element={<CartItems />} />
            </Routes>
            <ToastContainer />
          </Router>
        </NewsState>
      </ProductState>
    </>
  );
}

export default App;
