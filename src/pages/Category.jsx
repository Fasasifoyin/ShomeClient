import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PagesStart from "../component/PagesStart";
import { Col, Container, Row } from "react-bootstrap";
import TrendFeaturedStart from "../component/TrendFeaturedStart";
import Spinner2 from "../utils/Spinner2";
import ProductsLayout1 from "../component/ProductsLayout1";
import ProductsLayout2 from "../component/ProductsLayout2";

import { useDispatch, useSelector } from "react-redux";
import { getFeaturedCategory, getTrendingCategory } from "../actions/Products";
import {
  selectedFeatured,
  selectedFeaturedStatus,
  selectedFeaturedError,
} from "../features/FeaturedCategorySlice";
import {
  selectedTrend,
  selectedTrendStatus,
  selectedTrendError,
} from "../features/TrendCategorySlice";

const Category = () => {
  const { category } = useParams();
  const featuredCategory = useSelector(selectedFeatured);
  const featuredCategoryS = useSelector(selectedFeaturedStatus);
  const featuredCategoryE = useSelector(selectedFeaturedError);

  const trendCategory = useSelector(selectedTrend);
  const trendCategoryS = useSelector(selectedTrendStatus);
  const trendCategoryE = useSelector(selectedTrendError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeaturedCategory({ category }));
    dispatch(getTrendingCategory({ category }));
  }, [dispatch, category]);

  return (
    <div className="mb-5">
      <PagesStart page={category} />
      <div className="mt-3">
        {featuredCategory.length === 0 && trendCategory.length === 0 ? (
          <p className="fs-4 fw-bold text-center mt-5">Category {category} does not exist at the moment</p>
        ) : (
          <Container>
            <TrendFeaturedStart
              title={`Featured ${category}`}
              body={
                "There are many variations of passages of Lorem Ipsum available"
              }
            >
              {featuredCategoryS === "pending" && <Spinner2 />}
              {featuredCategoryS === "failed" && (
                <p className="text-center">{featuredCategoryE}</p>
              )}
              {featuredCategoryS === "success" &&
                (featuredCategory.length > 0 ? (
                  <Row className="gy-3">
                    {featuredCategory.map((each, index) => (
                      <Col key={index} md={6} xl={3}>
                        <ProductsLayout1 each={each} index={index} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-center fs-4 fw-bold">
                    No featured product for {category}
                  </p>
                ))}
            </TrendFeaturedStart>
            <TrendFeaturedStart
              title={`Trending ${category}`}
              body={
                "There are many variations of passages of Lorem Ipsum available"
              }
            >
              {trendCategoryS === "pending" && <Spinner2 />}
              {trendCategoryS === "rejected" && (
                <p className="text-center">{trendCategoryE}</p>
              )}
              {trendCategoryS === "success" &&
                (trendCategory.length > 0 ? (
                  <ProductsLayout2 data={trendCategory} />
                ) : (
                  <p className="text-center fs-4 fw-bold">
                    No trending products for {category}
                  </p>
                ))}
            </TrendFeaturedStart>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Category;
