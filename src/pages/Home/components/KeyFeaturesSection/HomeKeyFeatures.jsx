import React from "react";
import freeShippingIcon from "./assets/images/icons/shippingIcon.svg";
import moneyBackIcon from "./assets/images/icons/moneyBackIcon.svg";
import securePaymentIcon from "./assets/images/icons/securePaymentIcon.svg";
import supportIcon from "./assets/images/icons/supportIcon.svg";
import "./assets/css/keyFeatures.css";

function HomeKeyFeatures() {
  return (
    <>
      <section className="HomeKeyFeatures my-5 py-5">
        <div className="features">
          <div className="container ">
            <div className="row gap-4">
              <div className="feature  col">
                <div className="feature-icon mb-3">
                  <img src={freeShippingIcon} alt="Free Shipping" />
                </div>
                <div className="feature-name fw-bold fs-20 mb-2">
                  <h2>Free Shipping</h2>
                </div>
                <div className="feature-description">
                  <p>Order above $200</p>
                </div>
              </div>
              <div className="feature col">
                <div className="feature-icon mb-3">
                  <img src={moneyBackIcon} alt="Money-back" />
                </div>
                <div className="feature-name fw-bold fs-20 mb-2">
                  <h2>Money-back</h2>
                </div>
                <div className="feature-description">
                  <p>30 days guarantee</p>
                </div>
              </div>
              <div className="feature col">
                <div className="feature-icon mb-3">
                  <img src={securePaymentIcon} alt="Secure Payments" />
                </div>
                <div className="feature-name fw-bold fs-20 mb-2">
                  <h2>Secure Payments</h2>
                </div>
                <div className="feature-description">
                  <p>Secured by Stripe</p>
                </div>
              </div>
              <div className="feature col">
                <div className="feature-icon mb-3">
                  <img src={supportIcon} alt="24/7 Support" />
                </div>
                <div className="feature-name fw-bold fs-20 mb-2">
                  <h2>24/7 Support</h2>
                </div>
                <div className="feature-description">
                  <p>Phone and Email support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeKeyFeatures;
