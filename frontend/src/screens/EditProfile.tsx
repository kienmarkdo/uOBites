import React, { ChangeEvent, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import appLogo from "../images/app_logo_white.png";
import { BoxArrowRight } from 'react-bootstrap-icons';
import axios from "axios";

const EditProfile = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailState, setEmailState] = useState<string>("");
    const [flexCard, setFlexCard] = useState<number | null>(null);
    const [isFlexCardValid, setIsFlexCardValid] = useState<boolean>(true); // true cause it can be null
    const [isValidUpdate, setIsValidUpdate] = useState<boolean>(false);

    const [registerStatusMessage, setRegisterStatusMessage] = useState<string>(""); // to display success/failed status after clicking Create Account button
    const [registerStatusVariant, setRegisterStatusVariant] = useState<string>("primary");

    const location = useLocation();
    const {state: email} = location.state || {};

    alert(email)

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
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

        if (isFlexCardValid){
            console.log("Updating information in DB...")
            const formData = {
                email: emailState,
                first_name: firstName,
                last_name: lastName,
                flex_card: flexCard,
            }
            
            try{
                const response = await axios.put("/update_user_info", formData);
             
                setRegisterStatusMessage(response.data.message);
                setRegisterStatusVariant("success");
                setIsValidUpdate(true);

            }catch(error){
                //db didnt update correctly
                console.error("Error while updating db: ", error);
                setRegisterStatusMessage("ERROR: Unexpected Error. Please refresh the page and try again.");
                setRegisterStatusVariant("danger");
                setIsValidUpdate(false);
            }
        }
    
        setIsValidUpdate(isFlexCardValid);
        
    }

    //execute as soon as page renders
    useEffect( () => {

        //function to get user info from db to prepopulate form
        const fetchUserInfo = async () => {
            try{
                const response = await axios.get('/get_user_info', {
                    params:{
                        email: email
                    }
                });

                //set form
                setFirstName(response.data["first_name"]);
                setLastName(response.data["last_name"]);
                setEmailState(response.data["email"]);
                setFlexCard(response.data["flex_card"]);
                
            }
            catch(error){
                console.error('Error while fetching data from db: ', error);
            }
        };
        
        //call function to populate
        fetchUserInfo();

    }, [])
    
    return (
        <>
            <div className='landing-header'> 
                <div className='d-flex align-items-center'>
                <img src={appLogo} alt="uOBites" width={"5%"} />
                </div>
                <div>
                <BoxArrowRight
                    size={25}
                    className='landing-page-icon me-4'
                    title='Logout'
                    onClick={logout} />
                </div>
            </div>

            
            <Form className="container p-5" onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">
                    My Profile
                </h3>
                <Form.Group className="mt-2 mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        readOnly
                        id="email"
                        type="email"
                        value={emailState}
                        style={{color: "gray"}}
                    />
                </Form.Group>
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
                <div className="text-center">
                    <Button className="uottawa-btn" type="submit">
                        Update profile information
                    </Button>
                </div>
                <br />
                {isValidUpdate &&
                    <Alert className="text-center" variant={registerStatusVariant}>{registerStatusMessage}</Alert>} 
            </Form>
        </>
    )
}

export default EditProfile;