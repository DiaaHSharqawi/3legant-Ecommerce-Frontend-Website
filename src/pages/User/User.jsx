import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./../../components/SideBar/SideBar";

function User() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-auto">
            <SideBar />
          </div>
          <div className="col-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
