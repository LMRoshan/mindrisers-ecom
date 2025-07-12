import React, { useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import { useContext } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import EditProductModal from "./EditProd";

const Product = () => {
  const { products, update, state, dispatch, editProduct, deleteProduct } =
    useContext(ProductContext);
  // console.log(products);
  // console.log(state);

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prvState) => ({
      ...prvState,
      [id]: !prvState[id],
    }));
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
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Here are the available products</h1>
      <div className="row">
        {products &&
          products.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="card mt-4" styles={{ width: "18rem" }}>
                <img
                  src={product.img}
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
                      onClick={() => toggleMenu(product.id)}
                      style={{ cursor: "pointer" }}
                    />
                    {menuVisible[product.id] && (
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
                  state.cart.some((prod) => prod.id === product.id) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product.id,
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
  );
};

export default Product;
