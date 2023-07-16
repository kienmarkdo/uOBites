import '../../styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreIcon from './StoreIcon';
import BentoSushiLogo from "../../images/bento_sushi_logo.png";
import PremiereMoissonLogo from "../../images/premiere_moisson_logo.png";
import TimHortonLogo from "../../images/tim_hortons_logo.png";
import LeBacAFrites from "../../images/le_bac_a_frites_logo.png";
import StarbucksLogo from "../../images/starbucks_logo.png";
import FlourKitchenLogo from "../../images/flour_kitchen_logo.png";
import ParamountLogo from "../../images/paramount_logo.png";
import JuiceBarLogo from "../../images/juice_bar_logo.png";
import Pizza800Logo from "../../images/pizza_800_logo.png";

export default function ViewOutletsPage(props: { email: string; }) {

  const storesInfo = [
    { id: 1, storeName: "Bento Sushi (UCU)", imageSrc: BentoSushiLogo, },
    { id: 2, storeName: "Premiere Moisson (FSS)", imageSrc: PremiereMoissonLogo },
    { id: 3, storeName: "Tim Hortons (CRX)", imageSrc: TimHortonLogo },
    { id: 4, storeName: "Tim Hortons (SITE)", imageSrc: TimHortonLogo },
    { id: 5, storeName: "Le Bac À Frites (Parking lot K)", imageSrc: LeBacAFrites }, 
    { id: 6, storeName: "Starbucks (DMS)", imageSrc: StarbucksLogo },
    { id: 7, storeName: "Flour Kitchen", imageSrc: FlourKitchenLogo },
    { id: 8, storeName: "Paramount (CRX)", imageSrc: ParamountLogo },
    { id: 9, storeName: "305 Juice bar (UCU)", imageSrc: JuiceBarLogo },
    { id: 10, storeName: "Pizza 800 (STE)", imageSrc: Pizza800Logo }
  ]
  return (
    <div className='landing-body'>
      <h3>
        Choose a food outlet
        <div className='store-list'>
          {storesInfo.map((store, index) => 
            <StoreIcon key={index} outletId={store.id} outletName={store.storeName} imageSrc={store.imageSrc} email={props.email}/>
          )}
        </div>
      </h3>
    </div>
  )
}
