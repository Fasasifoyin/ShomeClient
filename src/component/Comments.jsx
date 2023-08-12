import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Timeago from "../utils/Timeago";

import { useDispatch } from "react-redux";
import { deleteComment } from "../actions/Products";
import { FaStar } from "react-icons/fa";

const Comments = ({
  name,
  createdAt,
  _id,
  user,
  product,
  title,
  body,
  rating,
}) => {
  const dispatch = useDispatch();
  const id = product._id;
  const commentId = _id;
  const sentId = { commentId };
  const form = { id, sentId };

  return (
    <>
      <div className="p-3">
        <div className="d-flex gap-2 mb-2">
          {[...Array(5)].map((each, i) => (
            <div key={i}>
              <FaStar color={i + 1 > rating ? "#e4e5e9" : "#eb3e32"} />
            </div>
          ))}
        </div>
        <div className="mb-3">
          <h4 className="fw-bold mb-0">{title}</h4>
          <Timeago timestamp={createdAt} />
        </div>
        <p className="mb-4">{body}</p>
        <div className="d-flex justify-content-between">
          <p className="small text-secondary">{name}</p>
          {user?.email === name && (
            <AiFillDelete
              className="navLgIcon"
              size={22}
              onClick={() => dispatch(deleteComment(form))}
            />
          )}
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
};

export default Comments;
