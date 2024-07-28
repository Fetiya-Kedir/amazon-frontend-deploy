import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./image/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './carousel.module.css'

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteloop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, index) => {
          return <img src={imageItem} key={index} />;
        })}
      </Carousel>

      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
