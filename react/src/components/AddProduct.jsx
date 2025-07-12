import React, { useState } from "react";

const AddProduct = () => {
  const [addProd, setAddProd] = useState({
    name: "",
    description: "",
    price: 0,
    instock: 0,
    img: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setAddProd({ ...addProd, [e.target.name]: e.target.files[0] });
      console.log(e.target.files[0]);
      
    } else {
      setAddProd({ ...addProd, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    console.log("Submit Clicked");
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", addProd.name);
    formData.append("description", addProd.description);
    formData.append("price", addProd.price);
    formData.append("instock", addProd.instock);
    if (addProd.img) {
      formData.append("img", addProd.img);
    }
    const response = await fetch("http://localhost:3000/api/products/addProduct", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();
    console.log(json);
  };

  // console.log();
  

  return (
    <div className="container mt-4">
      <div className="row">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={addProd.name}
              onChange={handleChange}
              className="form-control"
              id="productName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={addProd.description}
              onChange={handleChange}
              className="form-control"
              id="productDescription"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={addProd.price}
              onChange={handleChange}
              className="form-control"
              id="productPrice"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productInstock" className="form-label">
              Instock
            </label>
            <input
              type="number"
              name="instock"
              value={addProd.instock}
              onChange={handleChange}
              className="form-control"
              id="productInstock"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Image
            </label>
            <input
              type="file"
              // multiple
              name="img"
              // value={addProd.img}
              onChange={handleChange}
              className="form-control"
              id="productImage"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
