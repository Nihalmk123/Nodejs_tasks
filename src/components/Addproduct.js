import React, { useState } from 'react'

const Addproduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')

const HandleAddProduct = async() => {
    // console.warn(name, price, category, company)

    let result = await fetch('http://localhost:5000/add-product', {
        method: 'post',
        body: JSON.stringify({name, price, category, company}),
        headers:{'Content-Type':'application/json'}
    })
    result = await result.json()
    console.warn(result)
}

  return (
      <>
       <div class='add-product'>
       <h3 className='text-center'>Add Product</h3>

        <input type='text' className='input-box' placeholder='Enter poduct name' value={name} 
        onChange={ (e) => setName(e.target.value)}/>
        <input type='text' className='input-box' placeholder='Enter poduct price' value={price}
        onChange={ (e) => setPrice(e.target.value)}/>
        <input type='text' className='input-box' placeholder='Enter poduct category' value={category}
        onChange={ (e) => setCategory(e.target.value)}/>
        <input type='text' className='input-box' placeholder='Enter poduct company' value={company}
        onChange={ (e) => setCompany(e.target.value)}/>
        <button type='button' className='button' onClick={HandleAddProduct}>Add Product</button>
    </div>
    </>
 
  )
}

export default Addproduct
