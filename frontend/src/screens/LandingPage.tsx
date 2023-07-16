import { useEffect, useState } from 'react';
import '../styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewOutlets from './components/ViewOutlets';
import { Modal } from 'react-bootstrap';


const LandingPage = () => {

  const location = useLocation();
  const { email } = location.state || {}; // value is passed from the login page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check whether the user is logged in or not in order to display the correct content
  useEffect(() => {
    if (email) {
      setIsLoggedIn(true);
    }
  }, [email]);
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <ViewOutlets email={ email } />
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

export default LandingPage;
