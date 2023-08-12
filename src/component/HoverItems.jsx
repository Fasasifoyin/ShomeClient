import React from "react";
import { BsBag } from "react-icons/bs";
import { TbJewishStar } from "react-icons/tb";
import { ImEnlarge } from "react-icons/im";

import { addWish, addToCart } from "../features/CartandWish";
import { useDispatch, useSelector } from "react-redux";
import { CartItems, Wish } from "../features/CartandWish";

const HoverItems = ({ hoveredItem, index, showViewBig, each }) => {
  const cart = useSelector(CartItems);
  const wish = useSelector(Wish);
  const dispatch = useDispatch();

  const existCart = cart.find((item) => item._id === each._id);
  const existWish = wish.find((item) => item._id === each._id);

  return (
    <div
      className={
        hoveredItem === index
          ? "d-none d-lg-block position-absolute"
          : "d-none position-absolute"
      }
      style={{ right: "10px", top: "10px", zIndex: "8" }}
    >
      <div className="d-flex flex-column gap-2">
        <div
          data-tool-tip={
            existCart
              ? `Remove ${each.title} from cart`
              : `Add ${each.title} to cart`
          }
          className="arrowCont"
          onClick={() => dispatch(addToCart(each))}
        >
          <BsBag />
        </div>
        <div
          onClick={() => dispatch(addWish(each))}
          className="arrowCont"
          data-tool-tip={
            existWish
              ? `Remove ${each.title} from wishlist`
              : `Add ${each.title} to wishlist`
          }
        >
          <TbJewishStar />
        </div>
        <div className="arrowCont" data-tool-tip="Enlarged View">
          <ImEnlarge onClick={() => showViewBig(index)} />
        </div>
      </div>
    </div>
  );
};

export default HoverItems;
