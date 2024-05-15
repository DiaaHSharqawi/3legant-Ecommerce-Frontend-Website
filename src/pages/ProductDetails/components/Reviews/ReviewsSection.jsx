import React, { useEffect, useState } from "react";
import emptyStarIcon from "./assets/images/icons/emptyStartIcon.svg";
import starIcon from "./assets/images/icons/startIcon.svg";
import style from "./assets/css/reviewsSection.module.css";
import ReactPaginate from "react-paginate";
import { Oval } from "react-loader-spinner";
function ReviewsSection({ reviews }) {
  const itemPerPage = 4;
  const numberOfPages = Math.ceil(reviews.length / itemPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviewsLoader, setReviewsLoader] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    console.log(itemOffset, endOffset);
    console.log("use effect : ", reviews.slice(itemOffset, endOffset));
    setDisplayedReviews(reviews.slice(itemOffset, endOffset));
  }, []);

  const handlePageClick = (e) => {
    setReviewsLoader(true);

    const pageClicked = e.selected + 1;
    console.log("pageClicked", pageClicked);

    const newOffset = (pageClicked - 1) * itemPerPage;
    console.log("new offset ", newOffset);

    setItemOffset(newOffset);
    console.log("item new offset", newOffset);

    const endOffset = newOffset + itemPerPage;
    console.log("start ,end : ", newOffset, endOffset);

    setDisplayedReviews(reviews.slice(newOffset, endOffset));

    setReviewsLoader(false);
  };

  return (
    <>
      <div className={`ReviewsSection `}>
        <div className="container">
          <div className="row gap-5">
            <div className="reviewsHeader">
              <h2>Reviews</h2>
            </div>
            {reviewsLoader ? (
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
            ) : (
              <>
                <div className="reviews">
                  <div className="row gap-5">
                    {displayedReviews.map((review) => (
                      <div
                        className={`review ${style.review}`}
                        key={review._id}
                      >
                        <div className="row">
                          <div className=" col-3 col-xl-1">
                            <div className="createdByImage">
                              <div className="col-xl-12">
                                <div
                                  className={`personImage ${style.personImage}`}
                                >
                                  {
                                    <img
                                      src={review.createdBy.image.secure_url}
                                      className="img-fluid rounded-circle"
                                      key={review.createdBy.image.public_id}
                                    />
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-9 col-xl-11">
                            <div className="reviewDetails">
                              <div className="row gap-3">
                                <div className="col-12">
                                  <div className="createdByName">
                                    <span className="fs-5 fw-bold">
                                      {review.createdBy.userName}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="stars">
                                    {Array.from(
                                      {
                                        length: Math.ceil(
                                          review && review.rating
                                        ),
                                      },
                                      (_, index) => (
                                        <img src={starIcon} />
                                      )
                                    )}
                                    {Array.from(
                                      { length: 5 - review.rating },
                                      (_, index) => (
                                        <img src={emptyStarIcon} />
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="comment">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pagination justify-content-center">
                  <>
                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={numberOfPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewsSection;
