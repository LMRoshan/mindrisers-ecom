import React, { useContext } from "react";
import ProductContext from "../../src/context/ProductContext";

const CartItems = () => {
  const { state, dispatch } = useContext(ProductContext);

  const Total = state.cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const text = {
    fontSize: "21px",
    fontWeight: "bold",
  };

    const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  return (
    <div className="container py-5">
      <h1>Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
        {state.cart.length === 0 ? (
          <div className="card m-3">
            <div className="d-flex justify-content-center align-items-center p-5">
              <h3>Your cart is empty</h3>
            </div>
          </div>
        ) : (
          <div className="card m-3 p-1">
            
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" style={text}>
                      Products
                    </th>
                    <th scope="col" style={text}>
                      Details
                    </th>
                    <th scope="col" style={text}>
                      Price
                    </th>
                    <th scope="col" style={text}>
                      Quantity
                    </th>
                    <th scope="col" style={text}>
                      Total
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.cart.map((item) => (
                    <tr key={item.id} className="align-middle">
                      <td>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ width: "90px" }}
                        />
                      </td>
                      <td>
                        {item.name} <br />
                        <small>ID: {item.id}</small>
                      </td>
                      <td>NPR: {item.price.toLocaleString()}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
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
                          aria-label="Default select example"
                        >
                          {[...Array(item.instock).keys()].map((x) => (
                            <option key={x} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>${item.price * item.qty}</td>
                      <td>
                        <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
        </div>

        {/* order summary */}
        <div className="col-lg-4">
          <div className="card m-3">
            <div className="card-header">
              <h4>Order Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6>Subtotal ({state.cart.length} items)</h6>
                <h6>NPR: {Total.toLocaleString()}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Tax (13%)</h6>
                <h6>NPR: {(Total * 0.13).toLocaleString()}</h6>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5>NPR: {(Total + Total * 0.13).toLocaleString()}</h5>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CartItems;
