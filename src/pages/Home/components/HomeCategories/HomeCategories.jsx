import useCategories from "./../../../../hooks/useCategories/useCategories";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homeCategoriesSwiper.css";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function HomeCategories() {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);

  const { categories, loader } = useCategories();

  console.log(categories);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Ensure arrows are always visible
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Bootstrap md breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows for small screens
        },
      },
      {
        breakpoint: 576, // Bootstrap xs breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows for extra small screens
        },
      },
    ],
  };

  return (
    <>
      <section className="Home-Categories-Section container my-5">
        <h2 className="text-capitalize fw-bold">browse by category</h2>
        {!loader ? (
          <div className="slider-container my-5">
            <div className="products justify-content-center align-items-center">
              <Slider {...settings}>
                {categories.map((category) => (
                  <div className="product ratio ratio-4x3" key={category.id}>
                    <Link to="/categories">
                      <img
                        src={category.image.secure_url}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <div className="loader mx-auto my-5 d-flex justify-content-center">
            <Oval
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </section>
    </>
  );
}

export default HomeCategories;
