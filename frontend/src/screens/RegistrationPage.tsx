import React, { ChangeEvent, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles.scss';

const RegistrationPage = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [doesPasswordMatch, setDoesPasswordMatch] = useState<boolean>(true);
    const [isValidAccount, setIsValidAccount] = useState<boolean>(false);

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
            setDoesPasswordMatch(password === password2);
        } else if (id === "password2") {
            setPassword2(password);
            setDoesPasswordMatch(password1 === password);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password1);
        console.log(password2);

        setIsValidAccount(isEmailValid && doesPasswordMatch);

        if (isEmailValid && doesPasswordMatch) {
            console.log("Creating account in DB")
        }
        //more code afer this line when backend is implemented 
    }

    return (
        <>
            <Form className="container p-5" onSubmit={handleSubmit}>
                <h3 className="text-center">Register now to start ordering from uOBites</h3>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Enter your first name</Form.Label>
                    <Form.Control required id="firstName" type="text" placeholder="John" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Enter your last name</Form.Label>
                    <Form.Control required id="lastName" type="text" placeholder="Doe" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Enter your email address:</Form.Label>
                    <Form.Control required id="email" type="email" placeholder="example@gmail.com" value={email} onChange={handleAndValidateEmail} />
                    {!isEmailValid && <small className="text-danger">Please enter a valid email address.</small>}
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control required id="password1" type="password" placeholder="Enter password" value={password1} onChange={handleAndValidatePassword} />
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control required id="password2" type="password" placeholder="Enter password" value={password2} onChange={handleAndValidatePassword} />
                    {!doesPasswordMatch && <small className="text-danger">Passwords do not match</small>}
                </Form.Group>
                <div className="text-center">
                    <Button className="uottawa-btn mt-4" type="submit">
                        Create account
                    </Button>
                </div>
                {isValidAccount && <h3>Successful created account!</h3>} 
            </Form>
        </>
    )
}

export default RegistrationPage;