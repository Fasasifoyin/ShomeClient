import React, { useState, useEffect } from "react";
import PagesStart from "../component/PagesStart";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logout from "../utils/Logout";

import DashBoard from "../component/DashBoard";
import AccountDetails from "../component/AccountDetails";
import ChangePassword from "../component/ChangePassword";

import { useSelector, useDispatch } from "react-redux";
import { logout, selectedUser } from "../features/UserSlice";
import MyProducts from "../component/MyProducts";
import CreateProduct from "../component/CreateProduct";
import Alluser from "../component/Alluser";
import Order from "../component/Order";

const Account = () => {
  const [active, setActive] = useState("first");
  const user = useSelector(selectedUser);

  const [out, setOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggingOut = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (out) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [out]);

  return (
    <>
      <div className="mb-5">
        <PagesStart page={"ACCOUNT"} />
        <Container className="mt-5">
          <Row className="gy-4">
            <Col xl={3} md={3}>
              <div
                className="d-flex flex-column w-100"
                style={{
                  boxShadow: "1px 1px 2px rgb(0,0,0,0.4)",
                }}
              >
                <div
                  onClick={() => setActive("first")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "first" ? "#eb3e32" : "white",
                    color: active === "first" ? "white" : "black",
                  }}
                >
                  <span>Dashboard</span>
                </div>
                <div
                  onClick={() => setActive("second")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "second" ? "#eb3e32" : "white",
                    color: active === "second" ? "white" : "black",
                  }}
                >
                  <span>Orders</span>
                </div>
                <div
                  onClick={() => setActive("third")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "third" ? "#eb3e32" : "white",
                    color: active === "third" ? "white" : "black",
                  }}
                >
                  <span>Account Details</span>
                </div>
                <div
                  onClick={() => setActive("fourth")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "fourth" ? "#eb3e32" : "white",
                    color: active === "fourth" ? "white" : "black",
                  }}
                >
                  <span>Change Password</span>
                </div>

                <div
                  onClick={() => setActive("fifth")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "fifth" ? "#eb3e32" : "white",
                    color: active === "fifth" ? "white" : "black",
                  }}
                >
                  <span>Products</span>
                </div>
                <div
                  onClick={() => setActive("seventh")}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                    borderBottom: "0px",
                    backgroundColor: active === "seventh" ? "#eb3e32" : "white",
                    color: active === "seventh" ? "white" : "black",
                  }}
                >
                  <span>Users</span>
                </div>
                <div
                  onClick={() => setOut(true)}
                  className="d-flex align-items-center px-2 cursor accountDivs"
                  style={{
                    height: "60px",
                    border: "1px solid rgb(0,0,0,0.2)",
                  }}
                >
                  <span>Log out</span>
                </div>
              </div>
            </Col>

            <Col xl={9} md={9}>
              {active === "first" && <DashBoard user={user} />}
              {active === "second" && <Order user={user} />}
              {active === "third" && <AccountDetails user={user} />}
              {active === "fourth" && <ChangePassword user={user} />}

              {active === "fifth" && (
                <MyProducts user={user} setActive={setActive} />
              )}
              {active === "sixth" && (
                <CreateProduct user={user} setActive={setActive} />
              )}

              {active === "seventh" && <Alluser user={user} />}
            </Col>
          </Row>
        </Container>
      </div>
      {out && (
        <Logout
          close={setOut}
          action={loggingOut}
          actionName={"Logout"}
          actionType={"Are you sure you want to logout"}
        />
      )}
    </>
  );
};

export default Account;
