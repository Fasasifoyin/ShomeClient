import React from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const Scrollers = ({scroll}) => {
  return (
    <>
      <div onClick={() => scroll("right")} className="position-absolute d-none d-lg-flex arrowCont2 top-50 translate-middle-y end-0">
        <BsArrowRight />
      </div>
      <div onClick={() => scroll("left")} className="position-absolute d-none d-lg-flex arrowCont2 top-50 translate-middle-y start-0">
        <BsArrowLeft />
      </div>
    </>
  );
};

export default Scrollers;
