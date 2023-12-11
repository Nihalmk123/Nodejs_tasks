import React, { useEffect, useState } from "react";

const CardData = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    collectData();
  }, []);

  const collectData = async () => {
    try {
      const result = await fetch("http://localhost:5000/products");
      const data = await result.json();
      // Filter out entries with missing ID or other essential data
      const filteredData = data.filter(
        (product) =>
          product._id &&
          product.name &&
          product.price &&
          product.category &&
          product.company
      );
      setProducts(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        alert("Deleted Successfully");
        collectData();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = (productId) => {
    const selectedItem = products.find((product) => product._id === productId);
    setCartItems([...cartItems, selectedItem]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row row-cols-3 row-cols-md-5 row-cols-lg-4 g-5">
            {products.map((product) => (
              <div
                className="card"
                key={product._id}
                style={{ width: "18rem" }}
              >
                <img src="..." className="card-img-top" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Company: {product.company}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2>Cart Items</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardData;
