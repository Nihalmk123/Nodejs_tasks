import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        collectData();
    }, []);

    const collectData = async () => {
        try {
            const result = await fetch('http://localhost:5000/products');
            const data = await result.json();
            // Filter out entries with missing ID or other essential data
            const filteredData = data.filter(product => product._id && product.name && product.price && product.category && product.company);
            setProducts(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handelDeleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete'
        })
        result = await result.json()
        if(result)
        {
            alert('deleted Successfully')
            collectData()
        }
    }


    return (
        <div className="container">
            <table className="table table-responsive table-striped-columns table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>

                            <td>
                            <Link to={`/UpdateProduct/${product._id}`}>
                                <button type="button" className="btn btn-primary">Update</button>
                            </Link>
                            </td>

                            <td><button type="button" className="btn btn-danger"
                             onClick={ () =>handelDeleteProduct(product._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
