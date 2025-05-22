import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import NavBarLogo from "../../components/Logo/NavBarLogo";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";
import useCategories from "../../hooks/useCategories/useCategories";
import style from "./assets/css/categories.module.css";

function Categories() {
  const { categories, loader, firstCategoryID } = useCategories();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productLoader, setProductLoader] = useState(false);
  const [categoryID, setCategoryID] = useState(firstCategoryID);
  const [availableSoon, setAvailableSoon] = useState(false);
  const { isLogin } = useContext(UserLoginContext);
  const navigate = useNavigate();

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const ITEM_PER_PAGE = 4;
  console.log(`im here and first cat Id is ${firstCategoryID}`);

  const showProductByCategory = async (categoryID = firstCategoryID) => {
    console.log(`im here and first cat Id is : ${categoryID}`);
    if (availableSoon) setAvailableSoon(false);
    setProductLoader(true);
    console.log("showProductByCategory");
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/products/category/${
      categoryID || firstCategoryID
    }`;
    console.log(`api url : ${API_URL}`);

    try {
      const { data } = await axios.get(API_URL);
      console.log(data);
      if (data.products.length === 0) setAvailableSoon(true);
      else setAvailableSoon(false);
      console.log(JSON.stringify(data));
      console.log(data.products);
      setCategoryProducts(data.products.slice(itemOffset, ITEM_PER_PAGE));
      setNumberOfPages(Math.ceil(data.products.length / ITEM_PER_PAGE));
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setProductLoader(false);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    showProductByCategory(categoryID);
  }, [categoryID]);

  useEffect(() => {
    if (firstCategoryID) showProductByCategory(firstCategoryID);
  }, [firstCategoryID]);

  const checkLogin = (e, productID) => {
    e.preventDefault();
    console.log("checkLogin", productID);

    if (!isLogin) {
      toast.info("You have to login before see the details", {
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
      navigate("/auth/login");
    } else {
      navigate(`/products/${productID}`);
    }
  };

  const handlePageClick = (e) => {
    const pageClicked = e.selected + 1;
    console.log("pageClicked", pageClicked);

    const newOffset = (pageClicked - 1) * ITEM_PER_PAGE;
    console.log("new offset ", newOffset);

    setItemOffset(newOffset);
    console.log("item new offset", newOffset);

    const endOffset = newOffset + ITEM_PER_PAGE;
    console.log("start ,end : ", newOffset, endOffset);

    setCategoryProducts(data.products.slice(newOffset, endOffset));
  };

  return (
    <>
      <section className={`categoriesSection my-5 ${style.categoriesSection}`}>
        <div className="container my-5">
          <div className="row">
            <div className="col-xl-3">
              <div className="left">
                <div className="row flex-column">
                  <div className="categories">
                    <div className="col-sm-12 col-xl-12">
                      <p className="fs-5 text-capitalize text-center">
                        Categories
                      </p>
                      <hr />
                      {loader ? (
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
                        <div className="categories-menu overflow-auto">
                          <div className="list-group flex-row flex-xl-column">
                            {categories.map((category) => (
                              <Link
                                to="#"
                                key={category._id}
                                className={`list-group-item py-sm-0 py-xl-4 list-group-item-action text-center ${
                                  category._id === categoryID ? "active" : ""
                                }`}
                                onClick={() => setCategoryID(category._id)}
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-10"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-9">
              <div className="right my-5">
                {!availableSoon ? (
                  productLoader ? (
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
                    <div className="products d-flex justify-content-center">
                      <div className="row flex-column flex-xl-row align-items-center ">
                        {categoryProducts.map((product) => (
                          <div
                            className="col-sm-12 col-xl-4 my-3"
                            key={product._id}
                          >
                            <div
                              className={`product ${style.product} `}
                              key={product._id}
                            >
                              <div className="row flex-column gap-3 text-center w-100 h-100">
                                <div
                                  className={`productImage ${style.productImage}`}
                                >
                                  <img
                                    src={product.mainImage.secure_url}
                                    alt=""
                                    className="img-fluid"
                                    key={product.mainImage.public_id}
                                  />
                                </div>
                                <p> {product.name}</p>
                                <span className="fs-4">
                                  ${product.finalPrice}
                                </span>
                                <Link
                                  className="btn btn-dark"
                                  onClick={(e) => checkLogin(e, product._id)}
                                >
                                  See Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  <div className={`coming-soon`}>
                    <div className="row gap-5">
                      <div className="col-12">
                        <div className="logo mx-auto">
                          <NavBarLogo />
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className={`commingSoonText ${style.commingSoonText} fw-bold text-danger text-center fs-1`}
                        >
                          Coming Soon!
                        </div>
                        <div className="col-12">
                          <div className="smile-face text-center">
                            <svg
                              width="100px"
                              height="100px"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!availableSoon ? (
                <div className="pagination justify-content-center mx-auto">
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
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Categories;
