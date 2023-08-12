import React, { useEffect } from "react";
import PagesStart from "../component/PagesStart";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { verifySchema } from "../utils/formikValidation";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { verify } from "../actions/User";
import { changeError, Status, Error } from "../features/UserSlice";

const OTP = () => {
  const loading = useSelector(Status);
  const error = useSelector(Error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(verify({ ...values, navigate }));
  };

  const { values, errors, touched, handleSubmit, handleBlur, getFieldProps } =
    useFormik({
      initialValues: {
        code: "",
      },
      validationSchema: verifySchema,
      onSubmit,
    });

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div>
      <PagesStart page={"Recover/OTP"} />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div style={{ width: "100%", maxWidth: "600px" }} className="px-2">
          <h1 className="text-center mb-0">Recovery</h1>
          <p className="small text-center">
            Enter 6-digit OTP sent to your email to recover password
          </p>
          <Form className="w-100 mt-4 mb-4" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicCode" className="mb-4">
              <Form.Label>
                Enter OTP <span style={{ color: "#eb3e32" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                className="rounded-0"
                style={{
                  height: "60px",
                  border:
                    errors?.code && touched.code ? "1px solid #eb3e32" : "",
                }}
                value={values.code}
                {...getFieldProps("code")}
                onBlur={handleBlur}
              />
              {errors?.code && touched.code && (
                <span className="text-danger small">{errors.code}</span>
              )}
            </Form.Group>
            <Button
              className="w-100 rounded-0 button fs-5"
              style={{ height: "60px" }}
              type="submit"
            >
              {loading === "pending" ? <Spinner /> : "Verify OTP"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
