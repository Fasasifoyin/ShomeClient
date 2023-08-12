import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

const Like = ({ product, user }) => {
  return (
    <>
      {product.like.length > 0 ? (
        product.like.find((like) => like === user?.email) ? (
          <>
            <BsFillHeartFill size="1.6rem" />
            &nbsp;{" "}
            {product.like.length > 2
              ? `You and ${product?.like.length - 1} others `
              : `${product.like.length} like${
                  product.like.length > 1 ? "s" : ""
                }`}
          </>
        ) : (
          <>
            <BsHeart size="1.6rem" /> &nbsp; {product.like.length}{" "}
            {product.like.length === 1 ? "Like" : "Likes"}
          </>
        )
      ) : (
        <>
          <BsHeart size="1.6rem" />
          &nbsp; Like
        </>
      )}
    </>
  );
};

export default Like;
