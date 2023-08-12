import React, { useEffect, useState, useRef, useCallback } from "react";
import PagesStart from "../component/PagesStart";
import { Row, Col, Container } from "react-bootstrap";

import ProductsLayout1 from "../component/ProductsLayout1";
import Spinner2 from "../utils/Spinner2";

import { getProducts } from "../actions/Products";
import { allProducts, allStatus, allError } from "../features/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import TrendFeaturedStart from "../component/TrendFeaturedStart";

const AllProducts = () => {
  const products = useSelector(allProducts);
  const [data, setData] = useState([]);
  const error = useSelector(allError);
  const status = useSelector(allStatus);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();

  const lastProduct = useCallback(
    (node) => {
      if (status === "pending") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    setData((prevData) => {
      return [...new Set([...prevData, ...products])];
    });
    setHasMore(products.length > 0);
  }, [products]);

  return (
    <div className="mb-5">
      <PagesStart page={"Products Page"} />
      <TrendFeaturedStart
        title={"Products"}
        body={"There are many variations of passages of Lorem Ipsum available"}
      >
        <Container>
          {status === "rejected" && <p className="text-center">{error}</p>}
          {data.length > 0 && (
            <Row className="gy-3">
              {data.map((each, index) => (
                <Col
                  key={index}
                  md={6}
                  xl={3}
                  ref={index === data.length - 1 ? lastProduct : null}
                >
                  <ProductsLayout1 each={each} index={index} />
                </Col>
              ))}
            </Row>
          )}
          {status === "pending" && <Spinner2 />}
        </Container>
        <div className="text-center mt-2">
          {hasMore === false && data.length > 0 && (
            <span className="text-dark text-break small">
              That is all available products...
            </span>
          )}
        </div>
      </TrendFeaturedStart>
    </div>
  );
};

export default AllProducts;
