const mongoose = require('mongoose')
const cors = require("cors");
const express = require('express')
const app = express()

require('./db/config')
const Products = require('./db/Product')

app.use(express.json())
app.use(cors());

// create 
app.post('/add-product', async (req, res) => {
    const product = new Products(req.body)
    let result = await product.save()
    res.send(req.body)
})


// Read
app.get('/products', async (req, res) => {
    const products = await Products.find()
    if(products.length){
        res.send(products)
    } else{
        res.send({result: "items not found"})
    }
    
})


// Update, getting data id wise 
app.get('/product/:id', async (req, res) => {
    try {
        let result = await Products.findOne({ _id: req.params.id });
    
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "Product not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


// updating data 
app.put('/product/:id', async (req, res) => {
    try {
      let result = await Products.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ result: "Internal Server Error" });
    }
  });

// delete
app.delete('/product/:id', async (req, res) => {
    let result = await Products.deleteOne({ _id: req.params.id })
    res.send(result)
})







app.listen(5000, () => {
    console.log('server is running at 5000')
})








// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// require('./db/config');
// const Products = require('./db/Product');

// app.use(express.json());

// app.post('/add-product', async (req, res) => {
//     try {
//         const product = new Products(req.body);
//         await product.save();
//         res.status(201).send(product); // Sending the saved product as a response
//     } catch (error) {
//         res.status(500).send(error.message); // Handling potential errors
//     }
// });

// app.listen(5000, async () => {
//     try {
//         await connect(); // Ensure the database connection is established before starting the server
//         console.log('Connected to the database');
//         console.log('Server is running at 5000');
//     } catch (error) {
//         console.error('Error connecting to the database:', error.message);
//     }
// });
