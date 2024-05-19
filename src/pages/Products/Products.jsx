import React, { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./assets/css/products.module.css";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";
import { Bounce, toast } from "react-toastify";

function Products() {
  console.log("products ere");
  const { isLogin } = useContext(UserLoginContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [filterOption, setFilterOption] = useState(null);
  const [search, setSearch] = useState(null);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: null,
    maxPrice: null,
  });
  const getProducts = async () => {
    console.log("get prod", priceFilter);

    const BASE_API_URL = import.meta.env.VITE_API_URL;
    let API_URL = `${BASE_API_URL}/products?page=${currentPage}&limit=${productsPerPage}`;
    if (filterOption) {
      API_URL += `&sort=${filterOption}`;
    }
    if (search) {
      API_URL += `&search=${search}`;
    }
    if (priceFilter.minPrice) {
      API_URL += `&price[gte]=${priceFilter.minPrice}`;
      console.log("min price");
    }
    if (priceFilter.maxPrice) {
      API_URL += `&price[lte]=${priceFilter.maxPrice}`;
    }
    console.log("api url : ", API_URL);
    try {
      setLoader(true);
      const { data } = await axios.get(API_URL);
      console.log("get prducts : ", products);
      if (data.message == "success") {
        setProducts(data.products);
        setTotalPage(Math.ceil(data.total / productsPerPage));
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

  const handelSelectFiltter = async (e) => {
    e.preventDefault();
    const FiltterOption = e.target.value;
    setFilterOption(FiltterOption);
  };

  const handelSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    console.log("search :", search);
    setSearch(search);
  };
  useEffect(() => {
    getProducts();
  }, [filterOption, search, priceFilter]);

  const handelPriceFiltterChange = (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log("hadel input change");
    const { name, value } = e.target;
    setPriceFilter({
      ...priceFilter,
      [name]: value,
    });
  };

  return (
    <>
      <section className="Products-Section my-5">
        <div className="container my-5">
          <div className="row">
            <div className="col-12">
              <div className="FiltterSearchBar my-5">
                <div className="row flex-column">
                  <nav className="navbar navbar-light bg-light row gap-3">
                    <div className="col-6">
                      <form className="form-inline">
                        <div className="row">
                          <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handelSearch}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-6">
                      <div className="filtter">
                        <div class="form-group col-md-4 w-100">
                          <div className="row align-items-center">
                            <div className="col-2">
                              <label for="inputState">Filtter</label>
                            </div>
                            <div className="col-10">
                              <select
                                id="inputState"
                                class="form-select"
                                onChange={handelSelectFiltter}
                              >
                                <option selected>name</option>
                                <option>-name</option>
                                <option>price</option>
                                <option>-price</option>
                                <option>discount</option>
                                <option>-discount</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="minMaxPrice">
                        <form>
                          <div className="row">
                            <div className="col-4">
                              <div className="min">
                                <div class="input-group input-group-sm mb-3">
                                  <div class="input-group-prepend"></div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Min price"
                                    id="minPrice"
                                    name="minPrice"
                                    onChange={handelPriceFiltterChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="max">
                                <div class="input-group input-group-sm mb-3">
                                  <div class="input-group-prepend"></div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Max price"
                                    id="maxPrice"
                                    name="maxPrice"
                                    onChange={handelPriceFiltterChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="submit">
                                <button type="button" class="btn btn-dark">
                                  GO
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
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
                    <div className="row flex-column flex-xl-row align-items-center w-100 ">
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
                              <span
                                className={
                                  product.discount > 0
                                    ? `fs-4 discount ${style.discount}`
                                    : `fs-4`
                                }
                              >
                                ${product.finalPrice}
                              </span>
                              {product.discount > 0 ? (
                                <div className={`discount`}>
                                  <span className="fs-4">
                                    $
                                    {product.finalPrice -
                                      product.finalPrice *
                                        (product.discount / 100)}
                                  </span>
                                </div>
                              ) : null}
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
