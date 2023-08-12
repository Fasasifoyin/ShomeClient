import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, editUser } from "../actions/User";
import { AllUsers, Error, changeError } from "../features/AlluserSlice";
import {
  Button,
  Col,
  FormCheck,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";

const Alluser = ({ user }) => {
  const [userId, setUserId] = useState("");
  const [showEdit, setShowEdit] = useState(-1);
  const users = useSelector(AllUsers);
  const error = useSelector(Error);
  const dispatch = useDispatch();

  const isAdmin = [
    { key: "Admin", value: "true" },
    { key: "Not Admin", value: "false" },
  ];

  const isSeller = [
    { key: "Seller", value: "true" },
    { key: "Not Seller", value: "false" },
  ];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const initialValues = {
    Admin: "",
    Seller: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    const { Admin, Seller } = values;
    const { setSubmitting } = onSubmitProps;

    const form = {
      email: userId,
      isAdmin: Admin === "true" ? true : false,
      isSeller: Seller === "true" ? true : false,
      setSubmitting,
      setShowEdit,
    };
    dispatch(editUser(form));
  };

  const validationSchema = yup.object().shape({
    Seller: yup.string().required("required"),
    Admin: yup.string().required("required"),
  });

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      {user?.isAdmin ? (
        <div className="border border-subtle py-4 px-4">
          <p className="fs-5">Users</p>
          <div style={{ border: "1px dashed black" }} className="mb-3" />
          <Row className="mb-3">
            <Col xs="3">
              <p className="fs-5 fw-bold">Name</p>
            </Col>
            <Col xs="3">
              <p className="fs-5 fw-bold">Email</p>
            </Col>
            <Col xs="3">
              <p className="fs-5 fw-bold">Admin</p>
            </Col>
            <Col xs="3">
              <p className="fs-5 fw-bold">Seller</p>
            </Col>
          </Row>

          <div className="d-flex flex-column gap-4">
            {users.map((each, index) => (
              <Row key={index}>
                <Col xs="3">
                  <p className="text-break mb-0">
                    {each.lastName} {each.firstName}
                  </p>
                </Col>
                <Col xs="3">
                  <p className="text-break mb-0">{each.email}</p>
                </Col>
                {showEdit !== index && (
                  <>
                    <Col xs="3">
                      <p className="text-break mb-0">
                        {each.isAdmin ? "Admin" : "Not Admin"}
                      </p>
                    </Col>
                    <Col xs="3">
                      <div className="d-flex flex-column flex-lg-row justify-content-between ">
                        <p className="mb-0 text-break">
                          {each.isSeller ? "Seller" : "Not Seller"}
                        </p>
                        <AiOutlineEdit
                          onClick={() => {
                            setUserId(each.email);
                            setShowEdit(index);
                          }}
                          className="cursor"
                          size={20}
                        />
                      </div>
                    </Col>
                  </>
                )}

                {showEdit === index && (
                  <Col xs={6}>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      {(formik) => (
                        <Form>
                          <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between">
                              <div
                                style={{ width: "48%" }}
                                className="d-flex flex-column gap-2 justify-content-between"
                              >
                                <Field name="Admin">
                                  {({ field, meta }) => (
                                    <FormGroup>
                                      <div>
                                        {isAdmin.map((each, i) => (
                                          <div key={i} className="d-flex gap-2">
                                            <FormCheck
                                              {...field}
                                              type="radio"
                                              id={each.value}
                                              value={each.value}
                                              checked={
                                                field.value === each.value
                                              }
                                            />
                                            <FormLabel
                                              className="mb-0 cursor"
                                              htmlFor={each.value}
                                            >
                                              {each.key}
                                            </FormLabel>
                                          </div>
                                        ))}
                                        {meta.touched && meta.error && (
                                          <span className="small text-danger">
                                            {meta.error}
                                          </span>
                                        )}
                                      </div>
                                    </FormGroup>
                                  )}
                                </Field>
                                <div className="align-self-end">
                                  <Button
                                    disabled={formik.isSubmitting}
                                    type="submit"
                                    className="button2"
                                    size="sm"
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <div
                                style={{ width: "48%" }}
                                className="d-flex flex-column gap-2 justify-content-between"
                              >
                                <Field name="Seller">
                                  {({ field, meta }) => (
                                    <FormGroup>
                                      <div>
                                        {isSeller.map((each, i) => (
                                          <div key={i} className="d-flex gap-2">
                                            <FormCheck
                                              {...field}
                                              type="radio"
                                              id={each.value}
                                              value={each.value}
                                              checked={
                                                field.value === each.value
                                              }
                                            />
                                            <FormLabel
                                              className="mb-0 cursor"
                                              htmlFor={each.value}
                                            >
                                              {each.key}
                                            </FormLabel>
                                          </div>
                                        ))}
                                      </div>
                                      {meta.touched && meta.error && (
                                        <span className="small text-danger">
                                          {meta.error}
                                        </span>
                                      )}
                                    </FormGroup>
                                  )}
                                </Field>
                                <div
                                  className="align-self-end px-2 py-1 cursor"
                                  style={{ background: "rgb(246,246,246)" }}
                                  onClick={() => {
                                    setUserId("");
                                    setShowEdit(-1);
                                  }}
                                >
                                  <p className="mb-0 small fw-bold">Cancel</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                )}
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <p className="fw-bold text-center fs-4 mt-3">
          Only Admins can view this section
        </p>
      )}
    </>
  );
};

export default Alluser;
