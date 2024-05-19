import React, { useContext, useEffect, useState } from "react";
import emptyStarIcon from "./assets/images/icons/emptyStartIcon.svg";
import starIcon from "./assets/images/icons/startIcon.svg";
import style from "./assets/css/reviewsSection.module.css";
import ReactPaginate from "react-paginate";
import { Oval } from "react-loader-spinner";
import { UserLoginContext } from "../../../../contexts/useLogin/useLogin";
import useOrders from "../../../../hooks/useOrders/useOrders";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
function ReviewsSection({ reviews, productID }) {
  const itemPerPage = 4;
  const numberOfPages = Math.ceil(reviews.length / itemPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviewsLoader, setReviewsLoader] = useState(false);
  const { userID } = useContext(UserLoginContext);
  const [review, setReview] = useState({
    comment: "",
    rating: 1,
  });

  useEffect(() => {
    if (reviews) {
      setReviewsLoader(false);
    } else setReviewsLoader(true);
  }, [reviews]);

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

  const handelChangeWriteReviewInput = (e) => {
    e.preventDefault();
    console.log("hadel input change");
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const checkBoughtProduct = async () => {
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/order`;
    let canComment = false;
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        console.log(data);
        if (data.message == "success") {
          data.orders.forEach((order) => {
            order.products.forEach((product) => {
              if (product.productId._id == productID) {
                console.log("yes");
                canComment = true;
              }
            });
          });
        }
      }
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    }
    return canComment;
  };

  const handelWriteComment = async (e) => {
    e.preventDefault();
    console.log(review);
    const canComment = await checkBoughtProduct();
    if (!canComment) {
      toast.error(`U have to buy the product first before write a review`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/products/${productID}/review`;
      console.log(API_URL);
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const { data } = await axios.post(API_URL, review, {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          });
          console.log(data);
          if (data.message == "success") {
            toast.success(`Thank you for your review !`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }
      } catch (error) {
        console.log(`error is : ${error}`);
        console.log(error);
        if (error.response.data.message == "already review ") {
          toast.error(`already reviewed`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(`${error.response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    }
  };
  {
    (function () {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }
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
                <div className={`writeReview`}>
                  <div className="comment">
                    <div className="row">
                      <form
                        action=""
                        onSubmit={handelWriteComment}
                        className="needs-validation"
                      >
                        <div className="row gap-4 flex-column">
                          <div className="col-12">
                            <div className="rating">
                              <div className="row align-items-center">
                                <div className="col-12 col-xl-1">
                                  <label htmlFor="Rating">Rating</label>
                                </div>
                                <div className="col-12 col-xl-1">
                                  <select
                                    class="form-select"
                                    aria-label="Rating"
                                    onChange={handelChangeWriteReviewInput}
                                    name="rating"
                                    id="rating"
                                    required
                                  >
                                    <option selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div class="input-group">
                              <div className="row">
                                <div className="col-12 col-xl-6">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text h-100">
                                      Leave a comment
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-xl-6">
                                  <textarea
                                    class="form-control"
                                    aria-label="With textarea"
                                    onChange={handelChangeWriteReviewInput}
                                    name="comment"
                                    id="comment"
                                    required
                                  ></textarea>
                                </div>
                                <div className="valid-feedback">
                                  Looks good!
                                </div>
                                <div className="invalid-feedback">
                                  Please Make sure to Write Review
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="submitComment text-center">
                              <button type="submit" class="btn btn-dark">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <hr />
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
