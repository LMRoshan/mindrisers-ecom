import React, { useContext, useEffect, useState } from "react";
import Banner from "./Banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContext from "../context/ProductContext";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import EditProductModal from "./EditProd";
import Footer from "./Footer";
import Img2 from "../assets/about.png";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const {
    allhomeProduct,
    userProduct,
    state,
    dispatch,
    editProduct,
    deleteProduct,
  } = useContext(ProductContext);

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
  }, [count]);

  const [menuVisible, setMenuVisible] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const toggleMenu = (id) => {
  //   setMenuVisible((prvState) => ({
  //     ...prvState,
  //     [id]: !prvState[id],
  //   }));
  // };
  const toggleMenu = (id) => {
    setMenuVisible((prvState) => (prvState === id ? null : id));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    console.log("open");
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    console.log("close");
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct.id, updateData);
    closeEditModal();
  };

  const handleDelete = async (id) => {
    console.log("deleting product");
    await deleteProduct(id);
    allhomeProduct();
  };

  return (
    <>
      <Banner />
      <div className="container mt-3">
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
      </div>
      <div
        style={{
          position: "relative",
          height: "50vh",
        }}
        className="about-img"
      >
        <div
          className="about"
          style={{
            position: "absolute",
            top: "35%",
            right: "55%",
            left: "5%",
            textAlign: "center",
            color: "#333",
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "34px",
              fontWeight: "bolder",
              textTransform: "uppercase",
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            About Us
          </h2>
          <p>
            We are a team of passionate individuals committed to delivering the
            best experience for our users. Our application is designed to be
            user-friendly and efficient, helping you achieve your goals with
            ease.
          </p>
          <Link to="/about">
            <button className="btn btn-primary">Read More</button>
          </Link>
        </div>
      </div>

      <div className="container mt-3">
        <h1>Newly Added Products</h1>
        <div className="row">
          {userProduct &&
            userProduct.map((product, index) => (
              <div
                className="col-md-3"
                key={product._id || index}
              >
                <div className="card mt-4 mb-4" styles={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:3000/uploads/${product.img[0]}`}
                    className="card-img-top"
                    alt="image"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <div className="three-dots">
                      <h5 className="card-title">
                        Name: {product.name || "unknown"}
                      </h5>
                      <PiDotsThreeOutlineFill
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(product._id);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      {menuVisible === product._id && (
                        <div className="menu-option">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => openEditModal(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="card-text">{product.description}</p>
                    <h4>Price: NPR {product.price}</h4>
                    <h5>Instock: {product.instock}</h5>
                    {state.cart &&
                    state.cart.some((prod) => prod._id === product._id) ? (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product._id,
                          })
                        }
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({ type: "ADD_TO_CART", payload: product })
                        }
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {modalVisible && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={closeEditModal}
            onSave={saveEdit}
          />
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Home;
