import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            const result = await fetch(`http://localhost:5000/product/${params.id}`);
            const data = await result.json();
            setName(data.name);
            setPrice(data.price);
            setCategory(data.category);
            setCompany(data.company);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const updateProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: 'PUT', // Assuming you're using the PUT method for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    category,
                    company,
                }),
            });

            if (response.ok) {
                alert('Product updated successfully');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='add-product'>
            <h3 className='text-center'>Update Product</h3>
            <input type='text' className='input-box' placeholder='Enter product name' value={name}
                onChange={(e) => setName(e.target.value)} />
            <input type='text' className='input-box' placeholder='Enter product price' value={price}
                onChange={(e) => setPrice(e.target.value)} />
            <input type='text' className='input-box' placeholder='Enter product category' value={category}
                onChange={(e) => setCategory(e.target.value)} />
            <input type='text' className='input-box' placeholder='Enter product company' value={company}
                onChange={(e) => setCompany(e.target.value)} />
            <button type='button' className='button' onClick={updateProduct}>Update Product</button>
        </div>
    );
};

export default UpdateProduct;
