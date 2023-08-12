import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useFormik } from "formik";

import { comments } from "../actions/Products";
import { useDispatch } from "react-redux";
import { reviewValidation } from "../utils/formikValidation";

const CommentForm = ({ user, product }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();

  //   const submitComment = (e) => {
  //     e.preventDefault();
  //     console.log(form);
  //     //dispatch(comments(form));
  //     setReview("");
  //     setTitle("");
  //     setRating(null);
  //   };

  const onSubmit = (values, actions) => {
    const value = {
      ...values,
      rating: rating,
      name: user?.email,
      createdAt: new Date(),
    };
    const form = { id, value };
    dispatch(comments(form));
    actions.resetForm();
    setRating(null);
  };

  const id = product?._id;
  //   const details = {
  //     name: user?.email,
  //     title: title,
  //     body: review,
  //     rating: rating,
  //   };
  //   const form = { id, details };

  const { values, touched, errors, getFieldProps, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        body: "",
      },
      validationSchema: reviewValidation,
      onSubmit,
    });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mb-3">
        <Form.Label>Review Title</Form.Label>
        <Form.Control
          className="form rounded-0"
          style={{ height: "60px" }}
          type="text"
          placeholder="Give your review a title"
          onBlur={handleBlur}
          value={values.title}
          {...getFieldProps("title")}
        />
        {errors?.title && touched?.title && (
          <span className="text-danger small">{errors.title}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBody">
        <Form.Label>Body of Review</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: "250px" }}
          placeholder="Write your comments here"
          className="textArea rounded-0"
          onBlur={handleBlur}
          value={values.body}
          {...getFieldProps("body")}
        />
        {errors?.body && touched?.body && (
          <span className="text-danger small">{errors.body}</span>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <div className="d-flex gap-2">
          {[...Array(5)].map((star, i) => (
            <div key={i} className="d-flex">
              <Form.Label
                htmlFor={i + 1}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(null)}
                className="cursor"
              >
                <FaStar
                  size={30}
                  color={i + 1 <= (hover || rating) ? "#eb3e32" : "#e4e5e9"}
                />
              </Form.Label>
              <Form.Check
                className="d-none"
                type="radio"
                id={i + 1}
                name="star"
              />
            </div>
          ))}
        </div>
      </Form.Group>

      {/* {[...Array(5)].map((star) => {
        return (
          <>
            <Form.Group cont>
              <Form.Label>
                <FaStar size={30} />
              </Form.Label>
              <Form.Check type="radio" label=""  />
            </Form.Group>
          </>
        );
      })} */}

      <div className="d-flex justify-content-end">
        <Button
          disabled={!user?.email}
          type="submit"
          className="button rounded-0"
        >
          Post Comment
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
