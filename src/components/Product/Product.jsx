import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setproduct] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproduct(res.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);
  return <>
    {loading ? (<Loader />) : (
      <section className={classes.product_contanier}>
      {product?.map((singleProduct) => (
        <ProductList product={singleProduct} key={singleProduct.id} renderAdd={true} />
      ))}
    </section>
    )}
    
    ;
  </>;
}

export default Product;
