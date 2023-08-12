import React from "react";

const TrendFeaturedStart = ({ body, title, children }) => {
  return (
    <div className="mt-5 d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-2 text-center align-items-center justify-content-center">
        <h1 className="mb-0">{title}</h1>
        <p>{body}</p>
      </div>
      {children}
    </div>
  );
};

export default TrendFeaturedStart;
