import React, { useEffect, useState } from 'react';
import '../MenuPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Navbar from './components/Navbar';
import OutletInfoJson from '../data/foodOutletsInfo.json';

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

export default function MenuPage() {

  const OutletMenuJson: MenuItem[] = require('../data/foodOutletsMenu.json');

  const location = useLocation();
  const info = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    <>
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
                    </>  
                  );
                } else {
                  return <></>;
                }
              })}
              <br />
              <hr />
            </div>
            <h2 className='text-center text-decoration-underline'>Menu</h2>
            <br />
              {OutletMenuJson.map((outlet) => {
                if (outlet.id === info.outletId) {
                  return Object.entries(outlet.menu).map(([category, items]) => (
                    <div key={category} className='mx-1 px-5'>
                      <h4 className='px-4'>{category}</h4>
                      <div className='menu-list'>
                        {Object.entries(items).map(([foodItem, item]) => (
                          <div className='menu-item '>
                            <h6>${item.price.toFixed(2)}</h6>
                            <img src={item.image} alt={foodItem} width={150} />
                            <div className='mt-1' style={{ width: 150 }}>
                              <h6>{foodItem}</h6>
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
