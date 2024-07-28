import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../components/Api/endPonit";
import ProductList from '../../components/Product/ProductList'
import classes  from './result.module.css'
import Loader from "../../components/Loader/Loader";
function Result() {
  const [results, setresults] = useState([]);
  const { categoryName } = useParams();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setresults(res.data);
        setloading(false)
  
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
      
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Result</h1>
        <p style={{ padding: '30px' }}>category / {categoryName}</p>
        <hr />
        {loading ? (<Loader />) : (
          <div className={classes.product_container}>
          {
            results?.map((product) => (
              <ProductList key={product.id} product={product} renderAdd={true} />
            ))
          }

        </div>
        )}
        
      </section>
    </Layout>
  );
}

export default Result;
