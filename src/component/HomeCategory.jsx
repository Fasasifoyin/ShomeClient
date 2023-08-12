import React, { useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner2 from "../utils/Spinner2";

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/Products";
import {
  Categories,
  CategoriesStatus,
  CategoriesError,
} from "../features/CategorySlice";

const HomeCategory = () => {
  const categories = useSelector(Categories);
  const Cstatus = useSelector(CategoriesStatus);
  const Cerror = useSelector(CategoriesError);

  const dispatch = useDispatch()

  useEffect(() => {
    if (Cstatus === "idle") {
      dispatch(getCategories());
    }
  }, [dispatch, Cstatus]);

  return (
    <Container className="mb-5">
      <div className="d-flex flex-column gap-4 w-100">
        <div className="d-flex flex-column gap-2 text-center align-items-center justify-content-center">
          <h1 className="mb-0">CATEGORIES</h1>
          <p>There are many variations of passages of Lorem Ipsum available</p>
        </div>
        {Cstatus === "pending" && <Spinner2 />}
        {Cstatus === "failed" && <p className="text-center">{Cerror}</p>}
        {Cstatus === "success" && (
          <div className="d-flex flex-column gap-5 flex-lg-row justify-content-between">
            {categories.map((each) => (
              <Link to={`/categories/${each.name}`} key={each._id}>
                <div className="categories-div position-relative">
                  <Image
                    style={{ objectFit: "cover" }}
                    className="w-100 h-100"
                    src={each.image}
                  />
                  <div
                    className="position-absolute translate-middle-x start-50"
                    style={{ top: "10px" }}
                  >
                    <p
                      className="text-break fw-bold fs-3"
                      style={{ color: "#eb3e32", letterSpacing: "3px" }}
                    >
                      {each.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default HomeCategory;
