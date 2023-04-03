import React, { useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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
import './Register.scss'

import loginImage from "../../assets/registerImage.svg";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import { registerUser } from "../../redux-store/slices/auth.slice";
import hasToken from "../../services/authService";
import FileUploader from "../../components/FileUploader/FileUploader.js";

const Register = (props) => {
  const [state, setState] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch();


  const { handleSubmit } = useForm();

  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data) => {
    try {
      console.log("data", data);
      dispatch(registerUser(data));
    } catch (error) {
      console.log("error", error);
    }
  };

  const { from } = props.location.state || { from: { pathname: "/template" } };

  if (hasToken(JSON.parse(localStorage.getItem("authenticated")))) {
    return <Redirect to={from} />;
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex py-3 header-bearer">
                <p className="auth-header mb-0 text-nowrap">Sign Up</p>
                <header className="logo">
                  <span className="pretitle">C</span>
                  <span className="title">Cradev</span>
                </header>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="mb-3">
                  <FormText>Full Name</FormText>
                  <Input
                    id="fullName"
                    className="input-transparent pl-3"
                    onChange={(event) => changeCred(event)}
                    type="text"
                    //required
                    name="fullName"
                    placeholder="Henry"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    //value={state.email}
                    onChange={(event) => changeCred(event)}
                    type="email"
                    //required
                    name="email"
                    placeholder="henrymonk@mail.com"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Phone Number</FormText>
                  <Input
                    id="phone"
                    className="input-transparent pl-3"
                    onChange={(event) => changeCred(event)}
                    type="text"
                    // required
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="+123456789"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText></FormText>
                    {/* <Link to="/error">Forgot password?</Link> */}
                  </div>
                  <FileUploader
                    content={`Upload Photo`}
                    icon={`image`}
                    onChange={handleFileSelect}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    <Link to="/error">Forgot password?</Link>
                  </div>
                  <InputGroup>
                    <Input
                      id="password"
                      className="input-transparent pl-3"
                      style={{ borderRight: "none" }}
                      value={state.password}
                      onChange={(event) => changeCred(event)}
                      type={showPassword === true ? 'text' : 'password'}
                      //required
                      name="password"
                      placeholder="Place your password here"
                    />
                    <Button
                      color="white"
                      onClick={handleShowPassword}
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
                      <i className={showPassword === false ? `eva eva-eye-outline` : `eva eva-eye-off-outline`} />
                    </Button>
                  </InputGroup>
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
