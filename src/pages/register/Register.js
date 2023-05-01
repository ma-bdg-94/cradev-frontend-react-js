import React, { Fragment, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
  InputGroup,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import "./Register.scss";

import { toast } from "react-toastify";

import loginImage from "../../assets/registerImage.svg";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";

import { registerUser } from "../../redux-store/slices/auth.slice";

import FileUploader from "../../components/FileUploader/FileUploader.js";

const Register = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      console.log("file", watch("photo"))
      await dispatch(registerUser({...data, photo: selectedFile})).unwrap();
      // props.history.push("/template");
    } catch (error) {
      const errorMessages = error?.errors?.map((err) => err.msg);
      toast.error(errorMessages?.join("\n"), {
        theme: "colored",
      });
    }
  };

  const { from } = props.location.state || { from: { pathname: "/template" } };

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex header-bearer">
                <p className="auth-header mb-0 text-nowrap">Sign Up</p>
                <header className="logo">
                  <span className="pretitle">C</span>
                  <span className="title">Cradev</span>
                </header>
              </div>
              <form onSubmit={handleSubmit((e) => onSubmit(e))}>
                <FormGroup className="mb-3">
                  <FormText>Full Name</FormText>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Fragment>
                        <Input
                          type="text"
                          id="fullName"
                          className="input-transparent pl-3"
                          style={{ border: inputError ? "1px solid red" : "" }}
                          placeholder="Henry"
                          {...field}
                        />
                        {errors.fullName && (
                          <small>This field is required</small>
                        )}
                      </Fragment>
                    )}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Fragment>
                        <Input
                          type="text"
                          id="email"
                          className="input-transparent pl-3"
                          style={{ border: inputError ? "1px solid red" : "" }}
                          placeholder="Henry@mail.com"
                          {...field}
                        />
                        {errors.email && <small>This field is required</small>}
                      </Fragment>
                    )}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Phone Number</FormText>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Fragment>
                        <Input
                          type="text"
                          id="phone"
                          className="input-transparent pl-3"
                          style={{ border: inputError ? "1px solid red" : "" }}
                          placeholder="+1234567890"
                          {...field}
                        />
                        {errors.phone && <small>This field is required</small>}
                      </Fragment>
                    )}
                  />
                </FormGroup>

                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText></FormText>
                    <p style={{fontSize: '0.8rem'}}>{watch("photo")?.replace(/^.*[\\\/]/, '')}</p>
                  </div>
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <FileUploader
                        content={`Upload Photo`}
                        icon={`image`}
                        //ref={fileUploaderRef}
                        onChange={(event) => {
                          field.onChange(event);
                          handleFileSelect(event); // You can call your own onChange function here
                        }}
                        name={field.name}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    <Link to="/error">Forgot password?</Link>
                  </div>

                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Fragment>
                        <InputGroup>
                          <Input
                            type={!showPassword ? "password" : "text"}
                            id="password"
                            className="input-transparent pl-3"
                            style={{ borderRight: "none" }}
                            placeholder="Your Password Here"
                            {...field}
                          />
                          <Button
                            color="white"
                            onClick={() => handleShowPassword()}
                            style={{
                              margin: 0,
                              padding: "0px 20px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              borderRight: "1px solid #6b859e65",
                              borderBlock: "1px solid #6b859e65",
                            }}
                          >
                            <i
                              className={
                                showPassword === false
                                  ? `eva eva-eye-outline`
                                  : `eva eva-eye-off-outline`
                              }
                            />
                          </Button>
                        </InputGroup>
                        {errors.password && (
                          <small>This field is required</small>
                        )}
                      </Fragment>
                    )}
                  />
                </FormGroup>

                <div className="bg-widget d-flex justify-content-center">
                  <Button
                    className="rounded-pill my-3"
                    type="submit"
                    color="secondary-red"
                  >
                    Sign Up
                  </Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Login with</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/">
                      <GoogleIcon />
                    </a>
                    <a href="https://flatlogic.com/">
                      <GithubIcon />
                    </a>
                  </div>
                  <Link to="/login">Enter your Cradev account</Link>
                </div>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Register);
