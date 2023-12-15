import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "../Button";
const ContactInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-12">
          <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
            <Form.Label className="ilabel">First Name</Form.Label>
            <Form.Control
              className="icontrol"
              type="text"
              // placeholder="Mark"
              name="firstname"
              {...register("firstname", {
                required: {
                  value: true,
                  message: "Please Enter Your First Name",
                },
              })}
            />
            {errors.firstname?.type === "required" && (
              <span style={{ color: "red" }}>{errors.firstname.message}</span>
            )}
          </Form.Group>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
            <Form.Label className="ilabel">Last Name</Form.Label>
            <Form.Control
              className="icontrol"
              type="text"
              // placeholder="Jonsan"
              name="lastname"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "Please Enter Your Last Name",
                },
              })}
            />
            {errors.lastname?.type === "required" && (
              <span style={{ color: "red" }}>{errors.lastname.message}</span>
            )}
          </Form.Group>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
            <Form.Label className="ilabel">Email address</Form.Label>
            <Form.Control
              noValidate
              className="icontrol"
              type="email"
              // placeholder="markjonsan@mail.com"
              name="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please Enter Valid Email",
                },
                required: {
                  value: true,
                  message: "Please Enter Email",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span style={{ color: "red" }}> {errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span style={{ color: "red" }}> {errors.email.message}</span>
            )}
          </Form.Group>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
            <Form.Label className="ilabel">Phone Number</Form.Label>
            <Form.Control
              className="icontrol"
              type="number"
              // placeholder="(480) 555-0103"
              name="phone"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please Enter Phone No.",
                },
                minLength: 10,
                maxLength: 15,
              })}
            />
            {errors.phone?.type === "required" && (
              <span style={{ color: "red" }}> {errors.phone.message}</span>
            )}
            {errors.phone?.type === "minLength" && (
              <span style={{ color: "red" }}>
                Phone number must be at least 10 digits
              </span>
            )}
            {errors.phone?.type === "maxLength" && (
              <span style={{ color: "red" }}>Phone number max 15 digit</span>
            )}
          </Form.Group>
        </div>
        <div className="col-lg-12 col-md-12 col-12">
          <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
            <Form.Label className="ilabel">Message</Form.Label>
            <Form.Control
              className="icontrol"
              as="textarea"
              rows={5}
              // placeholder="Write a Note"
              name="message"
              {...register("message")}
            />
          </Form.Group>
        </div>
        <div className="col-lg-12 col-12">
          <div className="send-btn">
            <Button isLink={true} type="submit" text="Send Message" />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ContactInfo;
