import React from 'react';
import '../styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreIcon from './components/StoreIcon';
import BentoSushiLogo from "../images/bento_sushi_logo.png";
import ThaiExpressLogo from "../images/thai_express_logo.png";
import PremiereMoissonLogo from "../images/premiere_moisson_logo.png";
import TimHortonLogo from "../images/tim_hortons_logo.png";
import LeBacAFrites from "../images/le_bac_a_frites_logo.png";
import StarbucksLogo from "../images/starbucks_logo.png";
import GoCafeLogo from "../images/go_cafe_logo.png";
import FlourKitchenLogo from "../images/flour_kitchen_logo.png";
import SecondCupLogo from "../images/second_cup_logo.png";
import ParamountLogo from "../images/paramount_logo.png";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// idk if there's a better way to do it, cause the import statements gets long as we continue adding all the stores
// and u cannot add the path to an image directly in the code below

const LandingPage = () => {

  const navigate = useNavigate();

  const storesInfo = [
    { storeName: "Bento Sushi", imageSrc: BentoSushiLogo },
    { storeName: "Premiere Moisson", imageSrc: PremiereMoissonLogo },
    { storeName: "Tim Hortons", imageSrc: TimHortonLogo },
    { storeName: "Thai Express", imageSrc: ThaiExpressLogo },
    { storeName: "Le Bac À Frites", imageSrc: LeBacAFrites }, 
    { storeName: "Starbucks", imageSrc: StarbucksLogo },
    { storeName: "Go Café", imageSrc: GoCafeLogo },
    { storeName: "Flour Kitchen", imageSrc: FlourKitchenLogo },
    { storeName: "Second Cup", imageSrc: SecondCupLogo },
    { storeName: "Paramount Lebanese Kitchen", imageSrc: ParamountLogo }
  ]

  const navigateToRegistrationPage = () => {
    navigate('/registration'); // Replace '/registration' with the actual path to the RegistrationPage component
  };
  
  return (
    <>
      <div className='landing-header'>
        <h1 style={{ fontSize: "45px" }}>UOBITES</h1>
        <div className='button-container'>
          <button className='uottawa-btn'>
            Login
          </button>
          {/* <Button className='uottawa-btn'>
            Login
          </Button> */}
          <button className='uottawa-btn' onClick={navigateToRegistrationPage}>
            Register
          </button>
        </div>
      </div>
      <div className='landing-body'>
        <h2>
          Food Outlets on Campus
          <div className='store-list'>
            {storesInfo.map((store) => 
              <StoreIcon storeName={store.storeName} imageSrc={store.imageSrc} />
            )}
          </div>
        </h2>
      </div>
    </>
  );
}

export default LandingPage;
