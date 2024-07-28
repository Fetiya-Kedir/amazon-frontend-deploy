import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";
function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
