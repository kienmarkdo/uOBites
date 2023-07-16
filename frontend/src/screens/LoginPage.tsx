import React, { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {

  const navigate = useNavigate();

  const navigateToRegistrationPage = () => {
    navigate('/registration');
  };

  const navigateToLandingPage = () => {
    navigate('/home', {state: {email}});
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValidAccount, setIsValidAccount] = useState<boolean>(false);
  
  const [loginStatusMessage, setLoginStatusMessage] = useState<string>("");
  const [loginStatusVariant, setLoginStatusVariant] = useState<string>("");
  
  //modal portion
  const [show, setShow] = useState(false);
  const [isModalEmailValid, setIsModalEmailValid] = useState<boolean>(false);
  const [hasEnteredModal, setHasEnteredModal] = useState<boolean>(false);
  const [modalEmail, setModalEmail] = useState<string>('');
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const handleAndValidateModalEmail = (event: ChangeEvent<HTMLInputElement>) => {

    setHasEnteredModal(true); // will be called onChange() so this will immediate be set to true when the user types
        
    const emailInput = event.target.value;
    setModalEmail(emailInput);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsModalEmailValid(emailRegex.test(emailInput));
  }

  const handleSubmitModal = () =>{

    setHasEnteredModal(true); // if a user clicks Submit and the input is empty, this will trigger the error msg to display

    if (isModalEmailValid){
      console.log("Sending email: ", modalEmail, " to admin");
      setShow(false);
      setModalSubmitted(true);
    }
  }
  //end modal portion

  const handleAndValidateEmail = (event: ChangeEvent<HTMLInputElement>) => {
        
    const emailInput = event.target.value;
    setEmail(emailInput);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailInput));
  }

  const handleAndValidatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsValidAccount(isEmailValid); 

    if (isEmailValid){
      const formData = {
        email: email,
        password: password,
      }

      try {
        const response = await axios.post("/login_user", formData);

        //Handle response and set status
        if (response.data.message === "Login successful"){
          setLoginStatusMessage(response.data.message);
          setLoginStatusVariant("success");
          navigateToLandingPage();
          setIsValidAccount(true);

        }
        else if (response.data.message === "Wrong password or email entered") {
          setLoginStatusMessage(response.data.message);
          setLoginStatusVariant("danger");
        }

      } catch(error){
        console.error("Error:", error);
        setLoginStatusMessage("ERROR: Unexpected Error. Please refresh the page and try again.");
        setLoginStatusVariant("danger");
        setIsValidAccount(false);
      }
    }
  }


  return (
    <>
      <Form className="p-5 h-100 login-pic form-container" onSubmit={handleSubmit}>
        <h1 className="text-center" style={{fontSize: 60}}>uOBites</h1>
        <Form.Group className="mt-2 mb-4 form-field" >
          <Form.Label>Enter your email address</Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            style={{width: "40%"}}
            onChange={handleAndValidateEmail}
          />
          {/* If email is not valid, then the statement after && will be rendered: displaying warning message */}
          {!isEmailValid && <small className="text-danger">Please enter a valid email address.</small>}
        </Form.Group>
        <Form.Group className="mt-2 mb-4 form-field">
          <Form.Label>Enter your password</Form.Label>
          <InputGroup style={{width: '40%'}}>
            <Form.Control
              required
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={handleAndValidatePassword}
            />
            <Button
              variant="outline-secondary"
              className="password-icon-container">
              {showPassword ?
                <EyeFill color="grey" onClick={() => setShowPassword(!showPassword)} /> :
                <EyeSlashFill color="grey" onClick={() => setShowPassword(!showPassword)} />}
            </Button>
          </InputGroup>
          <div className="text-center">
            <h6 className="register-link mt-3" onClick={handleShowModal}>Forgot Password?</h6>
          </div>
        </Form.Group>

        {/* For forget password modal popup */}
        <Modal className="modal-style" show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mt-2 mb-4 form-field">
              <Form.Label>Please enter your email address for further assistance, an administrator will contact you in 1-3 business days.
              </Form.Label>
              <Form.Control
                required
                id="modalEmail"
                type="email"
                placeholder="name@example.com"
                value={modalEmail}
                autoFocus
                onChange={handleAndValidateModalEmail}
              />
              {!isModalEmailValid && hasEnteredModal && 
              <small className="text-danger">Please enter a valid email address.</small>}
               
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className="uottawa-modal-btn" variant="primary" onClick={handleSubmitModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

        <div className="text-center">
          <Button className="uottawa-btn" type="submit">
            Log in
          </Button>
          <h6 className="register-link mt-3" onClick={navigateToRegistrationPage}>Don't have an account? Register here</h6>
        </div>
        {isValidAccount && <Alert variant={loginStatusVariant}>{loginStatusMessage}</Alert>} 
        {modalSubmitted && <Alert variant={"success"}>{"Success! If your email is registered with uOBites, an \
        administrator will contact you within 3-5 business days with instructions to recover your account."}</Alert>}
      </Form>
    </>
  );
}
  
export default LoginPage;