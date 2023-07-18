import { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

const PaymentPage = () => {

  const navigate = useNavigate();

  //TODO pass props
  const navigateToOrderStatus = () => {
    navigate('/OrderStatus');
  };

  const location = useLocation();
  const { email = "bob@bob.com" } = location.state || {}; // value is passed from the menu page
  //TODO remove bob later when menu is implemented, pass email props to payment
 
  //all the props passed from menu
  const { itemCount = 2 } = location.state || {}; // value is passed from the menu page
  const { subTotal = 30 } = location.state || {}; // value is passed from the menu page
  const {cart} = location.state || {}; //value passed from menu

  const [tax, setTax] = useState<number | null>(null); //13% of subtotal
  const [orderTotal, setOrderTotal] = useState<number | null>(null); //113% of subtotal
  const [cardNum, setCardNum] = useState<number | null>(null);
  const [cardCVC, setCardCVC] = useState<number | null>(null);

  const [useFlex, setUseFlex] = useState<boolean>(true); //false -> we want credit card form to appear
  const [isCardNumValid, setIsCardNumValid] = useState<boolean>(false);
  const [isSecurityNumValid, setIsSecurityNumValid] = useState<boolean>(false);
  const [validPayment, isValidPayment] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO check if this works when connecting menu
  // check whether the user is logged in or not in order to display the correct content
  useEffect(() => {
    if (email) {
      setIsLoggedIn(true);

      //calculate tax and orderTotal
      setTax(0.13*subTotal);
      setOrderTotal(1.13*subTotal);
    }
  }, [email]);

  const handleAndValidateCardNum = (event: ChangeEvent<HTMLInputElement>) => {
    const cardInput = event.target.value;
    const inputLength = String(cardInput).length;

    if (inputLength > 0 && inputLength !== 16) {
      setIsCardNumValid(false);
    } else {
      setIsCardNumValid(true);
    }
    setCardNum(parseInt(cardInput));

  }

  const handleAndValidateCVC = (event: ChangeEvent<HTMLInputElement>) => {
    const cardInput = event.target.value;
    const inputLength = String(cardInput).length;

    if (inputLength > 0 && inputLength !== 3) {
      setIsSecurityNumValid(false);
    } else {
      setIsSecurityNumValid(true);
    }
    setCardCVC(parseInt(cardInput));

  }

  //validate navigate to next page
  const handlePay =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    console.log("in handle pay ");
    
    setFormSubmitted(true);
    isValidPayment(isCardNumValid && isSecurityNumValid);

    if (isCardNumValid && isSecurityNumValid){
      navigateToOrderStatus();
      isValidPayment(true);
    }else{
      isValidPayment(false);
    }
    
  }

  const handlePaymentChange = () =>{
    setUseFlex(!useFlex); //toggle
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className = "container p-5">
            <h2 className='text-center mb-4'>Checkout</h2>
          </div>

          <div className='container' style={{padding:0}}>
            <div className='row'>
              <div className='col-9' style={{padding:20}}>
                <h3>Payment Information</h3>
                <Form className="mb-4 mt-4">
                <h5> Please select a payment method</h5>
                <br></br>
                  <Form.Check
                  type="radio"
                  label="Flex Card"
                  name="radioGroup"
                  value="Flex Card"
                  onChange={handlePaymentChange}
                  />

                <Form.Check
                type="radio"
                label="Credit/Debit card"
                name="radioGroup"
                value="card"
                checked = {useFlex}
                onChange={handlePaymentChange}
                />
                </Form>

                {useFlex ? (
                  //use credit card 
                  <div>
                    <h5>Please enter billing information:</h5>
                    <Form className="mt-2 mb-4" onSubmit={handlePay}>
                      <Form.Group >
                        <Form.Label>Card Number <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            required
                            id="cardNumber"
                            type="number"
                            value={cardNum || ""}
                            maxLength={16}
                            placeholder = "5xxx xxxx xxxx xxxx"
                            onChange ={handleAndValidateCardNum}
                          />
                          {!isCardNumValid &&
                          <small className="text-danger">Please enter a valid card number.</small>}
                      </Form.Group>

                      <Form.Group className="mt-2 mb-4">
                        <Form.Label>Name on card <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            required
                            id="cardName"
                            type="text"
                            placeholder='John Doe'
                            maxLength={255}
                          />
                      </Form.Group> 
                      
                      <Form.Group className="mt-2 mb-4">
                        <Form.Label>Expiration date <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            required
                            id="expiry"
                            type="date"
                          />
                      </Form.Group>   

                      <Form.Group className="mt-2 mb-4">
                        <Form.Label>Security Number (CVV/CVC) <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            required
                            id="securityNumber"
                            type="number"
                            value={cardCVC || ""}
                            placeholder = "123"
                            onChange ={handleAndValidateCVC}
                          />
                          {!isSecurityNumValid &&
                          <small className="text-danger">Please enter a valid CVV/CVC number.</small>}
                      </Form.Group>     

                      <div className="text-center">
                        <Button className="uottawa-btn" type="submit">
                          Pay with credit/debit card
                        </Button>
                      </div>              

                    </Form>
                  </div>
                ) : (
                  //use flex
                  <div className='mb-4 mt-4'>
                    <p>Your student card balance will be charged for this transaction.</p>
                    <Button className="uottawa-btn mt-4" onClick={navigateToOrderStatus}>
                      Pay with Flex Card
                    </Button>
                  </div>
                )}
              </div>

              {/* Order summary */}
              <div className='col-3'  style={{borderLeft: "2px solid grey"}}>
                <h3>Order Summary</h3>
                <div>
                  <p>Items ({itemCount}): ${subTotal} <br></br>
                  Estimated GST/HST: ${tax?.toFixed(2)} <br></br>
                  Order Total: ${orderTotal}</p>  
                </div>
              </div>
            </div>
          </div>
        </>

      ) : (
        <>
          <Modal size="lg" centered show={true} className='modal-style'>
            <Modal.Body>
              <h4>Error</h4>
              <p>
                You have not logged in yet. <Link to={'/'}>Click here to go to the login page.</Link>
              </p>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default PaymentPage;