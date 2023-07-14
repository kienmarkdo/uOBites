import React, { ChangeEvent, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [flexCard, setFlexCard] = useState<number | null>(null);
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
    const [isValidAccount, setIsValidAccount] = useState<boolean>(false);
    const [isFlexCardValid, setIsFlexCardValid] = useState<boolean>(true); // true cause it can be null

    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const [registerStatusMessage, setRegisterStatusMessage] = useState<string>(""); // to display success/failed status after clicking Create Account button
    const [registerStatusVariant, setRegisterStatusVariant] = useState<string>("primary");

    const handleAndValidateEmail = (event: ChangeEvent<HTMLInputElement>) => {
        
        const emailInput = event.target.value;
        setEmail(emailInput);
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(emailInput));
    }

    const handleAndValidatePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const password = event.target.value;
        if (id === "password1") {
            setPassword1(password);
            setPasswordIsValid(password === password2);
        } else if (id === "password2") {
            setPassword2(password);
            setPasswordIsValid(password1 === password);
        }
    }

    const handleAndValidateFlexCard = (event: ChangeEvent<HTMLInputElement>) => {
        const flexCardInput = event.target.value;
        const inputLength = String(flexCardInput).length

        if (inputLength > 0 && inputLength !== 9) {
            setIsFlexCardValid(false);
        } else {
            setIsFlexCardValid(true);
        }
        setFlexCard(parseInt(flexCardInput));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsValidAccount(isEmailValid && passwordIsValid && isFlexCardValid);

        if (isEmailValid && passwordIsValid) {
            console.log("Creating account in DB...")
            const formData = {
                email: email,
                password: password2,
                first_name: firstName,
                last_name: lastName,
                flex_card: flexCard,
            }

            try {
                const response = await axios.post("/register_user", formData);
                console.log(response.data);

                // Handle the response
                if (response.data.message === "Username already exists") {
                    setRegisterStatusMessage(response.data.message);
                    setRegisterStatusVariant("danger");

                } else if (response.data.message === "User registered successfully") {
                    setRegisterStatusMessage(response.data.message);
                    setRegisterStatusVariant("success");
                    navigate('/');
                    setIsValidAccount(true);
                }
          
              } catch (error) {
                console.error("Error:", error);
                setRegisterStatusMessage("ERROR: Unexpected Error. Please refresh the page and try again.");
                setRegisterStatusVariant("danger");
                setIsValidAccount(false);
              }
        } // end if

    }

    return (
        <>
            <Form className="container p-5" onSubmit={handleSubmit}>
                <h3 className="text-center">Register now to start ordering from uOBites</h3>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>First name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        required
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        maxLength={255}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Last name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        required
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        maxLength={255}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        required
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        maxLength={255}
                        onChange={handleAndValidateEmail}
                    />
                    {!isEmailValid && <small className="text-danger">Please enter a valid email address.</small>}
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>uOttawa flex card number if applicable (Student number)</Form.Label>
                    <Form.Control
                        id="flexCard"
                        type="number"
                        placeholder="300193369"
                        value={flexCard || ""}
                        onChange={handleAndValidateFlexCard}
                    />
                    {!isFlexCardValid && <small className="text-danger">Flex card number should be 9 digits.</small>}
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            required
                            id="password1"
                            type={showPassword1 ? "text" : "password"}
                            placeholder="Enter password"
                            value={password1}
                            minLength={6}
                            maxLength={255}
                            onChange={handleAndValidatePassword}
                        />
                        <Button
                            variant="outline-secondary"
                            className="password-icon-container"
                        >
                            {showPassword1 ?
                                <EyeFill color="grey" onClick={() => setShowPassword1(!showPassword1)} /> :
                                <EyeSlashFill color="grey" onClick={() => setShowPassword1(!showPassword1)} />}
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Confirm password <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            required
                            id="password2"
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Enter password"
                            value={password2}
                            minLength={6}
                            maxLength={255}
                            onChange={handleAndValidatePassword}
                        />
                        <Button
                            variant="outline-secondary"
                            className="password-icon-container"
                        >
                            {showPassword2 ?
                                <EyeFill color="grey" onClick={() => setShowPassword2(!showPassword2)} /> :
                                <EyeSlashFill color="grey" onClick={() => setShowPassword2(!showPassword2)} />}
                        </Button>
                    </InputGroup>
                    {!passwordIsValid && <small className="text-danger">Passwords do not match</small>}
                </Form.Group>
                <div className="text-center">
                    <Button className="uottawa-btn" type="submit">
                        Create account
                    </Button>
                </div>
                <br />
                {isValidAccount && <Alert variant={registerStatusVariant}>{registerStatusMessage}</Alert>} 
            </Form>
        </>
    )
}

export default RegistrationPage;