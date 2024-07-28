import React from "react";
import { categoryobj } from "./categoryFullobj";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css"

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryobj.map((obj, index) => (
        <CategoryCard data={obj} key={index} />
      ))}
    </section>
  );
}

export default Category;
