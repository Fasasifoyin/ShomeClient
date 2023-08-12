import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsSearch } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { TbLetterX } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

const SmSearch = ({ show, handleClose }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState(searchQuery || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`products/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="d-lg-none">
      <Offcanvas
        placement="top"
        backdrop="static"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header>
          <Offcanvas.Title className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <span>SEARCH</span>
              <div
                onClick={handleClose}
                className="canvasCancel d-flex justify-content-center align-items-center"
              >
                <TbLetterX size="1.5rem" color="white" />
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100 d-flex justify-content-center">
            <div className="searchSm d-flex justify-content-between ps-2">
              <div className="d-flex align-items-center">
                <form onSubmit={handleSubmit}>
                  <input
                    className="search2"
                    type="text"
                    placeholder="Search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                {search && (
                  <div onClick={() => setSearch("")}>
                    <MdCancel size="1.4rem" />
                  </div>
                )}
              </div>
              <div
                onClick={(e) => {
                  handleClose();
                  handleSubmit(e);
                }}
                className="besideSearch d-flex justify-content-center align-items-center"
              >
                <BsSearch size="1.5rem" color="white" />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SmSearch;
