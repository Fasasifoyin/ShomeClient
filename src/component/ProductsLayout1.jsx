import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { formatCurrency, percentage } from "../utils/formatCurrency";
import HoverItems from "./HoverItems";
import EnlargedView from "./EnlargedView";
import { Link } from "react-router-dom";

const ProductsLayout1 = ({ each, index }) => {
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [viewBig, setViewBig] = useState(-1);

  const showCartHandler = (i) => {
    setHoveredItem(i);
  };

  const hideCartHandler = () => {
    setHoveredItem(-1);
  };

  const showViewBig = (i) => {
    setViewBig(i);
  };

  const hideViewBig = () => {
    setViewBig(-1);
  };

  useEffect(() => {
    if (viewBig !== -1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [viewBig]);

  return (
    <>
      <div className="d-flex flex-column gap-1">
        <div
          className="position-relative imageDiv border border-dark-subtle"
          style={{ borderRadius: "10px" }}
          onMouseEnter={() => showCartHandler(index)}
          onMouseLeave={hideCartHandler}
        >
          <Link to={`/${each?.slug}`}>
            <div
              className="w-100 h-100 opacity"
              style={{ borderRadius: "10px" }}
            >
              <Image
                className="w-100 h-100"
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src={each?.image}
              />
            </div>
          </Link>
          <HoverItems
            showViewBig={showViewBig}
            index={index}
            hoveredItem={hoveredItem}
            each={each}
          />
          {each.oldPrice > each.newPrice && (
            <div
              className="position-absolute py-1 px-2"
              style={{
                background: "red",
                top: "12px",
                left: "12px",
                borderRadius: "5px",
              }}
            >
              <span className="text-white">
                -{percentage(each?.newPrice, each?.oldPrice).toFixed()}%
              </span>
            </div>
          )}
        </div>
        <div className="px-1">
          <h6 className="mb-0 fw-bold text-dark">{each?.title}</h6>
          <p className="fs-5 fw-lighter text-secondary">
            {each.oldPrice > each.newPrice && (
              <>
                <span className="text-decoration-line-through">
                  {formatCurrency(each.oldPrice)}
                </span>{" "}
                <span>-</span>{" "}
              </>
            )}
            {formatCurrency(each?.newPrice)}
          </p>
        </div>
      </div>
      <EnlargedView
        hideViewBig={hideViewBig}
        viewBig={viewBig}
        index={index}
        each={each}
      />
    </>
  );
};

export default ProductsLayout1;
