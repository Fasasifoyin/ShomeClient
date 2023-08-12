import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const PagesStart = ({ page }) => {
  return (
    <div className="mt-5 w-100 pagesStart position-relative">
      <Image
        src="https://res.cloudinary.com/dbxvk3apv/image/upload/v1686493724/MY%20ECOMMERCE/Sneaker-HD-Wallpaper-Free-download_nerils.jpg"
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
      />
      <div className="position-absolute w-100 top-50 start-50 translate-middle">
        <div className="d-flex flex-column align-items-center">
          <span className="display-2 text-white text-center mb-0">{page}</span>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/">
              <span className="fs-5 fw-bold text-white">HOME</span>
            </Link>
            <span className="fs-5 fw-bold" style={{ color: "#eb3e32" }}>
              \\
            </span>
            <span
              className="fs-5 fw-bold text-break"
              style={{ color: "#eb3e32" }}
            >
              {page}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesStart;
