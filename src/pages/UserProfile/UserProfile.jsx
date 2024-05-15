import React, { useContext, useEffect } from "react";
import "./assets/css/userProfile.css";
import useProfile from "../../hooks/useProfile/useProfile";
import { Oval } from "react-loader-spinner";
function UserProfile() {
  const { userProfile, loader } = useProfile();
  try {
    console.log("inside component");
    console.log(userProfile, loader);
  } catch (error) {
    console.log("inside component error");
    console.log(error);
  }

  return (
    <>
      <section className="User-Profile-Section my-5">
        <div className="container">
          <div className="row">
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
              <div className="profile">
                <div className="row flex-column gap-5">
                  <h2 className="card-title text-center align-items-center">
                    User Profile
                  </h2>
                  <div
                    className="card text-center mx-auto"
                    style={{ width: "800px" }}
                  >
                    <img
                      className="card-img-top"
                      src={userProfile.image.secure_url}
                      alt="Card image cap"
                    />
                    <div className="card-body"></div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        UserName : {userProfile.userName}
                      </li>
                      <li className="list-group-item">
                        Email : {userProfile.email}
                      </li>
                      <li className="list-group-item">
                        Created At : {userProfile.createdAt}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfile;
