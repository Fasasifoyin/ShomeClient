import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  Button,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
} from "react-bootstrap";
import Spinner from "../utils/Spinner";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/Products";
import { myProductsE, myProductsS } from "../features/Myproducts";
import { toast } from "react-hot-toast";
import { changeError } from "../features/Myproducts";

import convertImageToBase64 from "../utils/convert";

const CreateProduct = ({ user }) => {
  const status = useSelector(myProductsS);
  const error = useSelector(myProductsE);
  const [productImage, setProductImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onUpload = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setProductImage(base64);
  };

  const category = [
    { key: "Select Category", value: "" },
    { key: "Sneakers", value: "Sneakers" },
    { key: "Sandals", value: "Sandals" },
    { key: "Heels", value: "Heels" },
  ];

  const radio = [
    { key: "Trending", value: "trending" },
    { key: "Featured", value: "featured" },
  ];

  const initialValues = {
    title: "",
    oldPrice: "",
    newPrice: "",
    color: "",
    category: "",
    brand: "",
    trend: "",
    desc: "ftdfyd dudyud dvdutdtudd dguyuud dvdydyud  dduuddd vdudud dvbdihud d vdud dd d dudvhd  dhuddvd d duddv d ftdfyd dudyud dvdutdtudd dguyuud dvdydyud  dduuddd vdudud dvbdihud d vdud dd d dudvhd  dhuddvd d duddv d ftdfyd dudyud dvdutdtudd dguyuud dvdydyud  dduuddd vdudud dvbdihud d vdud dd d dudvhd  dhuddvd d duddv d ftdfyd dudyud dvdutdtudd dguyuud dvdydyud  dduuddd vdudud dvbdihud d vdud dd d dudvhd  dhuddvd d duddv d ftdfyd dudyud dvdutdtudd dguyuud dvdydyud  dduuddd vdudud dvbdihud d vdud dd d dudvhd  dhuddvd d duddv d ",
  };

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .min(5, "Product name cannot be less than 5 characters")
      .required("Enter name of your product"),
    oldPrice: yup
      .number()
      .required("Enter old price. If none enter new price value"),
    newPrice: yup.number().required("Enter new price"),
    color: yup.string().required("Enter color of your product"),
    category: yup.string().required("Enter category of your product"),
    brand: yup.string().required("Enter brand of your product"),
    desc: yup
      .string()
      .min(150, "Description must be at least 150 characters")
      .required("Give a description of your product"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const { setSubmitting } = onSubmitProps;
    let { title, oldPrice, newPrice, color, category, brand, trend, desc } =
      values;
    title = `${title}`;
    oldPrice = Number(oldPrice);
    newPrice = Number(newPrice);
    color = `${color}`;
    category = `${category}`;
    brand = `${brand}`;
    desc = `${desc}`;
    const trending = trend === "trending" ? true : false;
    const isFeatured = trend === "featured" ? true : false;
    const creator = user?.email;

    const product = {
      title,
      oldPrice,
      newPrice,
      color,
      category,
      brand,
      trending,
      isFeatured,
      creator,
      desc,
      image: productImage,
      navigate,
      setSubmitting,
    };
    if (productImage === "") {
      toast.error("Please select an image");
      setSubmitting(false);
    } else {
      dispatch(createProduct(product));
    }
  };

  useEffect(() => {
    dispatch(changeError(""));
  }, [error, dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="border border-subtle py-4 px-4">
      <p className="fs-5">Create Product</p>
      <div style={{ border: "1px dashed black" }} className="mb-3" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="mb-4">
              <Field name="title">
                {({ meta, field }) => (
                  <FormGroup>
                    <FormLabel htmlFor="title">Product Name *</FormLabel>
                    <FormControl
                      id="title"
                      {...field}
                      type="text"
                      className="form single-Div"
                      style={{
                        height: "60px",
                        border:
                          meta.error && meta.touched
                            ? "1px solid #eb3e32 "
                            : "",
                      }}
                    />
                    {meta.error && meta.touched && (
                      <span className="small text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field>
            </div>

            <div className="mb-4 d-flex flex-column gap-4 flex-lg-row justify-content-between">
              <div className="single-Div">
                <Field name="oldPrice">
                  {({ meta, field }) => (
                    <FormGroup>
                      <FormLabel htmlFor="old">Old Price *</FormLabel>
                      <FormControl
                        id="old"
                        {...field}
                        type="number"
                        style={{
                          height: "60px",
                          border:
                            meta.error && meta.touched
                              ? "1px solid #eb3e32 "
                              : "",
                        }}
                      />
                      {meta.error && meta.touched && (
                        <span className="small text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </div>
              <div className="single-Div">
                <Field name="newPrice">
                  {({ meta, field }) => (
                    <FormGroup>
                      <FormLabel htmlFor="new">New Price *</FormLabel>
                      <FormControl
                        id="new"
                        {...field}
                        type="number"
                        style={{
                          height: "60px",
                          border:
                            meta.error && meta.touched
                              ? "1px solid #eb3e32 "
                              : "",
                        }}
                      />
                      {meta.error && meta.touched && (
                        <span className="small text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </div>
            </div>

            <div className="mb-4 d-flex flex-column gap-4 flex-lg-row justify-content-between">
              <div className="single-Div">
                <Field name="color">
                  {({ meta, field }) => (
                    <FormGroup>
                      <FormLabel htmlFor="title">Color *</FormLabel>
                      <FormControl
                        id="color"
                        {...field}
                        type="text"
                        className="form "
                        style={{
                          height: "60px",
                          border:
                            meta.error && meta.touched
                              ? "1px solid #eb3e32 "
                              : "",
                        }}
                      />
                      {meta.error && meta.touched && (
                        <span className="small text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </div>
              <div className="single-Div">
                <Field name="brand">
                  {({ meta, field }) => (
                    <FormGroup>
                      <FormLabel htmlFor="brand">Brand *</FormLabel>
                      <FormControl
                        id="brand"
                        {...field}
                        type="text"
                        className="form"
                        style={{
                          height: "60px",
                          border:
                            meta.error && meta.touched
                              ? "1px solid #eb3e32 "
                              : "",
                        }}
                      />
                      {meta.error && meta.touched && (
                        <span className="small text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </div>
            </div>
            <div className="mb-4 d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <div className="single-Div mb-4 mb-lg-0">
                <Field name="category">
                  {({ meta, field }) => (
                    <FormGroup>
                      <FormLabel>Select product category *</FormLabel>
                      <FormSelect {...field}>
                        {category.map((each) => (
                          <option key={each.value} value={each.value}>
                            {each.key}
                          </option>
                        ))}
                      </FormSelect>
                      {meta.error && meta.touched && (
                        <span className="small text-danger">{meta.error}</span>
                      )}
                    </FormGroup>
                  )}
                </Field>
              </div>

              <div className="single-Div">
                <Field name="trend">
                  {({ field }) => (
                    <FormGroup>
                      <FormLabel>Make your products seen</FormLabel>
                      <div className="d-flex gap-3">
                        {radio.map((each) => (
                          <div
                            key={each.key}
                            className="d-flex gap-2 align-items-center"
                          >
                            <FormCheck
                              {...field}
                              type="radio"
                              id={each.value}
                              value={each.value}
                              checked={field.value === each.value}
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
                    </FormGroup>
                  )}
                </Field>
              </div>
            </div>

            <div className="mb-4">
              <FormGroup className="d-flex flex-column">
                <FormLabel>Product Image</FormLabel>
                <FormLabel htmlFor="profile" className="createImage">
                  <div
                    className="cursor createImage"
                    style={{
                      border: "5px solid #eb3e32",
                    }}
                  >
                    <Image
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      src={
                        productImage ||
                        "https://res.cloudinary.com/dbxvk3apv/image/upload/v1689346257/MY%20ECOMMERCE/missing-image-camera-icon-holder_vpvftl.webp"
                      }
                    />
                  </div>
                </FormLabel>
                <FormControl
                  id="profile"
                  name="profile"
                  type="file"
                  onChange={onUpload}
                  className="d-none"
                />
              </FormGroup>
            </div>

            <div className="mb-4">
              <Field name="desc">
                {({ field, meta }) => (
                  <FormGroup>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <FormControl
                      className="textArea"
                      as="textarea"
                      {...field}
                      style={{
                        height: "250px",
                        border:
                          meta.error && meta.touched
                            ? "1px solid #eb3e32 "
                            : "",
                      }}
                    />
                    {meta.error && meta.touched && (
                      <span className="small text-danger">{meta.error}</span>
                    )}
                  </FormGroup>
                )}
              </Field>
            </div>

            <Button
              type="submit"
              style={{ height: "60px" }}
              className="rounded-0 button w-100 fs-5"
              disabled={formik.isSubmitting}
            >
              {status === "pending" ? <Spinner /> : "Create Product"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
