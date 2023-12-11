import "./App.css";
import Addproduct from "./components/Addproduct";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Home from "./components/Home";
import CardData from "./components/CardData";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addProduct" element={<Addproduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/CardData" element={<CardData />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
