import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner2 from "../utils/Spinner2";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { TbJewishStar } from "react-icons/tb";
import { Button, Container, Image } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import PagesStart from "../component/PagesStart";
import Like from "../component/Like";
import ProductsLayout2 from "../component/ProductsLayout2";

import { useDispatch, useSelector } from "react-redux";
import { getSingle, likeProduct } from "../actions/Products";
import {
  singleProduct,
  singleProductStatus,
  singleProductError,
} from "../features/SingleSlice";

import { selectedUser } from "../features/UserSlice";

import {
  CartItems,
  addToCart,
  increaseCart,
  decreaseCart,
  addWish,
  Wish,
} from "../features/CartandWish";

import { getSearch } from "../actions/Products";
import { SearchP, SearchStatus, SearchError } from "../features/SearchSlice";
import Comments from "../component/Comments";
import CommentForm from "../component/CommentForm";
import { FaStar } from "react-icons/fa";

const SingleProduct = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(singleProduct);
  const productStatus = useSelector(singleProductStatus);
  const productError = useSelector(singleProductError);

  //console.log(product);

  const user = useSelector(selectedUser);
  const cart = useSelector(CartItems);
  const wish = useSelector(Wish);

  const exist = cart?.find((each) => each?._id === product?._id);
  const existWish = wish?.find((each) => each?._id === product?._id);

  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const search = useSelector(SearchP);
  const status = useSelector(SearchStatus);
  const error = useSelector(SearchError);
  const usedSearch = search.filter((each) => each.slug !== slug);

  useEffect(() => {
    dispatch(getSingle({ slug }));
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(getSearch(product?.category));
  }, [dispatch, product]);

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [slug]);

  const ratedCustomer = product
    ? product.comments?.filter((each) => each.rating > 0)
    : null;

  const ratingNumber = ratedCustomer?.reduce((p, c) => {
    return p + c.rating;
  }, 0);

  const starRating = Math.floor(ratingNumber / ratedCustomer?.length) || 0;

  return (
    <div className="mb-5">
      <PagesStart page={"Product Details"} />
      <Container className="mt-5">
        {productStatus === "pending" && <Spinner2 />}
        {productStatus === "rejected" && productError}
        {productStatus === "success" &&
          (product ? (
            <div className="d-flex flex-column gap-4 flex-lg-row justify-content-between">
              <div
                className="single-Div single-H border border-subtle"
                style={{ borderRadius: "20px" }}
              >
                <Image
                  style={{ borderRadius: "20px", objectFit: "cover" }}
                  className="w-100 h-100"
                  src={product?.image}
                />
              </div>
              <div className="single-Div d-flex flex-column gap-2 px-2 px-lg-0">
                <div>
                  <h1 className="display-5 text-secondary-emphasis text-break mb-0">
                    {product?.title}
                  </h1>
                </div>
                <div>
                  <p className="fs-2 fw-bold text-dark mb-0">
                    {product?.oldPrice > product?.newPrice && (
                      <>
                        <span className="text-decoration-line-through text-danger">
                          {formatCurrency(product?.oldPrice)}
                        </span>{" "}
                      </>
                    )}
                    {formatCurrency(product?.newPrice)}
                  </p>
                </div>
                <hr />
                <div>
                  <p>{product?.desc}</p>
                </div>
                <div>
                  <p className="mb-0 fs-4">Color:</p>
                  <h3
                    className="fs-3"
                    style={{ color: product?.color || "black" }}
                  >
                    {product?.color}
                  </h3>
                </div>
                <div>
                  <p className="mb-0 fs-4">Brand:</p>
                  <h3 className="fs-3">{product?.brand}</h3>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{ width: "29%" }}
                    className="border border-dark-subtle"
                  >
                    <div className="border border-bottom-dark-subtle">
                      <p className="fs-3 py-1 text-center text-break mb-0">
                        {exist?.qty || 0}
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        className="w-50 py-1 text-center cursor addDiv"
                        onClick={() => dispatch(decreaseCart(product))}
                      >
                        <AiOutlineMinus size="1.5rem" />
                      </div>
                      <div className="border border-dark-subtle" />
                      <div
                        className="w-50 py-1 text-center cursor addDiv"
                        onClick={() => dispatch(increaseCart(product))}
                      >
                        <AiOutlinePlus size="1.5rem" />
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "69%" }}>
                    <Button
                      style={{ height: "60px" }}
                      className="button rounded-0 w-100"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      {exist ? "Remove from Cart" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div
                    className="d-flex gap-2 align-items-center cursor"
                    onClick={() => dispatch(addWish(product))}
                  >
                    <TbJewishStar size="1.7rem" className="wishSingle" />
                    <p className="mb-0 fs-4 navLgIcon">
                      {existWish ? "Remove from Wishlist" : "Add To Wishlist"}
                    </p>
                  </div>
                  <div>
                    <Button
                      className="button2 rounded-0"
                      onClick={() => dispatch(likeProduct(product?._id))}
                      disabled={!user?.email}
                    >
                      <Like product={product} user={user} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="fs-3 fw-bold text-center mt-5">
              Sorry, "<span style={{ color: "#eb3e32" }}>{slug}</span>" does not
              exist
            </p>
          ))}

        {product?._id && (
          <div className="mt-5">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <div
                className="p-2"
                style={{ borderBottom: !show ? "2px solid #eb3e32" : null }}
              >
                <p
                  className="mb-0 fs-4 fw-bold cursor"
                  onClick={() => setShow(false)}
                >
                  Related
                </p>
              </div>
              <div
                className="p-2"
                style={{ borderBottom: show ? "2px solid #eb3e32" : null }}
              >
                <p
                  className="mb-0 fs-4 fw-bold cursor"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Reviews({product.comments?.length})
                </p>
              </div>
            </div>
            <div>
              {!show &&
                (search.length > 0 ? (
                  <div className="mt-5">
                    {status === "pending" && <Spinner2 />}
                    {status === "rejected" && (
                      <p className="text-center">{error}</p>
                    )}
                    <ProductsLayout2 data={usedSearch} />
                  </div>
                ) : (
                  <div className="mt-5">
                    <p className="text-center">No related products</p>
                  </div>
                ))}
              {show && (
                <div className="mt-5 border border-dark-subtle p-2">
                  <div className="mb-4 d-flex flex-column gap-3">
                    <div className="px-3 pt-4">
                      <h4 className="fw-bold fs-3 mb-3">Customer Reviews</h4>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex gap-3 align-items-center">
                          <div className="d-flex gap-2">
                            {[...Array(5)].map((each, i) => (
                              <div key={i}>
                                <FaStar
                                  color={
                                    i + 1 > starRating ? "#e4e5e9" : "#eb3e32"
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          <p className="mb-0">
                            Based on {ratedCustomer.length} reviews
                          </p>
                        </div>
                        <p
                          onClick={() => setShowForm(!showForm)}
                          className="fw-bold mb-0 navLgIcon"
                        >
                          Write a review
                        </p>
                      </div>
                      <hr className="mt-1" />
                    </div>
                    {showForm && (
                      <div className="px-3">
                        <CommentForm user={user} product={product} />
                        <hr className="mb-0" />
                      </div>
                    )}
                  </div>
                  <div className="d-flex flex-column gap-1 border border-dark-subtle p-3">
                    {product?.comments.length > 0 ? (
                      product?.comments
                        .map((each) => (
                          <Comments
                            key={each._id}
                            product={product}
                            {...each}
                            user={user}
                          />
                        ))
                        .reverse()
                    ) : (
                      <div>
                        <p className="text-center mb-0">
                          No reviews for {product.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SingleProduct;
