import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./screens/LandingPage"
import RegistrationPage from './screens/RegistrationPage';
import LoginPage from './screens/LoginPage';
import EditProfile from './screens/EditProfile';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/editProfile" element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
