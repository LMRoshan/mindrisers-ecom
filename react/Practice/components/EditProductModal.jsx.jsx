import React, { useState, useEffect } from "react";

const EditProd = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    instock: product.instock,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShow(true);
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`modal fade ${show ? "show": ""}`} style={{ display: "block" }} tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              onClick={() => onClose()}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  id="description"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="form-control"
                  id="price"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Instock
                </label>
                <input
                  type="number"
                  value={form.instock}
                  onChange={handleChange}
                  className="form-control"
                  id="instock"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => onClose()}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSave()}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProd;
