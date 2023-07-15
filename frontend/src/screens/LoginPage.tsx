import React, { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValidAccount, setIsValidAccount] = useState<boolean>(false);
 
  const [registerStatusMessage, setRegisterStatusMessage] = useState<string>(""); // to display success/failed status after clicking Create Account button
  const [registerStatusVariant, setRegisterStatusVariant] = useState<string>("primary");

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
      console.log("Logging in...")

      const formData = {
        email: email,
        password: password,
      }

      try{
        const response = await axios.post("/login_user", formData);
        console.log(response.data);

        //Handle response and set status
        if (response.data.message === "Login successful"){
          setRegisterStatusMessage(response.data.message);
          setRegisterStatusVariant("success");
          navigate('/home');
          setIsValidAccount(true);

        }else if (response.data.message === "Wrong password or email entered"){
          setRegisterStatusMessage(response.data.message);
          setRegisterStatusVariant("danger");
          //TODO
          //ask to change pw
          //popup window
        }

      }catch(error){
        console.error("Error:", error);
        setRegisterStatusMessage("ERROR: Unexpected Error. Please refresh the page and try again.");
        setRegisterStatusVariant("danger");
        setIsValidAccount(false);
      }
    }
  }

  const navigateToRegistrationPage = () => {
    navigate('/registration');
  };

  const navigateToLandingPage = () => {
    navigate('/home');
  };


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
            placeholder="example@gmail.com"
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
        </Form.Group>
        <div className="text-center">
          <Button className="uottawa-btn" type="submit">
            Log in
          </Button>
          <h6 className="register-link mt-3" onClick={navigateToRegistrationPage}>Don't have an account? Register here</h6>
        </div>
        {isValidAccount && <Alert variant={registerStatusVariant}>{registerStatusMessage}</Alert>} 
      </Form>
    </>
  );
}
  
export default LoginPage;