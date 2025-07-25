import React, { useState } from "react";
import ProductContext from "../context/ProductContext";
import { useContext } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import EditProductModal from "./EditProd";
import Footer from "./Footer";

const Product = () => {
  const { products, allProduct, state, dispatch, editProduct, deleteProduct } =
    useContext(ProductContext);

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenuId((prevId) => (prevId === id ? null : id));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    setActiveMenuId(null);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
    closeEditModal();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    allProduct();
  };

 
  const getProductId = (product) => {
    return product.id || product._id;
  };


  const handleAddToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  const isProductInCart = (product) => {
    const productId = getProductId(product);
    return (
      state.cart &&
      state.cart.some((item) => {
        
        return (
          item.uid === productId ||
          item.id === productId ||
          item._id === productId
        );
      })
    );
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Here are the available products</h1>
        <div className="row">
          {products.length === 0 ? (
            <div className="spinner-grow mt-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            products &&
            products.map((product, index) => {
              const productId = getProductId(product);
              const inCart = isProductInCart(product);

              return (
                <div className="col-md-3" key={productId || index}>
                  <div className="card mt-4" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:3000/uploads/${product.img[0]}`}
                      className="card-img-top"
                      alt={product.name || "Product image"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <div className="three-dots position-relative">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="card-title m-0">
                            {product.name || "Unknown Product"}
                          </h5>
                          <PiDotsThreeOutlineFill
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(productId);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>

                        {activeMenuId === productId && (
                          <div
                            className="menu-option position-absolute bg-white p-2 shadow rounded"
                            style={{ zIndex: 100, right: 0, top: "100%" }}
                          >
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => openEditModal(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(productId)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="card-text mt-2">{product.description}</p>
                      <div className="mt-3">
                        <h4>Price: NPR {product.price}</h4>
                        <h5>Instock: {product.instock}</h5>
                      </div>

                      <div className="mt-3">
                        {inCart ? (
                          <button
                            className="btn btn-danger w-100"
                            onClick={() => handleRemoveFromCart(productId)}
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {modalVisible && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={closeEditModal}
            onSave={saveEdit}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
