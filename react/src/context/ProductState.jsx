import React, { useEffect, useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  // products
  const [products, setProducts] = useState([]);
  const [userProduct, setUserProduct] = useState([]);

  // const update = () => {
  //   setTimeout(() => {
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product.id === 3
  //           ? { ...product, description: "Kiwi aus New Zealand" }
  //           : product
  //       )
  //     );
  //   }, 1000);
  // };

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const allProduct = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("No authentication token found. Please log in.");
      
      return; 
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/getProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
        }
      );

      let data = await response.json();
      
      // setProducts(prevData => [...prevData, data]);
      setProducts(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const allhomeProduct = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("No authentication token found. Please log in.");
      
      return; 
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/gethomeProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
        }
      );

      let data = await response.json();
      
      // setProducts(prevData => [...prevData, data]);
      setUserProduct(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteProduct = async (id) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("No authentication token found. Please log in.");
      
      return; 
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/deleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
          // body: JSON.stringify({ id }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // Add this
        throw new Error(errorData.error || response.status);
      } else {
        console.log("Product deleted");
      }

      allProduct();
      allhomeProduct();
    } catch (error) {
      console.log(error.message);
    }
  };

  const editProduct = async (selectedProduct, updateData) => {
    console.log("editProduct", selectedProduct);
    const { name, description, price, instock } = updateData;
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("No authentication token found. Please log in.");
      
      return; 
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/updateProduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
          body: JSON.stringify({ name, description, price, instock }),
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      allProduct();
      allhomeProduct();
      return data;
    } catch (error) {
      throw new Error(error.status);
      // console.log(error);
    }
  };

  useEffect(() => {
    allProduct();
    allhomeProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        userProduct,
        state,
        dispatch,
        editProduct,
        deleteProduct,
        allProduct,
        allhomeProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
