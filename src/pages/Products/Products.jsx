import React, { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./assets/css/products.module.css";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";

function Products() {
  console.log("products ere");
  const { isLogin } = useContext(UserLoginContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const getProducts = async () => {
    console.log("get prod");

    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/products?page=${currentPage}&limit=${productsPerPage}`;
    console.log("api url : ", API_URL);
    try {
      setLoader(true);
      const { data } = await axios.get(API_URL);
      console.log("get prducts : ", products);
      if (data.message == "success") {
        setProducts(data.products);
        setTotalPage(data.total / productsPerPage);
      }
      console.log(data);
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [currentPage]);
  const handlePageClick = (e) => {
    console.log("handlePageClick", e.selected);
    const seleted = e.selected + 1;
    setCurrentPage(seleted);
  };

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

  return (
    <>
      <section className="Products-Section my-5">
        <div className="container my-5">
          <div className="row">
            <div className="col-12">
              <div className="up">
                <div className="row text-center">
                  <div className="col-12">
                    <h1>Products</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-12">
              <div className="end my-5">
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
                  <div
                    className={`products d-flex justify-content-center align-items-center flex-column`}
                  >
                    <div className="row flex-column flex-xl-row align-items-center ">
                      {products.map((product) => (
                        <div
                          className="col-sm-12 col-xl-3 my-3 align-items-center h-100"
                          key={product._id}
                        >
                          <div
                            className={`product ${style.product} flex-grow-1`}
                            key={product._id}
                          >
                            <div className="row flex-column gap-3 text-center flex-fill h-100 justify-content-around">
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
                )}
              </div>
            </div>
            <div className="col-sm-12 col-xl-12">
              <div className="pagination justify-content-center">
                <>
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPage}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
