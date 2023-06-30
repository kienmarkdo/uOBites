import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles.scss';
// not done
const RegistrationPage = () => {

    return (
        <div className="container">
        <h4>Register now to use uOBites</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Enter your full name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your your email address" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter your password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm your password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Button className="uottawa-btn" type="submit">
                    Click here to submit form
                </Button>
            </Form>
        </div>
    )
}

export default RegistrationPage;