import React, { useEffect } from "react";
import HeroSection from "../component/HeroSection";
import HomeCategory from "../component/HomeCategory";
import { Col, Container, Row } from "react-bootstrap";
import Spinner2 from "../utils/Spinner2";
import TrendFeaturedStart from "../component/TrendFeaturedStart";
import ProductsLayout1 from "../component/ProductsLayout1";
import ProductsLayout2 from "../component/ProductsLayout2";

import { useDispatch, useSelector } from "react-redux";
import { getFeatured, getTrend } from "../actions/Products";
import {
  Featured,
  featuredStatus,
  featuredError,
} from "../features/FeaturedSlice";
import {
  Trending,
  trendingError,
  trendingStatus,
} from "../features/TrendSlice";

const Home = () => {
  const dispatch = useDispatch();

  const featured = useSelector(Featured);
  const Fstatus = useSelector(featuredStatus);
  const Ferror = useSelector(featuredError);

  const trend = useSelector(Trending);
  const Tstatus = useSelector(trendingStatus);
  const Terror = useSelector(trendingError);

  useEffect(() => {
    if (Fstatus === "idle") {
      dispatch(getFeatured());
    }
  }, [dispatch, Fstatus]);

  useEffect(() => {
    if (Tstatus === "idle") {
      dispatch(getTrend());
    }
  }, [dispatch, Tstatus]);

  return (
    <div className="mt-4 mb-5">
      <div className="w-100 mb-5 hero-section">
        <HeroSection />
      </div>
      <HomeCategory />
      <Container className="mt-5">
        <TrendFeaturedStart
          title={"Featured Items"}
          body={
            "There are many variations of passages of Lorem Ipsum available"
          }
        >
          {Fstatus === "pending" && <Spinner2 />}
          {Fstatus === "rejected" && <p className="text-center">{Ferror}</p>}
          {Fstatus === "success" && (
            <Row className="gy-3">
              {featured.slice(0, 8).map((each, index) => (
                <Col key={index} md={6} xl={3}>
                  <ProductsLayout1 each={each} index={index} />
                </Col>
              ))}
            </Row>
          )}
        </TrendFeaturedStart>
        <TrendFeaturedStart
          title={"Trending Items"}
          body={
            "There are many variations of passages of Lorem Ipsum available"
          }
        >
          {Tstatus === "pending" && <Spinner2 />}
          {Tstatus === "rejected" && <p className="text-center">{Terror}</p>}
          {Tstatus === "success" && <ProductsLayout2 data={trend} />}
        </TrendFeaturedStart>
      </Container>
    </div>
  );
};

export default Home;
