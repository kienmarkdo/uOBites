import React from 'react';
import './App.scss';
import StoreIcon from './StoreIcon';
import BentoSushiLogo from "./images/bento_sushi_logo.png";
import ThaiExpressLogo from "./images/thai_express_logo.png";
import PremiereMoissonLogo from "./images/premiere_moisson_logo.png";
import TimHortonLogo from "./images/tim_hortons_logo.png";
import LeBacAFrites from "./images/le_bac_a_frites_logo.png";
import StarbucksLogo from "./images/starbucks_logo.png";
import GoCafeLogo from "./images/go_cafe_logo.png";
import FlourKitchenLogo from "./images/flour_kitchen_logo.png";
import SecondCupLogo from "./images/second_cup_logo.png"
// idk if there's a better way to do it, cause the import statements gets long as we continue adding all the stores
// and u cannot add the path to an image directly in the code below

const LandingPage = () => {

  const storesInfo = [
    { storeName: "Bento Sushi", imageSrc: BentoSushiLogo },
    { storeName: "Premiere Moisson", imageSrc: PremiereMoissonLogo },
    { storeName: "Tim Hortons", imageSrc: TimHortonLogo },
    { storeName: "Thai Express", imageSrc: ThaiExpressLogo },
    { storeName: "Le Bac À Frites", imageSrc: LeBacAFrites }, 
    { storeName: "Starbucks", imageSrc: StarbucksLogo },
    { storeName: "Go Café", imageSrc: GoCafeLogo },
    { storeName: "Flour Kitchen", imageSrc: FlourKitchenLogo },
    { storeName: "Second Cup", imageSrc: SecondCupLogo }
  ]
  
  return (
    <div className="App">
      <div className='landing-header'>
        <h1 style={{fontSize: "45px"}}>UOBITES</h1>
        <button className='login-btn'>
          Login
        </button>
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
    </div>
  );
}

export default LandingPage;
