import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Spinner2 from "../utils/Spinner2";

import { useSelector, useDispatch } from "react-redux";
import { SearchP, SearchStatus, SearchError } from "../features/SearchSlice";
import { getSearch } from "../actions/Products";
import { formatCurrency } from "../utils/formatCurrency";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("searchQuery");
  const search = useSelector(SearchP);
  const status = useSelector(SearchStatus);
  const error = useSelector(SearchError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      dispatch(getSearch(searchQuery));
    }
  }, [searchQuery, dispatch]);

  return (
    <Container className="mt-5 mb-5">
      {status === "pending" && <Spinner2 />}
      {status === "rejected" && error}
      {status === "success" && (
        <>
          <p className="fw-bold fs-5">
            Number of found product(s): {search.length}
          </p>
          {search.length > 0 ? (
            <>
              <p className="fw-bold fs-5">Search results for {searchQuery} :</p>
              <div className="mt-5 d-flex flex-column gap-4">
                {search.map((each) => (
                  <div
                    key={each._id}
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: "rgb(247,247,247)" }}
                  >
                    <div style={{ width: "30%" }}>
                      <Link to={`/${each.slug}`}>
                        <div className="searchImage">
                          <Image
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            src={each.image}
                          />
                        </div>
                      </Link>
                    </div>
                    <div style={{ width: "30%" }}>
                      <p className="mb-0 text-center fs-4">{each.title}</p>
                    </div>
                    <div style={{ width: "30%" }}>
                      <p className="mb-0 text-center fs-4">
                        {formatCurrency(each.newPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No search results for {searchQuery}</p>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
