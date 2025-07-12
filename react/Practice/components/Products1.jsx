import React, { useContext, useReducer, useState } from "react";
import ProductContext from "../../src/context/ProductContext";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { cartReducer } from "../../src/context/Reducer";
import EditProd from "./EditProductModal.jsx";
import { useNavigate } from "react-router-dom";

const Products1 = () => {
  const { products} = useContext(ProductContext);
  // console.log(products);

  const [option, setOption] = useState({});
  const [editVisible, setEditVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const navigate = useNavigate();


  const toggleVisible = (id) => {
    setOption((preState) => ({
      ...preState,
      [id]: !preState[id],
    }));
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setEditVisible(true);
  };

  const closeEdit = () => {
    setEditVisible(false);
    setEditProduct(null);
  };

  const saveEdit = (updateData) => {
    setEditProduct(editProduct.id, updateData);
  };



  const [state, dispatch] = useReducer(cartReducer, {
    product: products,
    cart: [],
  });

  return (
    <div className="container">
      <h1>Available Products</h1>
      <div className="row">
        {products &&
          products.map((prod) => (
            <div className="col-lg-3 col-md-4 col-sm-12 mt-3" key={prod.id}>
              <div className="card h-100 w-100" style={{ width: "18rem" }}>
                <img
                  src={prod.img}
                  className="card-img-top"
                  alt="product-pic"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="option d-flex justify-content-between">
                    <h5 className="card-title">{prod.name}</h5>
                    <PiDotsThreeOutlineFill
                      onClick={() => toggleVisible(prod.id)}
                    />
                    {option[prod.id] && (
                      <div className="optionBtn">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => openEdit(prod)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => closeEdit()}
                        >
                          {" "}
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="card-text">{prod.description}</p>
                  <h6>Price: ${prod.price}</h6>
                  <p>In Stock: {prod.instock}</p>
                  {state.cart &&
                  state.cart.some((item) => item.id === prod.id) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: prod.id })
                      }
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: prod })
                      }
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-success btn-lg m-3 d-block mx-auto" style={{width:"200px"}} onClick={() => navigate("/cartItems")}>View Your Cart</button>
      </div>
      {editVisible && editProduct && (
        <EditProd
          product={editProduct}
          onClose={closeEdit}
          onSave={saveEdit}
        />
      )}
    </div>
  );
};

export default Products1;
