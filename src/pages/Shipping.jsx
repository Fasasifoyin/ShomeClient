import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Checkoutsteps from "../component/Checkoutsteps";
import { useFormik } from "formik";
import { shippingValidation } from "../utils/formikValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  CartItems,
  getShipping,
  Shipping as Ship,
} from "../features/CartandWish";

const Shipping = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/payment";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(CartItems);
  const shipping = useSelector(Ship);

  const onSubmit = (values) => {
    if (cart.length) {
      dispatch(getShipping(values));
      navigate(redirect);
    } else {
      toast.error("You do not have any product to purchase");
    }
  };

  const { values, touched, errors, getFieldProps, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        fullName: shipping.fullName || "",
        address: shipping.address || "",
        city: shipping.city || "",
        postal: shipping.postal || "",
        country: shipping.country || "",
      },
      validationSchema: shippingValidation,
      onSubmit,
    });

  return (
    <div className="mt-5">
      <Checkoutsteps step1 />
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div
          className="p-3"
          style={{ background: "#F8F8FD", width: "100%", maxWidth: "650px" }}
        >
          <h4 className="fw-bold text-center" style={{ color: "#eb3e32" }}>
            Shipping Address
          </h4>
          <Form className="w-100 mt-4" onSubmit={handleSubmit}>
            <FormGroup controlId="formBasicFullName" className="mb-4">
              <FormLabel>Full Name</FormLabel>
              <FormControl
                type="text"
                className="rounded-0 form"
                style={{
                  height: "60px",
                  border:
                    errors?.fullName && touched.fullName
                      ? "1px solid #eb3e32"
                      : "",
                }}
                onBlur={handleBlur}
                value={values.fullName}
                {...getFieldProps("fullName")}
              />
              {errors?.fullName && touched.fullName && (
                <span className="text-danger small">{errors.fullName}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4" controlId="formBasicAddress">
              <FormLabel>Address</FormLabel>
              <FormControl
                type="text"
                className="rounded-0 form"
                style={{
                  height: "60px",
                  border:
                    errors?.address && touched.address
                      ? "1px solid #eb3e32"
                      : "",
                }}
                onBlur={handleBlur}
                value={values.address}
                {...getFieldProps("address")}
              />
              {errors?.address && touched.address && (
                <span className="text-danger small">{errors.address}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4" controlId="formBasicCity">
              <FormLabel>City</FormLabel>

              <FormControl
                type="text"
                className="rounded-0 form"
                style={{
                  height: "60px",
                  border:
                    errors?.city && touched.city ? "1px solid #eb3e32" : "",
                }}
                value={values.city}
                onBlur={handleBlur}
                {...getFieldProps("city")}
              />
              {errors?.city && touched.city && (
                <span className="text-danger small">{errors.city}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4" controlId="formBasicPostal">
              <FormLabel>Postal</FormLabel>

              <FormControl
                type="text"
                className="rounded-0 form"
                style={{
                  height: "60px",
                  border:
                    errors?.postal && touched.postal ? "1px solid #eb3e32" : "",
                }}
                value={values.postal}
                onBlur={handleBlur}
                {...getFieldProps("postal")}
              />
              {errors?.postal && touched.postal && (
                <span className="text-danger small">{errors.postal}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4" controlId="formBasicCountry">
              <FormLabel>Country</FormLabel>
              <FormControl
                type="text"
                className="rounded-0 form"
                style={{
                  height: "60px",
                  border:
                    errors?.country && touched.country
                      ? "1px solid #eb3e32"
                      : "",
                }}
                value={values.country}
                onBlur={handleBlur}
                {...getFieldProps("country")}
              />
              {errors?.country && touched.country && (
                <span className="text-danger small">{errors.country}</span>
              )}
            </FormGroup>
            <Button
              type="submit"
              className="w-100 rounded-0 button2 fs-5"
              style={{ height: "60px" }}
            >
              Proceed to payment
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
