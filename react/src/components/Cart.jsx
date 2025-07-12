import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";

const Cart = () => {
  const { state, dispatch } = useContext(ProductContext);

  if (!state || !state.cart) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const Total = state.cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>

      <div className="row">
        <div className="col-lg-8">
          {state.cart.length === 0 ? (
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <h4 className="mb-2">Your cart is empty</h4>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" style={{ width: "120px" }}>
                          Product
                        </th>
                        <th scope="col">Details</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.cart.map((item) => (
                        <tr key={item.id} className="align-middle">
                          <td>
                            <img
                              src={item.img}
                              className="img-fluid rounded"
                              alt={item.name}
                              style={{ maxHeight: "80px" }}
                            />
                          </td>
                          <td>
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">ID: {item.id}</small>
                          </td>
                          <td>NPR {item.price.toLocaleString()}</td>
                          <td>
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch({
                                  type: "CHANGE_CART_QTY",
                                  payload: {
                                    id: item.id,
                                    qty: parseInt(e.target.value),
                                  },
                                })
                              }
                              className="form-select form-select-sm"
                              style={{ width: "80px" }}
                            >
                              {[...Array(item.instock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            NPR {(item.price * item.qty).toLocaleString()}
                          </td>
                          <td>
                            {/* <!-- Button trigger modal --> */}
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="btn btn-outline-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Remove
                            </button>

                            {/* <!-- Modal --> */}
                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
                                      Remove Item
                                    </h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <p>Are you sure you want to remove this item?</p>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({state.cart.length} items)</span>
                <span>NPR {Total.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax (13%)</span>
                <span>NPR {(Total * 0.13).toLocaleString()}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <h5>Total</h5>
                <h5>NPR {(Total * 1.13).toLocaleString()}</h5>
              </div>
              <button
                className="btn btn-primary w-100 py-2 mb-2"
                disabled={state.cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
