import React from "react";
import "./assets/css/newsFeed.css";
import clothesImage1 from "./assets/images/clothes1.png";
import clothesImage2 from "./assets/images/clothes2.png";
import clothesImage3 from "./assets/images/clothes3.png";
import watchImage from "./assets/images/watch.png";

function NewsFeedSection() {
  return (
    <>
      <div className="News-Feed-Section">
        <div className="container">
          <div className="row flex-column gap-3  text-center">
            <div className="header">
              <p className="text-uppercase news-feed fs-5">newsfeed</p>
              <h2 className="text-capitalize instagram">instagram</h2>
              <p className="fs-5">
                Follow us on social media for more discount & promotions
              </p>
              <span className="instagramID fs-5">@3legant_official</span>
            </div>

            <div className="gallery gy-3">
              <div className="row gap-3">
                <div className="col d-flex justify-content-center">
                  <div className="image">
                    <img
                      src={watchImage}
                      alt="watch 3legant"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="image">
                    <img
                      src={clothesImage1}
                      alt="clothes 3legant"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="image">
                    <img
                      src={clothesImage2}
                      alt="clothes 3legant"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="image">
                    <img
                      src={clothesImage3}
                      alt="clothes 3legant"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsFeedSection;
