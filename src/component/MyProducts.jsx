import React, { useEffect, useRef, useCallback, useState } from "react";
import { Button, Image } from "react-bootstrap";
import Spinner2 from "../utils/Spinner2";

import { useSelector, useDispatch } from "react-redux";
import { myDeleted, myProducts, myProductsS } from "../features/Myproducts";
import { getMyProducts } from "../actions/Products";
import { selectedUser } from "../features/UserSlice";
import { formatCurrency } from "../utils/formatCurrency";

import { deleteProduct } from "../actions/Products";
import Logout from "../utils/Logout";

const MyProducts = ({ setActive }) => {
  const [out, setOut] = useState(false);
  const [id, setId] = useState(-1);

  const user = useSelector(selectedUser);
  const products = useSelector(myProducts);
  const deleted = useSelector(myDeleted);
  const status = useSelector(myProductsS);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();

  const observer = useRef();

  const deletingProduct = () => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    const form = { page };
    dispatch(getMyProducts(form));
  }, [page, dispatch]);

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
    setData((prevData) => {
      return [...new Set([...prevData, ...products])];
    });
    setHasMore(products.length > 0);
  }, [products]);

  useEffect(() => {
    setData([]);
  }, [user?.email]);

  useEffect(() => {
    setData(data.filter((each) => each._id !== deleted._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted]);

  return (
    <>
      {user?.isAdmin ? (
        <>
          <div className="border border-subtle py-4 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="fs-5 mb-0">Your Products</p>
              {data?.length > 0 && (
                <Button
                  className="button rounded-0"
                  onClick={() => setActive("sixth")}
                >
                  Create new product
                </Button>
              )}
            </div>
            <div style={{ border: "1px dashed black" }} className="mb-3" />
            <div className="d-flex flex-column gap-5">
              {data?.length > 0
                ? data?.map((each, index) => (
                    <div key={index}>
                      <div
                        className="d-flex flex-column flex-lg-row gap-2 justify-content-lg-between align-items-center"
                        ref={index === data?.length - 1 ? lastProduct : null}
                      >
                        <div className="yourProducts">
                          <Image
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            src={each.image}
                          />
                        </div>
                        <div className="h-100 d-flex flex-column align-items-center align-items-lg-end gap-3">
                          <p className="mb-0">{each.title}</p>
                          <p className="mb-0">
                            {formatCurrency(each.newPrice)}
                          </p>
                          <div>
                            <Button
                              className="rounded-0 button2"
                              onClick={() => {
                                setOut(true);
                                setId(each._id);
                              }}
                            >
                              Delete Product
                            </Button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                : status === "success" && (
                    <div>
                      <p className="text-center">
                        You have no products on this store
                      </p>
                      <div className="text-center">
                        <Button
                          className="button rounded-0"
                          onClick={() => setActive("sixth")}
                        >
                          Create your own product
                        </Button>
                      </div>
                    </div>
                  )}
            </div>
            <div className="text-center mt-2">
              {hasMore === false && data.length > 0 && (
                <span className="text-dark text-break small">
                  That is all of your products...
                </span>
              )}
            </div>
            {status === "pending" && <Spinner2 />}
          </div>
          {out && (
            <Logout
              close={setOut}
              action={deletingProduct}
              actionName={"Delete Product"}
              actionType={"Are you sure you want to delete this product"}
            />
          )}
        </>
      ) : (
        <p className="fw-bold text-center fs-4 mt-3">
          Only Admins and Sellers can view this section
        </p>
      )}
    </>
  );
};

export default MyProducts;
