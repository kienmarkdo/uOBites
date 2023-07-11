import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./screens/LandingPage"
import RegistrationPage from './screens/RegistrationPage';
import LoginPage from './screens/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/home" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
