import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../OrderStatus.scss';
import { useLocation } from 'react-router';
import OrderStatus1 from './components/OrderStatus1';
import OrderStatus2 from './components/OrderStatus2';
import OrderStatus3 from './components/OrderStatus3';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrderStatus() {

    const location = useLocation();
    const orderSummary = location.state || {}; // receive props from PaymentPage.tsx
    const [orderStatusNum, setOrderStatusNum] = useState(0);

    // check whether the user is logged in or not in order to display the correct content
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
    if (orderSummary.email) {
        setIsLoggedIn(true);
    }
    }, [orderSummary.email]);

    /**
     * Generates a random 9-digit order ID
     */
    const getRandomOrderId = (): number => {
        const min = 100000000;
        const max = 999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Randomly determines when to move to the next order status every few secodns
     */
    const MINUTE_MS = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
            // every time interval, the user receives a 1 in x chance of moving to the next order status
            const min = 0;
            const max = 3; // the higher this value, the lower the chance of status moving forward
            const randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
            console.log("CHECKING STATUS " + randomNumber);
            if (randomNumber === 0 && orderStatusNum < 2) { // move order status if num === 0
                setOrderStatusNum(orderStatusNum + 1);
            }
        }, MINUTE_MS);
        
        // below represents the unmount function which is needed to clear interval to prevent memory leaks
        return () => clearInterval(interval); 
    }, [orderStatusNum]);

    /**
     * Determines which order status component to display
     * @returns the correct OrderStatus component
     */
    const displayOrderStatus = () => {
        if (orderStatusNum === 0) {
            return <OrderStatus1 />
        } else if (orderStatusNum === 1) {
            return <OrderStatus2 />
        } else if (orderStatusNum === 2) {
            return <OrderStatus3 />
        } else {
            return <h1>UNKNOWN ERROR: Cannot display order status</h1>
        }
    }

    return (
        <>
            {isLoggedIn ? (
                    <>
                        <div className='pageContainer'>
                            {/* // TODO: Fix the random Order ID */}
                            <h1 style={{textAlign: 'center'}}>Order Confirmation #{328976583}</h1>
                            {displayOrderStatus()}
                            <section className='orderSummary'>
                                <h3>Order Summary</h3>
                                <p>Email: {orderSummary.email}</p>
                                <p>Order Total: ${orderSummary.total}</p>
                            </section>
                        </div>
                    </>
                ) : (
                    <Modal size="lg" centered show={true} className='modal-style'>
                        <Modal.Body>
                        <h4>Error</h4>
                        <p>
                            You have not logged in yet. <Link to={'/'}>Click here to go to the login page.</Link>
                        </p>
                        </Modal.Body>
                    </Modal>
                )
            }
        </>
    )
}
