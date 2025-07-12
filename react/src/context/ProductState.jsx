import React, { useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {

  // products
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://imgs.search.brave.com/S6Jt55u7sf7x7sE9oGyCPTEdebHdIF29FprYiMQzcqI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y0LzYx/L2VlL2Y0NjFlZThl/ZmYwYjdhOWViYTg5/NjEwNDM2NzJiM2Zk/LmpwZw",
      name: "Apple",
      description: "Fresh and juicy apples",
      price: 100,
      instock: 50,
    },
    {
      id: 2,
      img: "https://imgs.search.brave.com/odxd3HwCo6eaSc2XsOtxRHeVZxSkmXbAWFeIxdrKPLU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjg3/Mjc0Ny9wZXhlbHMt/cGhvdG8tMjg3Mjc0/Ny5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA",
      name: "Banana",
      description: "Fresh Banana",
      price: 80,
      instock: 40,
    },
    {
      id: 3,
      img: "https://imgs.search.brave.com/0e-vl-AKAJcUiHKMjIAxrweu7iUFiR6ybK3xXjFoLDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9raXdpLWZydWl0/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmRfNjI4NTYtODg4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA",
      name: "Kiwi",
      description: "Fresh Kiwi",
      price: 120,
      instock: 60,
    },
    {
      id: 4,
      img: "https://imgs.search.brave.com/GaFzRQGs-PbRDAX9W0SUJYwCsJPtrThGMjcqXeiAZLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDUu/ZGVwb3NpdHBob3Rv/cy5jb20vMTY0MjQ4/Mi82NDUxMS9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzY0NTExMTc2/OC1zdG9jay1waG90/by1tYW5nby1oYWxm/LWZyZXNoLW1hbmdv/LWlzb2xhdGVkLmpw/Zw",
      name: "Mango",
      description: "Fresh Mango",
      price: 120,
      instock: 60,
    },
  ]);

  const update = () => {
    setTimeout(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === 3
            ? { ...product, description: "Kiwi aus New Zealand" }
            : product
        )
      ); 
    }, 1000);
  };

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });


  const allProduct = async () => {
    try{
    const response = await fetch("http://localhost:3000/api/products/getProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token"),
      },
    });
    let data = await response.json();
    console.log(data);
    setProducts(data);
  } catch (error) {
    
    console.log("Error: ", error);
    
  }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token"),
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        console.log("Product deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editProduct = async (selectedProduct, updateData) => {
    console.log("editProduct", selectedProduct);
    const { name, description, price, instock } = updateData;
    try {
      const response = await fetch(`http://localhost:3000/api/products/updateProduct/${selectedProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token"),
        },
        body: JSON.stringify({name, description, price, instock}),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      allProduct();
    } catch (error) {
      throw new Error(error.status);
      // console.log(error);
    }
  };


  return (
    <ProductContext.Provider value={{ products, update, state, dispatch, editProduct, deleteProduct, allProduct }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
