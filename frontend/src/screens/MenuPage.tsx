import React, { useEffect, useState } from 'react';
import '../MenuPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Navbar from './components/Navbar';
import OutletInfoJson from '../data/foodOutletsInfo.json';
import OutletMenuJson from '../data/foodOutletsMenu.json';

export default function MenuPage() {

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
            <h2>Information</h2>
            <br />
            {OutletInfoJson.map((outlet) => {
                if (outlet.foodOutletId === info.outletId) {
                  return (
                    <>
                    <p><strong>Location: </strong>{outlet.Location}</p>
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
            <br />
            <h2>Menu</h2>
            {/* {OutletMenuJson.map((outlet) => {
                if (outlet.foodOutletId === info.outletId) {
                  for (const category in outlet.menu) {
                    console.log(category);
                    console.log("--------------------");
                  
                    // Loop through the items within each category
                    for (const item in outlet.menu[category]) {
                      console.log("Item:", item);
                      console.log("Price:", outlet.menu[category][item].price);
                      console.log("Image:", outlet.menu[category][item].image);
                      console.log("--------------------");
                    }
                  }
                } else {
                  return <></>;
                }
            })} */}
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
