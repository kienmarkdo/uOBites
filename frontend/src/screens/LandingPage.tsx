import React, { useEffect, useState } from 'react';
import '../styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import StoreIcon from './components/StoreIcon';
import BentoSushiLogo from "../images/bento_sushi_logo.png";
import PremiereMoissonLogo from "../images/premiere_moisson_logo.png";
import TimHortonLogo from "../images/tim_hortons_logo.png";
import LeBacAFrites from "../images/le_bac_a_frites_logo.png";
import StarbucksLogo from "../images/starbucks_logo.png";
import FlourKitchenLogo from "../images/flour_kitchen_logo.png";
import SecondCupLogo from "../images/second_cup_logo.png";
import ParamountLogo from "../images/paramount_logo.png";
import JuiceBarLogo from "../images/juice_bar_logo.png";
import Pizza800Logo from "../images/pizza_800_logo.png";
import appLogo from "../images/app_logo_white.png";
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import axios from "axios";

// idk if there's a better way to do it, cause the import statements gets long as we continue adding all the stores
// and u cannot add the path to an image directly in the code below

const LandingPage = () => {

  const location = useLocation();
  const {email} = location.state || {};

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  }

  const viewProfile = () => {
    navigate('/editProfile');
  }

  const storesInfo = [
    { storeName: "Bento Sushi (UCU)", imageSrc: BentoSushiLogo },
    { storeName: "Premiere Moisson (FSS)", imageSrc: PremiereMoissonLogo },
    { storeName: "Tim Hortons (CRX)", imageSrc: TimHortonLogo },
    { storeName: "Tim Hortons (SITE)", imageSrc: TimHortonLogo },
    { storeName: "Le Bac À Frites (Parking lot K)", imageSrc: LeBacAFrites }, 
    { storeName: "Starbucks (DMS)", imageSrc: StarbucksLogo },
    { storeName: "Flour Kitchen", imageSrc: FlourKitchenLogo },
    { storeName: "Second Cup (HSY)", imageSrc: SecondCupLogo },
    { storeName: "Paramount (CRX)", imageSrc: ParamountLogo },
    { storeName: "305 Juice bar (UCU)", imageSrc: JuiceBarLogo },
    { storeName: "Pizza 800 (STE)", imageSrc: Pizza800Logo }
  ]

  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchUserInfo = async () => {

      try {
        const response = await axios.get('/get_user_info', {
          params: {
            email: email
          }
        });
        setName(response.data["first_name"]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserInfo();
  }, [email])
  
  
  return (
    <>
      <div className='landing-header'> 
        <div className='d-flex align-items-center'>
          <img src={appLogo} alt="uOBites" width={"5%"} />
          <h4 className='ms-2 mt-2'>Hi {name}!</h4>
        </div>
        <div>
          <PersonCircle
            size={25}
            className='landing-page-icon me-4'
            title='View Profile'
            onClick={viewProfile}
          />
          <BoxArrowRight
            size={25}
            className='landing-page-icon me-4'
            title='Logout'
            onClick={logout} />
        </div>
      </div>
      <div className='landing-body'>
        <h3>
          Choose a food outlet
          <div className='store-list'>
            {storesInfo.map((store, index) => 
              <StoreIcon key={index} storeName={store.storeName} imageSrc={store.imageSrc} />
            )}
          </div>
        </h3>
      </div>
    </>
  );
}

export default LandingPage;
