import React, { useEffect, useState } from 'react';
import '../MenuPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Navbar from './components/Navbar';
import OutletInfoJson from '../data/foodOutletsInfo.json';
import { PlusLg, DashLg, InfoCircleFill, Cart4 } from 'react-bootstrap-icons';

interface MenuItem {
  id: number;
  menu: {
    [category: string]: {
      [foodItem: string]: {
        price: number;
        image: string;
      };
    };
  };
}

const MenuPage = () => {

  const OutletMenuJson: MenuItem[] = require('../data/foodOutletsMenu.json');

  const location = useLocation();
  const info = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const [cart, setCart] = useState<{[foodItem: string]: [quantity: number, price: number]}>({});

  const increaseQuantity = (foodItem: string, price: number) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[foodItem]?.[0] || 0;
      return {
        ...currentCart,
        [foodItem]: [currentQuantity + 1, price],
      };
    });
  };

  const decreaseQuantity = (foodItem: string, price: number) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[foodItem]?.[0] || 0;
      const currentPrice = currentCart[foodItem]?.[1] || 0;

      if (currentQuantity === 0) {
        return currentCart;
      }

      const newQuantity = currentQuantity - 1;

      if (newQuantity === 0) {
        const { [foodItem]: removedItem, ...updatedCart } = currentCart;
        return updatedCart;
      } else {
        return {
          ...currentCart,
          [foodItem]: [newQuantity, currentPrice],
        };
      }
    });
  };

  const calculateEstimatedTotal = () => {
    let estimatedTotal: number = 0

    Object.keys(cart).map((foodItem) => {
      const [quantity, price] = cart[foodItem];
      return estimatedTotal += (quantity * price)
    })

    return estimatedTotal
  }

  // check whether the user is logged in or not in order to display the correct content
  useEffect(() => {
    if (info.email) {
      setIsLoggedIn(true);
    }
  }, [info.email]);
    
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <h1 className='menu-title'>{info.outletName}</h1>
          <section className='menu-container'>
            <div className='info-container'>
              <h2>Information</h2>
              <br />
               {OutletInfoJson.map((outlet) => {
                if (outlet.id === info.outletId) {
                  return (
                    <div className="container">
                      <div className="row">
                        <div className="col-md-7">
                          <p><strong>Location: </strong>{outlet.location}</p>
                          <p><strong>Hours: </strong></p>
                          <ul>
                            {Object.entries(outlet.hoursOfOperation).map(([day, hours]) => (
                              <li key={day}>
                                <strong>{day}</strong> : {hours}
                              </li>
                            ))}
                          </ul>
                          <p><strong>Exception: </strong>{outlet['exception:']}</p>
                        </div>
                        <div className="col-md-5 px-5">
                          <img
                            src={outlet.image}
                            alt={outlet.name}
                            width={"100%"}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
              <br />
              <hr />
            </div>
            <div className='d-flex justify-content-between'>
              <div></div>
              <h2 className='text-center text-decoration-underline'>Menu</h2>
              <div className='d-flex align-items-center view-cart-btn' onClick={handleShowModal}>
                <h6 className='mt-3 mx-2'>View Cart</h6>
                <Cart4 size={30} />
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <InfoCircleFill className='me-2' size={20} />
              <h6 className='mt-2'>Start adding to your cart by using the + and - button</h6>
            </div>
            <br />
              {OutletMenuJson.map((outlet) => {
                if (outlet.id === info.outletId) {
                  return Object.entries(outlet.menu).map(([category, items]) => (
                    <div key={category} className='mx-1 px-5'>
                      <h4 className='px-4'>{category}</h4>
                      <div className='d-flex flex-wrap'>
                        {Object.entries(items).map(([foodItem, item]) => (
                          <div key={foodItem} className='text-center mx-4'>
                            <div className='d-flex align-items-end justify-content-center' style={{ width: 150, height: 70 }}>
                              <h6>{foodItem}</h6>
                            </div>
                            <img src={item.image} alt={foodItem} width={150} />
                            <h6 className='pt-2'>${item.price.toFixed(2)}</h6>
                            <div className='mb-5'>
                              <DashLg className="quantity-modify-btn" size={20} onClick={() => decreaseQuantity(foodItem, item.price)} />
                              <span className='px-2'>
                                {cart[foodItem]?.[0] || 0}
                              </span>
                              <PlusLg className="quantity-modify-btn" size={20} onClick={() => increaseQuantity(foodItem, item.price)} />
                            </div>
                          </div>  
                        
                        ))}
                      </div>
                    </div>
                  ));
                } else {
                  return <></>;
                }
              })}
          </section>
          <Modal className="modal-style" show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>My Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container mt-3">
                <div className="row">
                  <div className="col-10">
                    <h5>Items</h5>
                  </div>
                  <div className="col-2">
                    <h5>Price</h5>
                  </div>
                </div>
                <hr />
                {Object.keys(cart).length !== 0 ? (
                  Object.keys(cart).map((foodItem) => {
                    const [quantity, price] = cart[foodItem];
                    return (
                      <div className="row" key={foodItem}>
                        <div className="col-10">
                          <h6>x{quantity} {foodItem}</h6>
                        </div>
                        <div className="col-2">
                          <h6>${price.toFixed(2)}</h6>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h6>No items in the cart</h6>
                )}
                <hr />
                <h6 className='text-end'>
                  Estimated Subtotal: <span>${calculateEstimatedTotal().toFixed(2)}</span>
                </h6>
              </div>         
            </Modal.Body>
          </Modal>
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
  )
}

export default MenuPage
