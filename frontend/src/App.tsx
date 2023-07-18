import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./screens/LandingPage"
import RegistrationPage from './screens/RegistrationPage';
import LoginPage from './screens/LoginPage';
import EditProfile from './screens/EditProfile';
import NoRouteFound from './screens/NoRouteFound';
import MenuPage from './screens/MenuPage';
import PaymentPage from './screens/PaymentPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/home/payment" element={<PaymentPage />} />
                <Route path="/home/outletMenu/1" element={<MenuPage />} />
                <Route path="/home/outletMenu/2" element={<MenuPage />} />
                <Route path="/home/outletMenu/3" element={<MenuPage />} />
                <Route path="/home/outletMenu/4" element={<MenuPage />} />
                <Route path="/home/outletMenu/5" element={<MenuPage />} />
                <Route path="/home/outletMenu/6" element={<MenuPage />} />
                <Route path="/home/outletMenu/7" element={<MenuPage />} />
                <Route path="/home/outletMenu/8" element={<MenuPage />} />
                <Route path="/home/outletMenu/9" element={<MenuPage />} />
                <Route path="/home/outletMenu/10" element={<MenuPage />} />
                <Route path="*" element={<NoRouteFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
