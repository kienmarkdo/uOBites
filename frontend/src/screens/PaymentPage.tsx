import { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { subtract } from 'cypress/types/lodash';

const PaymentPage = () => {

  const navigate = useNavigate();

  //TODO pass props to order status page
  const navigateToOrderStatus = () => {
    navigate('/OrderStatus');
  };

  //all the props passed from menu
  const location = useLocation();
  const { email = "bob@bob.com" } = location.state || {}; // value is passed from the menu page
  //TODO remove bob later when menu is implemented, pass email props to payment
  //const {cart = {food1: [2,10], food2:[1,5]}} = location.state || {}; //value passed from menu

  //todo get props instead
  const [cart, setCart] = useState<{ [foodItem: string]: [quantity: number, price: number] }>({
    food1: [2, 13.2],
    food2: [1, 15.5],
  });

  const [itemCount, setItemCount] = useState<number | null>(null);
  const [subTotal, setSubTotal] = useState<number>(0); //total without tax
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

      //calculate total price
      calculateEstimatedTotal();

      //calculate tax and orderTotal
      setTax(Number((0.13 * subTotal).toFixed(2))); // 13% of subtotal with 2 decimal places
      setOrderTotal(Number((1.13 * subTotal).toFixed(2))); // 113% of subtotal with 2 decimal places
    }
  }, [email]);

  const calculateEstimatedTotal = () => {
    let estimatedTotal: number = 0

    Object.keys(cart).map((foodItem) => {
      const [quantity, price] = cart[foodItem];
      return estimatedTotal += (quantity * price)
    })

    setSubTotal(estimatedTotal);
  }

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

              {/* Payment info */}
              <div className='col-9' style={{paddingRight:100}}>
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
              <div className='col-3'  style={{borderLeft: "2px solid grey", paddingLeft:30}}>
                <h3>Order Summary</h3>
                <div style={{padding : 10}}>
                  {Object.keys(cart).length !== 0 ? (
                    Object.keys(cart).map((foodItem) => {
                      const [quantity, price] = cart[foodItem];
                      return (
                        <div className="row" key={foodItem}>
                          <div className="col-10">
                            <h6>x{quantity} {foodItem}</h6>
                          </div>
                          <div className="col-2">
                            <h6>${(price*quantity).toFixed(2)} </h6>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h6>No items in the cart</h6>
                 )}
                 <hr></hr>
                  <div className="row" key={subTotal}>
                    <div className="col-10">
                      <h6>Subtotal:</h6>
                      <h6>Estimated GST/HST:</h6>
                      <h6>Order Total:</h6>
                    </div>
                    <div className="col-2">
                      <h6>${subTotal.toFixed(2)} </h6>
                      <h6>${tax?.toFixed(2)} </h6>
                      <h6>${orderTotal}</h6>
                    </div>
                  </div>

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