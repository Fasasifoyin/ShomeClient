import React, { useCallback, useEffect, useRef, useState } from "react";
import { carouselDetails } from "../utils/Carousel";
import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const HeroSection = () => {
  const timerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent(current === carouselDetails.length - 1 ? 0 : current + 1);
  }, [current]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? carouselDetails.length - 1 : current - 1);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div style={{ overflow: "hidden " }} className="h-100">
      <div
        className="h-100 d-flex "
        style={{
          width: `${carouselDetails.length * 100}%`,
          transform: `translateX(${-(current * 33.333333333333333333333333)}%)`,
          transition: "transform ease-out 500ms",
        }}
      >
        {carouselDetails.map((each, index) => (
          <div
            className="py-5 py-lg-0 position-relative"
            key={each.title}
            style={{ width: "100%", height: "100%", background: each.color }}
          >
            <Container className="h-100 mb-5 mb-lg-0">
              <div
                style={{
                  opacity: current === index ? 1 : 0,
                  transition:
                    current === index
                      ? "opacity ease-in-out 0.6s"
                      : "opacity ease-in-out 0.3s",
                }}
                className="d-flex flex-column flex-lg-row align-items-center justify-content-between h-100"
              >
                <div className="exclusive">
                  <h1 className="fw-bold display-1 text-white mb-3">
                    {each.title}
                  </h1>
                  <p className="fs-3 text-white mb-5">{each.body}</p>
                  <Link to="/products">
                    <Button
                      className="rounded-0 w-100 shopNow"
                      style={{ height: "60px" }}
                    >
                      SHOP NOW
                    </Button>
                  </Link>
                </div>
                <div
                  style={{ width: "47%" }}
                  className="d-none d-lg-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      width: "450px",
                      height: "450px",
                      borderRadius: "50%",
                    }}
                  >
                    <Image
                      className="w-100 h-100"
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      src={each.image}
                    />
                  </div>
                </div>
              </div>
            </Container>
            <div
              className="hero-section-arrow d-flex d-lg-block justify-content-end "
              style={{bottom:"20px", right:"20px", }}
            >
            <div className="d-flex gap-2 px-4 px-lg-0">
            <div
            className="d-flex cursor justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid white",
            }}
            onClick={goToPrevious}
          >
            <FaLessThan color="white" size="1.2rem" />
          </div>
          <div
            className="d-flex cursor justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid white",
            }}
            onClick={goToNext}
          >
            <FaGreaterThan color="white" size="1.2rem" />
          </div>
            </div>
         
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div
    //   className="position-relative w-100 d-flex justify-content-center align-items-center mb-5"
    //   style={{
    //     height: "75vh",
    //     backgroundColor: carouselDetails[number].color,
    //   }}
    // >
    //   <Container>
    //     <div className="d-flex justify-content-between align-items-center px-3">
    //       <div className="d-flex flex-column gap-2 exclusive">
    //         <h1 className="fw-bold display-1 text-white">
    //           {carouselDetails[number].title}
    //         </h1>
    //         <p className="fs-3 text-white">{carouselDetails[number].body}</p>

    //       </div>

    //     </div>
    //   </Container>

    //   <div
    //     className="position-absolute"
    //     style={{ bottom: "20px", right: "30px" }}
    //   >
    //     <div
    //       className="d-flex justify-content-between"
    //       style={{ width: "100px" }}
    //     >

    //     </div>
    //   </div>
    // </div>
  );
};

export default HeroSection;
