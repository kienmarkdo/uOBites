import React, { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false); //initially false, cannot see password
  const [isValidAccount, setIsValidAccount] = useState<boolean>(false); //check if acc is valid or not
  const [doesPasswordMatch, setDoesPasswordMatch] = useState<boolean>(true);
  
  const handleAndValidateEmail = (event: ChangeEvent<HTMLInputElement>) => {
        
    const emailInput = event.target.value; //to reflect changed email on the UI
    setEmail(emailInput);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailInput)); //stores true in setIsEmailValid if the email is valid
    //later will check if this is valid to allow login
  }

  const handleAndValidatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO need to retrieve from db and compare
    setPassword(event.target.value)
    setDoesPasswordMatch(true); 
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent reload for custom handling
    console.log(email);
    console.log(password);

    setIsValidAccount(isEmailValid && doesPasswordMatch);

    if (isEmailValid && doesPasswordMatch){
      console.log("Logged in")
      //TODO redirect to next page
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
            onChange={handleAndValidateEmail} //dynamically update email when changed on form
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
              type={showPassword ? "text" : "password"} //if show pw is true, then we can see plaintext, otherwise its not visible
              placeholder="Enter password"
              value={password}
              onChange={handleAndValidatePassword} //call function whenever this field changes
            />
            <Button
              variant="outline-secondary"
              className="password-icon-container">
              {/*Render the eye icon based on the showPassword variable, also sets the showPassword variable
                depending on toggling the eye icon*/}
              {showPassword ?
                <EyeFill color="grey" onClick={() => setShowPassword(!showPassword)} /> :
                <EyeSlashFill color="grey" onClick={() => setShowPassword(!showPassword)} />}
            </Button>
          </InputGroup>
          {/*make sure password match otherwise output msg*/}
          {!doesPasswordMatch && <small className="text-danger">Passwords do not match</small>}
        </Form.Group>
        <div className="text-center">
          <Button className="uottawa-btn" type="submit" onClick={navigateToLandingPage}>
            Log in
          </Button>
          <h6 className="register-link mt-3" onClick={navigateToRegistrationPage}>Don't have an account? Register here</h6>
        </div>
        {/* if isValidAccount is true, render the h3 as logged in*/}
        {isValidAccount && <h3>Successfully logged in!</h3>}
      </Form>
    </>
  );
}
  
export default LoginPage;