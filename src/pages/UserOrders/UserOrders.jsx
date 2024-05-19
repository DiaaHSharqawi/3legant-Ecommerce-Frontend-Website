import React, { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders/useOrders";
import style from "./assets/css/userOrders.module.css";
import removeIcon from "./assets/images/icons/removeIcon.svg";
import ReactPaginate from "react-paginate";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

function UserOrders() {
  const { orders, loader, setOrders } = useOrders();
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  useEffect(() => {
    orders ? setNumberOfPages(Math.ceil(orders.length / itemPerPage)) : 0;
  }, [numberOfPages, orders]);
  useEffect(() => {
    if (orders) {
      const endOffset = currentPage * itemPerPage + itemPerPage;
      setCurrentOrders(orders.slice(currentPage * itemPerPage, endOffset));
    }
  }, [orders, currentPage]);

  const handlePageClick = (e) => {
    const newPage = e.selected;
    setCurrentPage(newPage);
  };

  const cancelOrder = async (e, orderID, orderStatus) => {
    console.log(orderID);
    const isDeliveredOrder = orderStatus == "deliverd";
    if (!isDeliveredOrder) {
      try {
        const BASE_API_URL = import.meta.env.VITE_API_URL;
        const API_URL = `${BASE_API_URL}/order/cancel/${orderID}`;
        const token = localStorage.getItem("userToken");
        if (token) {
          const { data } = await axios.patch(
            API_URL,
            {},
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          console.log(data);
          if (data.message == "success") {
            setOrders(orders.filter((order) => order._id !== orderID));
          }
        }
      } catch (error) {
        console.log(`error is : ${error}`);
        console.log(error);
        if (error.response.data.message == "can't cancel this order") {
          toast.error(`You can't cancel Delivered order`, {
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
      } finally {
      }
    } else {
      toast.error(`You can't cancel Delivered order`, {
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
  };

  return (
    <div className="UserOrderSection my-5">
      <div className="container">
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
          <div className="row gap-5 align-items-center justify-content-center">
            {currentOrders &&
              currentOrders.map((order) => (
                <div key={order._id} className={`col-12 col-xl-6 ${order._id}`}>
                  <div className={`cartTable ${style.cartTable}`}>
                    <p className="text-center"> Order</p>
                    <div className="row my-5 flex-column flex-xl-column justify-content-center align-items-center gap-5">
                      <div className="col-12 col-xl-12">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th
                                scope="col"
                                className="d-none d-xl-table-cell"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="d-none d-xl-table-cell"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="d-none d-xl-table-cell"
                              >
                                Subtotal
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products &&
                              order.products.map((product) => (
                                <tr key={product.productId}>
                                  <th scope="row" className="w-100 w-xl-80">
                                    <div className="row flex-row flex-xl-row">
                                      <div className="col-6 col-xl-6 px-0">
                                        <div
                                          className={`productImage ${style.productImage}`}
                                        >
                                          <div className="row">
                                            <div className="col-12 col-xl-10">
                                              <img
                                                src={
                                                  product.productId.mainImage
                                                    .secure_url
                                                }
                                                className="img-fluid w-100"
                                                alt="Product"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 col-xl-6 px-0">
                                        <div className="row gap-5 flex-column flex-xl-row ">
                                          <div className="col-12 px-0">
                                            <div className="productName">
                                              {product.productId.name}
                                            </div>
                                          </div>
                                          <div className="col-12 d-block d-xl-none px-0">
                                            <div className="quantity w-100">
                                              <div className="row align-items-center justify-content-start">
                                                <div className="col-12 px-0">
                                                  <div className="input-group w-auto justify-content-center justify-content-xl-start align-items-start gap-1">
                                                    <span className="text-center">
                                                      {product.quantity}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </th>
                                  <td className="px-0 d-none d-xl-table-cell">
                                    <div className="quantity w-100">
                                      <div className="row align-items-center justify-content-start">
                                        <div className="col-12 px-0">
                                          <div className="input-group w-auto justify-content-center align-items-start gap-1">
                                            <span className="text-center">
                                              {product.quantity}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center d-none d-xl-table-cell">
                                    ${product.productId.finalPrice}
                                  </td>
                                  <td className="text-center">
                                    $
                                    {product.quantity *
                                      product.productId.finalPrice}
                                  </td>
                                  <td>
                                    <div className="col-12 px-0 w-100 h-100">
                                      <div
                                        className={`remove w-100 ${style.remove}`}
                                        onClick={(e) =>
                                          removeItemFromCart(
                                            e,
                                            product.productId
                                          )
                                        }
                                        disabled={true}
                                      ></div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className={`status`}>
                          <div className="row align-items-center">
                            {order.status === "deliverd" && (
                              <div className="deliveredStatus row align-items-center">
                                <div className="col-xl-6">
                                  <div
                                    className={`delivered text-center ${style.delivered}`}
                                  >
                                    <span>Delivered</span>
                                  </div>
                                </div>
                                <div className="col-xl-6 text-center">
                                  <span>Your Order has been delivered</span>
                                </div>
                              </div>
                            )}
                            {order.status === "pending" && (
                              <div className="pendingStatus row align-items-center">
                                <div className="col-4">
                                  <div
                                    className={`pending text-center ${style.pending}`}
                                  >
                                    <span className="col-xl-6 text-center">
                                      Pending
                                    </span>
                                  </div>
                                </div>
                                <div className="col-xl-8 text-center">
                                  <span>Your Order is pending</span>
                                </div>
                              </div>
                            )}
                            {order.status === "cancelled" && (
                              <div className="pendingStatus row align-items-center justify-content-center">
                                <div className="col-xl-6">
                                  <div
                                    className={`pending text-center ${style.pending}`}
                                  >
                                    <span>Cancelled</span>
                                  </div>
                                </div>
                                <div className="col-xl-6 text-center">
                                  <span>Your Order is cancelled</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="finalPrice text-center my-3">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <span>Final Price:</span>
                              <span className="mx-3">${order.finalPrice}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`cancelOrder text-center my-3 ${style.cancelOrder}`}
                        >
                          <div className="row justify-content-center align-items-center">
                            <div className="col-6 px-0 text-center ">
                              <span
                                className="btn"
                                onClick={(e) =>
                                  cancelOrder(e, order._id, order.status)
                                }
                              >
                                Cancle Order
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="pagination justify-content-center mx-auto">
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={6}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
